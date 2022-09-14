import { Command, CommandRunner, Option } from 'nest-commander';
import { CommandBus } from '@nestjs/cqrs';
import { InterviewStatus } from '../domain/interview';
import { UpdateInterviewStatusCommand } from '../use-cases/commands/update-interview-status/update-interview-status.command';

interface StatusCliOptions {
  id: string;
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
    const { id: inteviewId } = options;

    return this.commandBus.execute(
      new UpdateInterviewStatusCommand(inteviewId, status),
    );
  }

  @Option({
    flags: '--id <id>',
    description: `Interview's id (can be shortened to unique prefix).`,
  })
  parseInterviewId(id: string) {
    return id;
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
