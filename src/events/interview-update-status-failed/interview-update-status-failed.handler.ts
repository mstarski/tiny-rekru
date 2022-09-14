import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InterviewUpdateStatusFailedEvent } from './interview-update-status-failed.event';

@EventsHandler(InterviewUpdateStatusFailedEvent)
export class InterviewUpdateStatusFailedHandler
  implements IEventHandler<InterviewUpdateStatusFailedEvent>
{
  async handle(event: InterviewUpdateStatusFailedEvent): Promise<void> {
    console.error(
      `Updating status of interview ${event.interviewId} failed!\nReason: ${event.reason}`,
    );
  }
}
