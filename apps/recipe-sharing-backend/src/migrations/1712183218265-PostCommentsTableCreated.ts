import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCommentsTableCreated1712183218265 implements MigrationInterface {
    name = 'PostCommentsTableCreated1712183218265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "postId" uuid, "userId" uuid, "parentCommentId" uuid, CONSTRAINT "PK_2e99e04b4a1b31de6f833c18ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_ac65d744abc05279aee0b290857" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_62817b3571ec31e552a3cae4e1c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_2f4fd3e12513addbc37a4e6d56e" FOREIGN KEY ("parentCommentId") REFERENCES "post_comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_2f4fd3e12513addbc37a4e6d56e"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_62817b3571ec31e552a3cae4e1c"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_ac65d744abc05279aee0b290857"`);
        await queryRunner.query(`DROP TABLE "post_comments"`);
    }

}
