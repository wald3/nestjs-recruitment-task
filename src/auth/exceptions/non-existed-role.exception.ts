import { HttpException, HttpStatus } from '@nestjs/common';

export class NonExistedRoleException extends HttpException {
  constructor(invalidRole: string) {
    super(`Role<${invalidRole}> is unregistred!`, HttpStatus.UNAUTHORIZED);
  }
}
