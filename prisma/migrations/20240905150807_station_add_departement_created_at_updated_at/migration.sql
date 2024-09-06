/*
  Warnings:

  - Added the required column `departement` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequence` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Station"
    ADD COLUMN "departement" INTEGER     NOT NULL,
    ADD COLUMN "frequence"   VARCHAR(15) NOT NULL;
