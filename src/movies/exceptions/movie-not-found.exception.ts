import { HttpException, HttpStatus } from '@nestjs/common';

export class MovieNotFoundException extends HttpException {
  constructor(title: string) {
    super(`Movie with titls: \'${title}\' not found!`, HttpStatus.NOT_FOUND);
  }
}
