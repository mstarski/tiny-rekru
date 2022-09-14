import { Interview, InterviewStatus } from '../domain/interview';

export interface InterviewRepository {
  findById(id): Promise<Interview>;
  findInterviews(): Promise<Interview[]>;
  updateInterviewStatus(
    id: string,
    candidateName: string,
    newStatus: InterviewStatus,
  ): Promise<boolean>;
}
