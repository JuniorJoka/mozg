import { JwtPayload } from 'jsonwebtoken';
import models from '../../modules';
export interface Context {
  models: typeof models;
  user: JwtPayload | string;
}
