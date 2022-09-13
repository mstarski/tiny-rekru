import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShowInterviewsQuery } from './show-interviews.query';

@QueryHandler(ShowInterviewsQuery)
export class ShowInterviewsHandler
  implements IQueryHandler<ShowInterviewsQuery>
{
  execute(query: ShowInterviewsQuery): Promise<any> {
    return Promise.resolve([]);
  }
}
