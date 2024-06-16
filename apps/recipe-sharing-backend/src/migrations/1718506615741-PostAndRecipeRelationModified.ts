import { MigrationInterface, QueryRunner } from "typeorm";

export class PostAndRecipeRelationModified1718506615741 implements MigrationInterface {
    name = 'PostAndRecipeRelationModified1718506615741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_272752a4a341714687eab295283"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_272752a4a341714687eab295283"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_272752a4a341714687eab295283" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_272752a4a341714687eab295283"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "UQ_272752a4a341714687eab295283" UNIQUE ("recipeId")`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_272752a4a341714687eab295283" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
