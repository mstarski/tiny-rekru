import { CustomBaseEntity } from './custom-base.entity';
import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { CandidateEntity } from './candidate.entity';
import { Interview, InterviewStatus } from '../../../domain/interview';

@Entity({ tableName: 'interview' })
export class InterviewEntity extends CustomBaseEntity {
  @OneToOne({ type: 'CandidateEntity' })
  candidate: CandidateEntity;

  @Property()
  date: Date;

  @Property()
  status: InterviewStatus;

  @Property({ nullable: true })
  notes?: string;

  constructor(props: Partial<InterviewEntity>) {
    super();
    Object.assign(this, props);
  }

  toObject(): Interview {
    return new Interview({
      id: this.id,
      date: this.date,
      status: this.status,
      notes: this.notes,
      candidate: this.candidate.toObject(),
    });
  }
}
