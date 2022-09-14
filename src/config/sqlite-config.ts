import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { ReflectMetadataProvider } from '@mikro-orm/core';
import { CustomBaseEntity } from '../data/sql/entities/custom-base.entity';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Entities } from '../data/sql/entities';

const SQLiteConfig: MikroOrmModuleSyncOptions = {
  type: 'sqlite',
  dbName: '/mnt/c/Users/micha/Desktop/db.sqlite3',
  entities: [...Entities, CustomBaseEntity],
  metadataProvider: ReflectMetadataProvider,
  highlighter: new SqlHighlighter(),
  debug: ['query'],
};

export default SQLiteConfig;
