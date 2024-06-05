import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedFriendsAndFriendsRequestTable1717097814201 implements MigrationInterface {
    name = 'AddedFriendsAndFriendsRequestTable1717097814201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."friend_request_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."friend_request_status_enum" NOT NULL DEFAULT 'pending', "requestDate" TIMESTAMP NOT NULL DEFAULT now(), "senderId" uuid, "receiverId" uuid, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "friendshipDate" TIMESTAMP NOT NULL DEFAULT now(), "user1Id" uuid, "user2Id" uuid, CONSTRAINT "UQ_f1e840a704324aea75ff4809948" UNIQUE ("user1Id", "user2Id"), CONSTRAINT "PK_1b301ac8ac5fcee876db96069b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_9509b72f50f495668bae3c0171c" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_cdea0930684433d57b67d2a06af" FOREIGN KEY ("user1Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_6d2d856c1279dd59a837a254879" FOREIGN KEY ("user2Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_6d2d856c1279dd59a837a254879"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_cdea0930684433d57b67d2a06af"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_9509b72f50f495668bae3c0171c"`);
        await queryRunner.query(`DROP TABLE "friend"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TYPE "public"."friend_request_status_enum"`);
    }

}
