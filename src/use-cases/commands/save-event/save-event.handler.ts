import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveEventCommand } from './save-event.command';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { EventEntity } from '../../../data/sql/entities/event.entity';

@CommandHandler(SaveEventCommand)
export class SaveEventHandler implements ICommandHandler<SaveEventCommand> {
  constructor(private readonly orm: MikroORM) {}

  @UseRequestContext()
  async execute(command: SaveEventCommand): Promise<void> {
    const { event } = command;

    const eventEntity = this.orm.em.create(EventEntity, {
      type: event.constructor.name,
      body: JSON.stringify(event),
    });

    await this.orm.em.persistAndFlush(eventEntity);
  }
}
