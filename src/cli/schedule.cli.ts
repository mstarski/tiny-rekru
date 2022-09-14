import { Command, CommandRunner, Option } from 'nest-commander';
import * as dayjs from 'dayjs';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ScheduleInterviewCommand } from '../use-cases/commands/schedule-interview/schedule-interview.command';

interface InterviewCliOptions {
  name: string;
  age?: number;
  location?: string;
  date: dayjs.Dayjs;
}

@Command({ name: 'schedule', description: 'Schedule an interview' })
export class ScheduleCli extends CommandRunner {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async run(argv: string[], options?: InterviewCliOptions) {
    const candidateDto = new CreateCandidateDto({
      name: options.name,
      age: options?.age,
      location: options?.location,
    });

    const cmd = new ScheduleInterviewCommand(candidateDto, options.date);
    return this.commandBus.execute(cmd);
  }

  @Option({
    flags: '-n, --name <name>',
    description: `Candidate's name`,
  })
  parseCandidateName(name: string): string {
    return name;
  }

  @Option({
    flags: '-a, --age <number>',
    description: `Candidate's age`,
  })
  parseCandidateNumber(age: string): number {
    return parseInt(age);
  }

  @Option({
    flags: '-l --location <location>',
    description: `Candidate's location`,
  })
  parseCandidateLocation(location: string): string {
    return location;
  }

  @Option({
    flags: '--date <date>',
    description: `Interview date in YYYY-MM-DD.HH:MM format`,
  })
  parseInterviewDate(rawDate: string): dayjs.Dayjs {
    const [date, hour] = rawDate.split('.');
    const utcFormat = `${date} ${hour}:00`;

    return dayjs(utcFormat);
  }
}
