import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfilesNewFields1716625149882 implements MigrationInterface {
    name = 'ProfilesNewFields1716625149882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "postsCount" integer`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "recipesCount" integer`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "friendsCount" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "friendsCount"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "recipesCount"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "postsCount"`);
    }

}
