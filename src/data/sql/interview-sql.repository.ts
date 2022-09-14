import { Interview, InterviewStatus } from '../../domain/interview';
import { EntityRepository } from '@mikro-orm/sqlite';
import { InterviewEntity } from './entities/interview.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Loaded, MikroORM, UseRequestContext } from '@mikro-orm/core';
import { InterviewRepository } from '../interview.repository';

export class InterviewSqlRepository implements InterviewRepository {
  constructor(
    private readonly orm: MikroORM,

    @InjectRepository(InterviewEntity)
    private readonly repo: EntityRepository<InterviewEntity>,
  ) {}

  @UseRequestContext()
  async findById(id: string): Promise<Interview> {
    const interview = await this.repo.findOne(id);
    return interview?.toObject();
  }

  @UseRequestContext()
  async findInterviews(): Promise<Interview[]> {
    const interviews = await this.repo.find({}, { populate: ['candidate'] });

    return interviews.map((i) => i.toObject());
  }

  @UseRequestContext()
  async updateInterviewStatus(
    id: string,
    candidateName: string,
    newStatus: InterviewStatus,
  ): Promise<boolean> {
    let interview: Loaded<InterviewEntity | undefined>;

    if (id) {
      interview = await this.repo.findOne(id);
    } else if (candidateName) {
      interview = await this.repo.findOne({
        candidate: { name: candidateName },
      });
    }

    if (!interview) {
      return false;
    }

    interview.status = newStatus;
    await this.orm.em.flush();

    return true;
  }
}
