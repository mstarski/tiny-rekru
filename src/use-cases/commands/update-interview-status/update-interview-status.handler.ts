import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInterviewStatusCommand } from './update-interview-status.command';
import { MikroORM } from '@mikro-orm/core';
import { InterviewRepoImpl } from '../../../tokens';
import { Repository } from '../../../data/repository';
import { Interview } from '../../../domain/interview';
import { Inject } from '@nestjs/common';
import { Manager } from '../../../cli/manager';

@CommandHandler(UpdateInterviewStatusCommand)
export class UpdateInterviewStatusHandler
  implements ICommandHandler<UpdateInterviewStatusCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly orm: MikroORM,

    @Inject(InterviewRepoImpl)
    private readonly interviewRepo: Repository<Interview>,
  ) {}

  async execute(command: UpdateInterviewStatusCommand): Promise<void> {
    const { interviewId, status } = command;

    const manager = this.publisher.mergeObjectContext(
      new Manager(this.orm, this.interviewRepo),
    );

    await manager.updateInterviewStatus(interviewId, status);
    manager.commit();
  }
}
