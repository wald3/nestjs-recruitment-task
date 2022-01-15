import { HttpException, HttpStatus } from '@nestjs/common';

export class MovieApiTimeoutException extends HttpException {
  constructor() {
    super(
      'Moive API timeout error, try again later',
      HttpStatus.GATEWAY_TIMEOUT,
    );
  }
}
