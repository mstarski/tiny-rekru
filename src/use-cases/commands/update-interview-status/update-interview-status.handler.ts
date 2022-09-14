import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInterviewStatusCommand } from './update-interview-status.command';
import { MikroORM } from '@mikro-orm/core';
import { InterviewRepoImpl } from '../../../tokens';
import { InterviewRepository } from '../../../data/interview.repository';
import { Inject } from '@nestjs/common';
import { Manager } from '../../../domain/manager';

@CommandHandler(UpdateInterviewStatusCommand)
export class UpdateInterviewStatusHandler
  implements ICommandHandler<UpdateInterviewStatusCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly orm: MikroORM,

    @Inject(InterviewRepoImpl)
    private readonly interviewRepo: InterviewRepository,
  ) {}

  async execute(command: UpdateInterviewStatusCommand): Promise<void> {
    const { interviewId, candidateName, status } = command;

    const manager = this.publisher.mergeObjectContext(
      new Manager(this.orm, this.interviewRepo),
    );

    await manager.updateInterviewStatus(interviewId, candidateName, status);
    manager.commit();
  }
}
