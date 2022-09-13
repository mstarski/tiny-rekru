import { Module } from '@nestjs/common';
import {
  AppCommandHandlers,
  AppEventHandlers,
  AppQueryHandlers,
} from '../use-cases';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [...AppCommandHandlers, ...AppQueryHandlers, ...AppEventHandlers],
  exports: [CqrsModule],
})
export class AppCqrsModule {}
