import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ScheduleInterviewCommand } from './schedule-interview.command';
import { Scheduler } from '../../../domain/scheduler';
import { MikroORM } from '@mikro-orm/core';
import { InterviewRepository } from '../../../data/interview.repository';
import { InterviewRepoImpl } from '../../../tokens';
import { Inject } from '@nestjs/common';

@CommandHandler(ScheduleInterviewCommand)
export class ScheduleInterviewHandler
  implements ICommandHandler<ScheduleInterviewCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly orm: MikroORM,

    @Inject(InterviewRepoImpl)
    private readonly interviewRepo: InterviewRepository,
  ) {}

  async execute(command: ScheduleInterviewCommand): Promise<void> {
    const { candidateDto, date } = command;

    const scheduler = this.publisher.mergeObjectContext(
      new Scheduler(this.orm, this.interviewRepo),
    );

    await scheduler.scheduleInterview(candidateDto, date);
    scheduler.commit();
  }
}
