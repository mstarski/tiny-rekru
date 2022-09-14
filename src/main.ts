import 'reflect-metadata';

import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, {
    cliName: 'trk',
    logger: ['log', 'error'],
  });
}

void bootstrap();
