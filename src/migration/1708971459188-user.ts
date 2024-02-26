import { MigrationInterface, QueryRunner } from "typeorm";

export class User1708971459188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        ` 
        --Table Definition
        CREATE TABLE "users"  (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" character varying NOT NULL,
          "email" character varying NOT NULL,
          "password" character varying NOT NULL,
          "role"  character varying NOT NULL DEFAULT 'admin',
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        )
        
        `
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
