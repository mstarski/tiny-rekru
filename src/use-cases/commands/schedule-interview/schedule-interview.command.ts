import { CandidateDto } from '../../../dto/candidate.dto';
import * as dayjs from 'dayjs';

export class ScheduleInterviewCommand {
  constructor(
    public readonly candidateDto: CandidateDto,
    public readonly date: dayjs.Dayjs,
  ) {}
}
