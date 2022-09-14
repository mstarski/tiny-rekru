export class CreateCandidateDto {
  readonly name: string;
  readonly age?: number;
  readonly location?: string | undefined;

  constructor(props: Partial<CreateCandidateDto>) {
    Object.assign(this, props);
  }
}
