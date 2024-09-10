/*
  Warnings:

  - The primary key for the `Station` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `frequence` to the `CommandeStation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommandeStation"
    DROP CONSTRAINT "CommandeStation_idStation_fkey";

-- DropForeignKey
ALTER TABLE "InformationStation"
    DROP CONSTRAINT "InformationStation_id_fkey";

-- DropIndex
DROP INDEX "Station_id_frequence_key";

-- AlterTable
ALTER TABLE "CommandeStation"
    ADD COLUMN "frequence" VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE "Station"
    DROP CONSTRAINT "Station_pkey",
    ADD CONSTRAINT "Station_pkey" PRIMARY KEY ("id", "frequence");

-- AddForeignKey
ALTER TABLE "Station"
    ADD CONSTRAINT "Station_id_fkey" FOREIGN KEY ("id") REFERENCES "InformationStation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeStation"
    ADD CONSTRAINT "CommandeStation_idStation_frequence_fkey" FOREIGN KEY ("idStation", "frequence") REFERENCES "Station" ("id", "frequence") ON DELETE CASCADE ON UPDATE CASCADE;
