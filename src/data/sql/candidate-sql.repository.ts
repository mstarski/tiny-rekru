import { Repository } from '../repository';
import { Candidate } from '../../domain/candidate';
import { SqlEntityManager } from '@mikro-orm/sqlite';
import { CandidateEntity } from './entities/candidate.entity';

export class CandidateSqlRepository implements Repository<Candidate> {
  constructor(private readonly em: SqlEntityManager) {}

  async findById(id: string) {
    const candidate = await this.em.findOne(CandidateEntity, id);
    return candidate?.toObject();
  }
}
