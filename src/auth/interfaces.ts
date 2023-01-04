import { JwtPayload as JwtPayloadExternal } from 'jsonwebtoken';

export interface JwtPayload extends JwtPayloadExternal {
  id: number;
  uuid: string;
}