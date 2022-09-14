import { CustomBaseEntity } from './custom-base.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'event' })
export class EventEntity extends CustomBaseEntity {
  @Property()
  type: string;

  @Property()
  body: string;
}
