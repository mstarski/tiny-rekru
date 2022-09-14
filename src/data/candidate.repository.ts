import { Candidate } from 'src/domain/candidate';

export interface CandidateRepository {
  findById(id: string): Promise<Candidate>;
}
