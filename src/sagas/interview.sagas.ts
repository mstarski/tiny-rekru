import { Injectable } from '@nestjs/common';
import { ICommand, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { SaveEventCommand } from '../use-cases/commands/save-event/save-event.command';
import { SendEmailCommand } from '../use-cases/commands/send-email/send-email.command';

@Injectable()
export class InterviewSagas {
  @Saga()
  eventToSaveHappened = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(map((event) => new SaveEventCommand(event)));
  };

  @Saga()
  eventForEmailHappened = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(map((event) => new SendEmailCommand(event)));
  };
}
