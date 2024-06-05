import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveContentFromPostLikes1713633950673 implements MigrationInterface {
    name = 'RemoveContentFromPostLikes1713633950673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_likes" DROP COLUMN "content"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_likes" ADD "content" character varying NOT NULL`);
    }

}
