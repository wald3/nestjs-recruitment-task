import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingTitleException extends HttpException {
  constructor() {
    super('Title is absent in requset body!', HttpStatus.BAD_REQUEST);
  }
}
