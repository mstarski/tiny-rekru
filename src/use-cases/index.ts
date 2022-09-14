import { InterviewScheduledHandler } from '../events/interview-scheduled/interview-scheduled.handler';
import { ScheduleInterviewHandler } from './commands/schedule-interview/schedule-interview.handler';
import { ShowInterviewsHandler } from './queries/show-interviews/show-interviews.handler';
import { UpdateInterviewStatusHandler } from './commands/update-interview-status/update-interview-status.handler';
import { InterviewStatusUpdatedHandler } from '../events/interview-status-updated/interview-status-updated.handler';
import { InterviewUpdateStatusFailedHandler } from '../events/interview-update-status-failed/interview-update-status-failed.handler';

export const AppCommandHandlers = [
  ScheduleInterviewHandler,
  UpdateInterviewStatusHandler,
];

export const AppQueryHandlers = [ShowInterviewsHandler];

export const AppEventHandlers = [
  InterviewScheduledHandler,
  InterviewStatusUpdatedHandler,
  InterviewUpdateStatusFailedHandler,
];
