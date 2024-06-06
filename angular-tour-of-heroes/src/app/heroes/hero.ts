export interface Hero<T> {
  id: number;
  name: string;
  alias: string;
  power: T;
  createdAt: string;
  updatedAt: string;
}
