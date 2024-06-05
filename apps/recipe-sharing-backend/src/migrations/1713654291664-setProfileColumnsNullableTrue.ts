import { MigrationInterface, QueryRunner } from "typeorm";

export class SetProfileColumnsNullableTrue1713654291664 implements MigrationInterface {
    name = 'SetProfileColumnsNullableTrue1713654291664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "about" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "profileImgUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "coverImgUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "city" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "coverImgUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "profileImgUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "about" SET NOT NULL`);
    }

}
