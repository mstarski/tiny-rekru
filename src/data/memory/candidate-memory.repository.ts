import { Repository } from '../repository';
import { Candidate } from '../../domain/candidate';

export class CandidateMemoryRepository implements Repository<Candidate> {
  private candidates: Candidate[] = [];

  async create(model: Candidate) {
    const newLength = this.candidates.push(model);
    return this.candidates[newLength - 1];
  }

  findById(id: string): Promise<Candidate> {
    return Promise.resolve(undefined);
  }
}
