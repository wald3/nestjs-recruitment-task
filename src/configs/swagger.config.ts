import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Movie service API')
  .setDescription(
    'There will be shown all of the API routes that are exist to this moment.',
  )
  .setVersion('1.0.0')
  .addBearerAuth({
    description: `Pass here a JWT`,
    name: 'Authorization',
    scheme: 'Bearer',
    type: 'http',
    in: 'Header',
  })
  .build();

export = swaggerConfig;
