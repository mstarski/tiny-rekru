import { AggregateRoot } from '@nestjs/cqrs';
import { Interview } from './interview';
import { Candidate } from './candidate';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { InterviewScheduledEvent } from '../events/interview-scheduled/interview-scheduled.event';
import * as dayjs from 'dayjs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';

export class Scheduler extends AggregateRoot {
  constructor(
    private readonly orm: MikroORM,
    private readonly interviewRepo: any,
  ) {
    super();
  }

  @UseRequestContext()
  async scheduleInterview(candidateDto: CreateCandidateDto, date: dayjs.Dayjs) {
    const pendingCandidate = new Candidate(candidateDto).toEntity();
    const pendingInterview = new Interview({
      date: date.toDate(),
    }).toEntity();

    pendingInterview.candidate = pendingCandidate;
    await this.orm.em.persistAndFlush(pendingInterview);

    const interview = await this.interviewRepo.findById(pendingInterview.id);

    this.apply(new InterviewScheduledEvent(interview));
  }
}
