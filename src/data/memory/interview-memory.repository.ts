import { Repository } from '../repository';
import { Interview } from '../../domain/interview';

export class InterviewMemoryRepository implements Repository<Interview> {
  private interviews: Interview[] = [];

  async create(model: Interview) {
    const newLength = this.interviews.push(model);
    return this.interviews[newLength - 1];
  }

  findById(id: string): Promise<Interview> {
    return Promise.resolve(undefined);
  }
}
