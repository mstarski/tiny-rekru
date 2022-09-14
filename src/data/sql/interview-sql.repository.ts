import { Repository } from '../repository';
import { Interview, InterviewStatus } from '../../domain/interview';
import { EntityRepository } from '@mikro-orm/sqlite';
import { InterviewEntity } from './entities/interview.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';

export class InterviewSqlRepository implements Repository<Interview> {
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
  async findPendingInterviews(): Promise<Interview[]> {
    const interviews = await this.repo.find(
      {
        status: InterviewStatus.Pending,
      },
      { populate: ['candidate'] },
    );

    return interviews.map((i) => i.toObject());
  }

  @UseRequestContext()
  async updateInterviewStatus(
    id: string,
    newStatus: InterviewStatus,
  ): Promise<boolean> {
    const interview = await this.repo.findOne(id);

    if (!interview) {
      return false;
    }

    interview.status = newStatus;

    await this.orm.em.flush();

    return true;
  }
}
