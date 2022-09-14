export interface Repository<Model> {
  findById: (id: string) => Promise<Model>;
}
