export interface JwtPayload {
  userId: string;
  name: string;
  role: string;
  iat: Date;
  exp: Date;
  iss: string;
  sub: string;
}
