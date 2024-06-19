import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangesInChatEntity1718814238224 implements MigrationInterface {
    name = 'ChangesInChatEntity1718814238224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "PK_9d0b2ba74336710fd31154738a5"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "chatId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "chatId" uuid`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "chatId"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "chatId" integer`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "PK_9d0b2ba74336710fd31154738a5"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
