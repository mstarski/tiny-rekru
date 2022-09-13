import { AggregateRoot } from '@nestjs/cqrs';
import { Interview } from './interview';
import { Candidate } from './candidate';
import { CandidateDto } from '../dto/candidate.dto';
import { Repository } from '../data/repository';
import { InterviewScheduledEvent } from '../events/interview-scheduled/interview-scheduled.event';
import * as dayjs from 'dayjs';

export class Scheduler extends AggregateRoot {
  constructor(
    private readonly candidateRepo: Repository<Candidate>,
    private readonly interviewRepo: Repository<Interview>,
  ) {
    super();
  }

  async scheduleInterview(candidateDto: CandidateDto, date: dayjs.Dayjs) {
    const pendingCandidate = new Candidate(candidateDto);
    const pendingInterview = new Interview(pendingCandidate, date);

    await this.candidateRepo.save(pendingCandidate);
    const interview = await this.interviewRepo.save(pendingInterview);

    this.apply(new InterviewScheduledEvent(interview));
  }
}
