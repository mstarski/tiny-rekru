import { Candidate } from './candidate';

export class Interview {
  private static counter = 0;

  id: number;
  candidate: Candidate;
  date: Date;
  status: InterviewStatus = InterviewStatus.Pending;
  notes: string | null = null;

  constructor(candidate, date) {
    this.id = Interview.counter++;

    this.candidate = candidate;
    this.date = date;
  }
}

export enum InterviewStatus {
  Pending = 'Pending',
  Positive = 'Positive',
  Negative = 'Negative',
  Aborted = 'Aborted',
}
