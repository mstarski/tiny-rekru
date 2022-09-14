import { Candidate } from '../domain/candidate';

export class CandidateViewDto {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly location: string | undefined;
  readonly isUnder26: boolean;

  private constructor(props: Partial<CandidateViewDto>) {
    Object.assign(this, props);
  }

  static fromObject(candidate: Candidate) {
    return new CandidateViewDto({
      id: candidate.id,
      name: candidate.name,
      age: candidate.age,
      location: candidate.location,
      isUnder26: candidate.age < 26,
    });
  }
}
