import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      `running on: http://${process.env.HOST || 'localhost'}:${
        process.env.PORT || 3000
      }/`,
    );
  });
}

bootstrap();
