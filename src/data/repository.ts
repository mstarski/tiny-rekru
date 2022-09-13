export interface Repository<Model> {
  save: (model: Model) => Promise<Model>;
}
