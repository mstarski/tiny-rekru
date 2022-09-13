import { Repository } from '../repository';
import { Interview } from '../../domain/interview';

export class InterviewMemoryRepository implements Repository<Interview> {
  private interviews: Interview[] = [];

  async save(model: Interview) {
    const newLength = this.interviews.push(model);
    return this.interviews[newLength - 1];
  }
}
