import { MigrationInterface, QueryRunner } from "typeorm";

export class PostImagesTableCreated1712182082761 implements MigrationInterface {
    name = 'PostImagesTableCreated1712182082761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "postId" uuid, CONSTRAINT "PK_32fe67d8cdea0e7536320d7c454" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post_images" ADD CONSTRAINT "FK_92e2382a7f43d4e9350d591fb6a" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_images" DROP CONSTRAINT "FK_92e2382a7f43d4e9350d591fb6a"`);
        await queryRunner.query(`DROP TABLE "post_images"`);
    }

}
