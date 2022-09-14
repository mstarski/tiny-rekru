import { Module } from '@nestjs/common';
import { ScheduleCli } from './schedule.cli';
import { AppCqrsModule } from '../common/cqrs.module';
import { ListCli } from './list.cli';
import { StatusCli } from './status.cli';
import { FeedbackCli } from './feedback.cli';

@Module({
  imports: [AppCqrsModule],
  providers: [ScheduleCli, ListCli, StatusCli, FeedbackCli],
})
export class CliModule {}
