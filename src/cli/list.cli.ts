import { Command, CommandRunner } from 'nest-commander';
import { QueryBus } from '@nestjs/cqrs';
import { ShowInterviewsQuery } from '../use-cases/queries/show-interviews/show-interviews.query';

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
    const interviews = await this.queryBus.execute(query);

    console.log(interviews);
  }
}
