import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { CandidateEntity } from '../data/sql/entities/candidate.entity';

export class Candidate {
  id: string;
  name: string;
  age?: number;
  location?: string | undefined;

  constructor(props: Partial<Candidate> | CreateCandidateDto) {
    Object.assign(this, props);
  }

  toEntity(): CandidateEntity {
    return new CandidateEntity({
      name: this.name,
      age: this.age,
      location: this.location,
    });
  }
}
