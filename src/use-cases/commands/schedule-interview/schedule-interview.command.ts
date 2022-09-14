import { CreateCandidateDto } from '../../../dto/create-candidate.dto';
import * as dayjs from 'dayjs';

export class ScheduleInterviewCommand {
  constructor(
    public readonly candidateDto: CreateCandidateDto,
    public readonly date: dayjs.Dayjs,
  ) {}
}
