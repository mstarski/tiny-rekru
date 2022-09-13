import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ScheduleInterviewCommand } from './schedule-interview.command';
import { Scheduler } from '../../../domain/scheduler';
import { Inject } from '@nestjs/common';
import { CandidateRepoImpl, InterviewRepoImpl } from '../../../tokens';

@CommandHandler(ScheduleInterviewCommand)
export class ScheduleInterviewHandler
  implements ICommandHandler<ScheduleInterviewCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(CandidateRepoImpl) private readonly candidateRepo,
    @Inject(InterviewRepoImpl) private readonly interviewRepo,
  ) {}

  async execute(command: ScheduleInterviewCommand): Promise<void> {
    const { candidateDto, date } = command;

    const scheduler = this.publisher.mergeObjectContext(
      new Scheduler(this.candidateRepo, this.interviewRepo),
    );

    await scheduler.scheduleInterview(candidateDto, date);
    scheduler.commit();
  }
}
