import { SqlEntityManager } from '@mikro-orm/sqlite';
import { CandidateEntity } from './entities/candidate.entity';
import { CandidateRepository } from '../candidate.repository';

export class CandidateSqlRepository implements CandidateRepository {
  constructor(private readonly em: SqlEntityManager) {}

  async findById(id: string) {
    const candidate = await this.em.findOne(CandidateEntity, id);
    return candidate?.toObject();
  }
}
