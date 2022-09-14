import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InterviewStatusUpdatedEvent } from './interview-status-updated.event';

@EventsHandler(InterviewStatusUpdatedEvent)
export class InterviewStatusUpdatedHandler
  implements IEventHandler<InterviewStatusUpdatedEvent>
{
  async handle(event: InterviewStatusUpdatedEvent): Promise<void> {
    console.log(
      `Interview ${event.interviewId} status updated: ${event.status}`,
    );
  }
}
