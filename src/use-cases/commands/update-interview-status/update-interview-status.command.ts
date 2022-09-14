import { InterviewStatus } from '../../../domain/interview';

export class UpdateInterviewStatusCommand {
  constructor(
    public readonly interviewId: string,
    public readonly candidateName: string,
    public readonly status: InterviewStatus,
  ) {}
}
