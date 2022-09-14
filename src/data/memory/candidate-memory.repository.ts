import { Candidate } from '../../domain/candidate';
import { CandidateRepository } from '../candidate.repository';
import { NotImplementedException } from '@nestjs/common';

export class CandidateMemoryRepository implements CandidateRepository {
  private candidates: Candidate[] = [];

  async create(model: Candidate) {
    const newLength = this.candidates.push(model);
    return this.candidates[newLength - 1];
  }

  findById(id: string): Promise<Candidate> {
    throw new NotImplementedException();
  }
}
