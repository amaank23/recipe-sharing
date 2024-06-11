import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeAndPostEntityCHanges1718085708307 implements MigrationInterface {
    name = 'RecipeAndPostEntityCHanges1718085708307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."post_posttype_enum" AS ENUM('normal', 'recipe')`);
        await queryRunner.query(`ALTER TABLE "post" ADD "postType" "public"."post_posttype_enum" NOT NULL DEFAULT 'normal'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "recipeId" uuid`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "UQ_272752a4a341714687eab295283" UNIQUE ("recipeId")`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_272752a4a341714687eab295283" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_272752a4a341714687eab295283"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_272752a4a341714687eab295283"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "recipeId"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "postType"`);
        await queryRunner.query(`DROP TYPE "public"."post_posttype_enum"`);
    }

}
