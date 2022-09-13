export class CandidateDto {
  readonly name: string;
  readonly age?: number;
  readonly location?: string | undefined;

  constructor(props: Partial<CandidateDto>) {
    Object.assign(this, props);
  }
}
