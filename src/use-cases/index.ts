import { InterviewScheduledHandler } from '../events/interview-scheduled/interview-scheduled.handler';
import { ScheduleInterviewHandler } from './commands/schedule-interview/schedule-interview.handler';
import { ShowInterviewsHandler } from './queries/show-interviews/show-interviews.handler';

export const AppCommandHandlers = [ScheduleInterviewHandler];

export const AppQueryHandlers = [ShowInterviewsHandler];

export const AppEventHandlers = [InterviewScheduledHandler];
