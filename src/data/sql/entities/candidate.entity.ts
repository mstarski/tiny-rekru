import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './custom-base.entity';
import { InterviewEntity } from './interview.entity';
import { Candidate } from '../../../domain/candidate';

@Entity({ tableName: 'candidate' })
export class CandidateEntity extends CustomBaseEntity {
  @OneToOne({
    mappedBy: 'candidate',
    orphanRemoval: true,
    type: 'InterviewEntity',
  })
  interview: InterviewEntity;

  @Property()
  name: string;

  @Property({ nullable: true })
  age?: number;

  @Property({ nullable: true })
  location?: string;

  constructor(props: Partial<CandidateEntity>) {
    super();
    Object.assign(this, props);
  }

  toObject() {
    return new Candidate({
      id: this.id,
      name: this.name,
      age: this.age,
      location: this.location,
    });
  }
}
