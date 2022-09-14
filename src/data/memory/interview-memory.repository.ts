import { InterviewRepository } from '../interview.repository';
import { Interview, InterviewStatus } from '../../domain/interview';
import { NotImplementedException } from '@nestjs/common';

export class InterviewMemoryRepository implements InterviewRepository {
  private interviews: Interview[] = [];

  async create(model: Interview) {
    const newLength = this.interviews.push(model);
    return this.interviews[newLength - 1];
  }

  findById(id: string): Promise<Interview> {
    return Promise.resolve(undefined);
  }

  findInterviews(): Promise<Interview[]> {
    throw new NotImplementedException();
  }

  updateInterviewStatus(
    id: string,
    candidateName: string,
    newStatus: InterviewStatus,
  ): Promise<boolean> {
    throw new NotImplementedException();
  }
}
