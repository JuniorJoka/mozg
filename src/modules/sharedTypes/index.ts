import { JwtPayload } from 'jsonwebtoken';

export interface ContextArgs {
  user: JwtPayload | null;
}
