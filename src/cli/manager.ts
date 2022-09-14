import { AggregateRoot } from '@nestjs/cqrs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { InterviewStatusUpdatedEvent } from '../events/interview-status-updated/interview-status-updated.event';
import { InterviewUpdateStatusFailedEvent } from '../events/interview-update-status-failed/interview-update-status-failed.event';

export class Manager extends AggregateRoot {
  constructor(
    private readonly orm: MikroORM,
    private readonly interviewRepo: any,
  ) {
    super();
  }

  @UseRequestContext()
  async updateInterviewStatus(interviewId, newStatus) {
    const updateResult = await this.interviewRepo.updateInterviewStatus(
      interviewId,
      newStatus,
    );

    if (updateResult === false) {
      return this.apply(
        new InterviewUpdateStatusFailedEvent(
          interviewId,
          'Interview not found.',
        ),
      );
    }

    return this.apply(new InterviewStatusUpdatedEvent(interviewId, newStatus));
  }
}
