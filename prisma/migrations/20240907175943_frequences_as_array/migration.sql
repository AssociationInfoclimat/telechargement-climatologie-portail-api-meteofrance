/*
  Warnings:

  - You are about to drop the column `frequence` on the `Station` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Station" DROP COLUMN "frequence",
ADD COLUMN     "frequences" VARCHAR(15)[];
