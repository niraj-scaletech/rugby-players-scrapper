import { MigrationInterface, QueryRunner } from "typeorm";

export class All1739271848149 implements MigrationInterface {
    name = 'All1739271848149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(64) NOT NULL, "slug" character varying(64) NOT NULL, CONSTRAINT "UQ_4cd2b9410fe9cb70466134c2f9a" UNIQUE ("slug"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(128) NOT NULL, "slug" character varying(128) NOT NULL, "nationality" character varying(64), "age" integer, "height" character varying(16), "weight" character varying(16), "countryId" uuid, CONSTRAINT "UQ_7310cf1fe0f6e1b70560e5d5a6c" UNIQUE ("slug"), CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_7d976e6c0eaf82fee3975d8e98a" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_7d976e6c0eaf82fee3975d8e98a"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
