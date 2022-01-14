import { HttpException, HttpStatus } from '@nestjs/common';

export class MovieLimitException extends HttpException {
  constructor() {
    super(
      'Movie creation is temporarily unavailable, movie limit is reached! Upgrade your subscription level to continue',
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
