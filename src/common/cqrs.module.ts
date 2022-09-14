import { Module } from '@nestjs/common';
import {
  AppCommandHandlers,
  AppEventHandlers,
  AppQueryHandlers,
} from '../use-cases';
import { CqrsModule } from '@nestjs/cqrs';
import { InterviewSagas } from '../sagas/interview.sagas';

@Module({
  imports: [CqrsModule],
  providers: [
    ...AppCommandHandlers,
    ...AppQueryHandlers,
    ...AppEventHandlers,

    InterviewSagas,
  ],
  exports: [CqrsModule],
})
export class AppCqrsModule {}
