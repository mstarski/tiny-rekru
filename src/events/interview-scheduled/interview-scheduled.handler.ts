import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InterviewScheduledEvent } from './interview-scheduled.event';

@EventsHandler(InterviewScheduledEvent)
export class InterviewScheduledHandler
  implements IEventHandler<InterviewScheduledEvent>
{
  async handle(event: InterviewScheduledEvent): Promise<void> {
    console.log('Interview created!', event.interview);
  }
}
