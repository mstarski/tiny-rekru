import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { InterviewEntity } from '../data/sql/entities/interview.entity';
import { ReflectMetadataProvider } from '@mikro-orm/core';
import { CandidateEntity } from '../data/sql/entities/candidate.entity';
import { CustomBaseEntity } from '../data/sql/entities/custom-base.entity';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const SQLiteConfig: MikroOrmModuleSyncOptions = {
  type: 'sqlite',
  dbName: '/mnt/c/Users/micha/Desktop/db.sqlite3',
  entities: [CandidateEntity, InterviewEntity, CustomBaseEntity],
  metadataProvider: ReflectMetadataProvider,
  highlighter: new SqlHighlighter(),
  debug: ['query'],
};

export default SQLiteConfig;
