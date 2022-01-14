import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums/role.enum';
import { NonExistedRoleException } from '../exceptions/non-existed-role.exception';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: Error, ctx: any, status?: any) {
    if (err || info || !user) {
      throw new UnauthorizedException(err || info);
    }

    if (Role[user.role]) user.limit = Role[user.role];
    else throw new NonExistedRoleException(user.role);

    return user;
  }
}
