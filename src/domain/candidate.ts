import { CandidateDto } from '../dto/candidate.dto';

export class Candidate {
  name: string;
  age: number;
  location?: string | undefined;

  constructor(props: Partial<Candidate> | CandidateDto) {
    Object.assign(this, props);
  }
}
