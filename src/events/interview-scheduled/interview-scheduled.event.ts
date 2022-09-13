import { Interview } from '../../domain/interview';

export class InterviewScheduledEvent {
  constructor(public readonly interview: Interview) {}
}
