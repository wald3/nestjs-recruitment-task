import {MigrationInterface, QueryRunner} from "typeorm";

export class init1642088142871 implements MigrationInterface {
    name = 'init1642088142871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "addedBy" character varying NOT NULL, "title" character varying NOT NULL, "released" TIMESTAMP NOT NULL, "genre" character varying NOT NULL, "director" character varying NOT NULL, CONSTRAINT "PK_476c2d437396d614280b60f082a" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
