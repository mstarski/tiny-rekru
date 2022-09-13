import { Repository } from '../repository';
import { Candidate } from '../../domain/candidate';

export class CandidateRepository implements Repository<Candidate> {
  save(model: Candidate): Promise<Candidate> {
    return Promise.resolve(undefined);
  }
}
