import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShowInterviewsQuery } from './show-interviews.query';
import { Inject } from '@nestjs/common';
import { InterviewRepoImpl } from '../../../tokens';
import { InterviewViewDto } from '../../../dto/interview-view.dto';

@QueryHandler(ShowInterviewsQuery)
export class ShowInterviewsHandler
  implements IQueryHandler<ShowInterviewsQuery>
{
  constructor(
    @Inject(InterviewRepoImpl)
    private readonly interviewRepo: any,
  ) {}

  async execute(): Promise<InterviewViewDto[]> {
    const interviews = await this.interviewRepo.findPendingInterviews();
    return interviews.map((i) => InterviewViewDto.fromObject(i));
  }
}
