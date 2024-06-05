import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueConstraintOnPostLikes1717625562528 implements MigrationInterface {
    name = 'UniqueConstraintOnPostLikes1717625562528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_likes" ADD CONSTRAINT "UQ_30ee85070afe5b92b5920957b1c" UNIQUE ("userId", "postId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_likes" DROP CONSTRAINT "UQ_30ee85070afe5b92b5920957b1c"`);
    }

}
