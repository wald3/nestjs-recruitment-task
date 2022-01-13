import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums/role.enum';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: Error, ctx: any, status?: any) {
    if (err || info || !user) {
      throw new UnauthorizedException(err || info);
    }

    if (Role[user.role]) {
      user.limit = Role[user.role];
      console.log(user);
    } else throw new UnauthorizedException('Unexisted role!');

    return user;
  }
}
