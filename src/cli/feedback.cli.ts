import { Command, CommandRunner, Option } from 'nest-commander';
import { CommandBus } from '@nestjs/cqrs';
import { NotImplementedException } from '@nestjs/common';

@Command({
  name: 'feedback',
  aliases: ['fb'],
  description: 'Give a feedback for interview.',
})
export class FeedbackCli extends CommandRunner {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async run(argv: string[], options?: Record<string, any>): Promise<void> {
    throw new NotImplementedException();
  }

  @Option({
    flags: '--id <id>',
    description: 'Interview ID',
  })
  parseInterviewId(id: string) {
    return id;
  }
}
