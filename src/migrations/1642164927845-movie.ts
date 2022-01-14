import {MigrationInterface, QueryRunner} from "typeorm";

export class movie1642164927845 implements MigrationInterface {
    name = 'movie1642164927845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "title" character varying, "released" TIMESTAMP, "genre" character varying, "director" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_476c2d437396d614280b60f082a" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
