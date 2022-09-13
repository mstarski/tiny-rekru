import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RepoType } from '../config/config.types';
import { CandidateRepoImpl, InterviewRepoImpl } from '../tokens';
import { CandidateMemoryRepository } from '../data/memory/candidate-memory.repository';
import { InterviewMemoryRepository } from '../data/memory/interview-memory.repository';
import { InterviewRepository } from '../data/persistance/interview.repository';
import { CandidateRepository } from '../data/persistance/candidate.repository';

export interface RepositoriesModuleConfig {
  repository: RepoType;
}

@Module({})
@Global()
export class RepositoriesModule {
  static forRoot(config: RepositoriesModuleConfig): DynamicModule {
    let repoImplementations: Provider[] = [];

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

      case RepoType.Persistance:
        repoImplementations = [
          {
            provide: CandidateRepoImpl,
            useClass: CandidateRepository,
          },
          {
            provide: InterviewRepoImpl,
            useClass: InterviewRepository,
          },
        ];
        break;

      default:
        throw new Error('Invalid repository type provided in config.');
    }

    return {
      module: RepositoriesModule,
      providers: [...repoImplementations],
      exports: [...repoImplementations],
    };
  }
}
