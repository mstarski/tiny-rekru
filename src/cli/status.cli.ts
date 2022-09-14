import { Command, CommandRunner, Option } from 'nest-commander';
import { CommandBus } from '@nestjs/cqrs';
import { InterviewStatus } from '../domain/interview';
import { UpdateInterviewStatusCommand } from '../use-cases/commands/update-interview-status/update-interview-status.command';

interface StatusCliOptions {
  id: string;
  name: string;
}

@Command({
  name: 'status',
  aliases: ['s'],
  description: 'Updates a status of an interview',
  arguments: '<status>',
  argsDescription: {
    status: `Set a new status for the interview: ${InterviewStatus.Pending} | ${InterviewStatus.Aborted} | ${InterviewStatus.Negative} | ${InterviewStatus.Positive} `,
  },
})
export class StatusCli extends CommandRunner {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async run(argv: string[], options?: StatusCliOptions): Promise<void> {
    const status = this.parseInterviewStatus(argv[0]);
    const { id: inteviewId, name: candidateName } = options;

    if (inteviewId && candidateName) {
      throw new Error(`Specify only one from id and candidate's name`);
    }

    return this.commandBus.execute(
      new UpdateInterviewStatusCommand(inteviewId, candidateName, status),
    );
  }

  @Option({
    flags: '--id <id>',
    description: `Interview ID`,
  })
  parseInterviewId(id: string) {
    return id;
  }

  @Option({
    flags: '-n --name <name>',
    description: `Candidate's name`,
  })
  parseCandidateName(name: string) {
    return name;
  }

  private parseInterviewStatus(status: string): InterviewStatus {
    const isValidStatus = Object.values(InterviewStatus).includes(
      status as any,
    );

    if (!isValidStatus) {
      throw new Error(`${status} is not a valid interview status.`);
    }

    return status as InterviewStatus;
  }
}
