import { Repository } from '../repository';
import { Interview } from '../../domain/interview';

export class InterviewRepository implements Repository<Interview> {
  save(model: Interview): Promise<Interview> {
    return Promise.resolve(undefined);
  }
}
