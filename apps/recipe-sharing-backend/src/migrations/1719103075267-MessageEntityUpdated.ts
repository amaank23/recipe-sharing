import { MigrationInterface, QueryRunner } from "typeorm";

export class MessageEntityUpdated1719103075267 implements MigrationInterface {
    name = 'MessageEntityUpdated1719103075267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "recieverId" uuid`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_9cad3f146f607c5214f7b386ca5" FOREIGN KEY ("recieverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_9cad3f146f607c5214f7b386ca5"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "recieverId"`);
    }

}
