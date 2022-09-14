export class InterviewUpdateStatusFailedEvent {
  constructor(
    public readonly interviewId: string,
    public readonly candidateName: string,
    public readonly reason: string,
  ) {}
}
