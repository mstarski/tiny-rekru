import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RepoType } from '../config/config.types';
import { CandidateRepoImpl, InterviewRepoImpl } from '../tokens';
import { CandidateMemoryRepository } from '../data/memory/candidate-memory.repository';
import { InterviewMemoryRepository } from '../data/memory/interview-memory.repository';
import { InterviewSqlRepository } from '../data/sql/interview-sql.repository';
import { CandidateSqlRepository } from '../data/sql/candidate-sql.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import SQLiteConfig from '../config/sqlite-config';
import { Entities } from '../data/sql/entities';

export interface RepositoriesModuleConfig {
  repository: RepoType;
}

@Module({})
@Global()
export class RepositoriesModule {
  static forRoot(config: RepositoriesModuleConfig): DynamicModule {
    let repoImplementations: Provider[] = [];
    let imports: DynamicModule[] = [];

    switch (config.repository) {
      case RepoType.Memory:
        repoImplementations = [
          {
            provide: CandidateRepoImpl,
            useClass: CandidateMemoryRepository,
          },
          {
            provide: InterviewRepoImpl,
            useClass: InterviewMemoryRepository,
          },
        ];
        break;

      case RepoType.SQLite:
        imports = [
          MikroOrmModule.forRoot(SQLiteConfig),
          MikroOrmModule.forFeature(Entities),
        ];

        repoImplementations = [
          {
            provide: CandidateRepoImpl,
            useClass: CandidateSqlRepository,
          },
          {
            provide: InterviewRepoImpl,
            useClass: InterviewSqlRepository,
          },
        ];
        break;

      default:
        throw new Error('Invalid repository type provided in config.');
    }

    return {
      module: RepositoriesModule,
      imports: [...imports],
      providers: [...repoImplementations],
      exports: [...repoImplementations],
    };
  }
}
