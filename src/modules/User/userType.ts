import { Model, Document } from 'mongoose';

export interface RegisterViewerArgs {
  email: string;
  password: string;
  username: string;
}

export interface LoginViewerArgs {
  login: string;
  password: string;
}

export interface GetUserArgs {
  id?: string;
  username?: string;
}

interface UserMethods {
  validatePassword(password: string): Promise<boolean>;
}

export interface UserType extends Document, UserMethods {
  _id: string;
  email: string;
  password: string;
  username: string;
}

export interface UserModel extends Model<UserType> {
  generatePasswordHash(password: string): Promise<string>;
  findByLogin(username: string): Promise<UserType | null>;
}
