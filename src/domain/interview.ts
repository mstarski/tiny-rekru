import { InterviewEntity } from '../data/sql/entities/interview.entity';
import { Candidate } from './candidate';

export class Interview {
  id?: string;
  date: Date;
  status: InterviewStatus = InterviewStatus.Pending;
  notes?: string | null = null;
  candidate?: Candidate;

  constructor(props: Partial<Interview>) {
    Object.assign(this, props);
  }

  toEntity(): InterviewEntity {
    return new InterviewEntity({
      date: this.date,
      status: this.status,
      notes: this.notes,
    });
  }
}

export enum InterviewStatus {
  Pending = 'Pending',
  Positive = 'Positive',
  Negative = 'Negative',
  Aborted = 'Aborted',
}
