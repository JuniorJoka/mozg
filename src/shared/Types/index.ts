import models from '../../modules';

export interface Context {
  models: typeof models;
  user: User | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
}
