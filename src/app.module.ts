import { Module } from '@nestjs/common';
import { CliModule } from './cli/cli.module';
import { RepositoriesModule } from './common/repositories.module';
import { RepoType } from './config/config.types';

@Module({
  imports: [
    CliModule,
    RepositoriesModule.forRoot({ repository: RepoType.Persistance }),
  ],
})
export class AppModule {}
