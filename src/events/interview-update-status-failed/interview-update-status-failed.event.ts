export class InterviewUpdateStatusFailedEvent {
  constructor(
    public readonly interviewId: string,
    public readonly reason: string,
  ) {}
}
