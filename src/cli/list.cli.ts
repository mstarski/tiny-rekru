import { Command, CommandRunner } from 'nest-commander';
import { QueryBus } from '@nestjs/cqrs';
import { ShowInterviewsQuery } from '../use-cases/queries/show-interviews/show-interviews.query';
import { InterviewViewDto } from '../dto/interview-view.dto';

@Command({
  name: 'list',
  aliases: ['ls'],
  description: 'Lists scheduled interviews.',
})
export class ListCli extends CommandRunner {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async run(argv: string[], options?: undefined) {
    const query = new ShowInterviewsQuery();
    const interviews: InterviewViewDto[] = await this.queryBus.execute(query);

    const response = interviews.reduce((prev, curr, idx) => {
      const separator = idx !== interviews.length - 1 ? '\n\n' : '';
      const prettyPrintedData = this.prettyPrintInteviewInfo(curr) + separator;

      return prev + prettyPrintedData;
    }, '');

    console.log(response);
  }

  private prettyPrintInteviewInfo(interviewViewDto: InterviewViewDto) {
    const i = interviewViewDto;

    return `Imie kandydata: ${
      i.candidate.name
    }\nData: ${i.date.toLocaleDateString()}\nStatus: ${i.statusEmoji} (${
      i.status
    })\nCzy dano feedback? ${i.notes ? 'TAK' : 'NIE'}`;
  }
}
