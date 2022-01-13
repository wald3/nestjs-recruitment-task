import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

const joiSchema: ConfigModuleOptions = {
  validationSchema: Joi.object({
    OMDB_API_KEY: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),

    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_HOST: Joi.string().required(),
  }),
};

export = joiSchema;
