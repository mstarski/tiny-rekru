import { CandidateViewDto } from './candidate-view.dto';
import { Interview, InterviewStatus } from '../domain/interview';

export class InterviewViewDto {
  readonly id: string;
  readonly candidate: CandidateViewDto;
  readonly date: Date;
  readonly status: InterviewStatus;
  readonly statusEmoji: string;
  readonly notes: string | null;

  private constructor(props: Partial<InterviewViewDto>) {
    Object.assign(this, props);
  }

  static fromObject(interview: Interview) {
    return new InterviewViewDto({
      id: interview.id,
      candidate: CandidateViewDto.fromObject(interview.candidate),
      date: interview.date,
      status: interview.status,
      statusEmoji: InterviewViewDto.getStatusEmoji(interview.status),
      notes: interview.notes,
    });
  }

  private static getStatusEmoji(status: InterviewStatus): string {
    switch (status) {
      case InterviewStatus.Pending:
        return '🟡';
      case InterviewStatus.Aborted:
        return ' 🟠';
      case InterviewStatus.Positive:
        return '🟢';
      case InterviewStatus.Negative:
        return '🔴';
      default:
        throw new Error(`Invalid interview status provided ${status}`);
    }
  }
}
