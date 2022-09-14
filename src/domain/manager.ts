import { AggregateRoot } from '@nestjs/cqrs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { InterviewStatusUpdatedEvent } from '../events/interview-status-updated/interview-status-updated.event';
import { InterviewUpdateStatusFailedEvent } from '../events/interview-update-status-failed/interview-update-status-failed.event';
import { InterviewStatus } from './interview';
import { InterviewRepository } from '../data/interview.repository';

export class Manager extends AggregateRoot {
  constructor(
    private readonly orm: MikroORM,
    private readonly interviewRepo: InterviewRepository,
  ) {
    super();
  }

  @UseRequestContext()
  async updateInterviewStatus(
    interviewId: string,
    candidateName: string,
    newStatus: InterviewStatus,
  ) {
    const updateResult = await this.interviewRepo.updateInterviewStatus(
      interviewId,
      candidateName,
      newStatus,
    );

    if (updateResult === false) {
      return this.apply(
        new InterviewUpdateStatusFailedEvent(
          interviewId,
          candidateName,
          'Interview not found.',
        ),
      );
    }

    return this.apply(
      new InterviewStatusUpdatedEvent(interviewId, candidateName, newStatus),
    );
  }
}
