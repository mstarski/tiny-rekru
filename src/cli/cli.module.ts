import { Module } from '@nestjs/common';
import { ScheduleCli } from './schedule.cli';
import { AppCqrsModule } from '../common/cqrs.module';
import { ListCli } from './list.cli';

@Module({
  imports: [AppCqrsModule],
  providers: [ScheduleCli, ListCli],
})
export class CliModule {}
