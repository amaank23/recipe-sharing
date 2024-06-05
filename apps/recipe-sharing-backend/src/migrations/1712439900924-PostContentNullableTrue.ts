import { MigrationInterface, QueryRunner } from "typeorm";

export class PostContentNullableTrue1712439900924 implements MigrationInterface {
    name = 'PostContentNullableTrue1712439900924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "content" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "content" SET NOT NULL`);
    }

}
