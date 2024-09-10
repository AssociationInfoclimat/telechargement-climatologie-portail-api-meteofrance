/*
  Warnings:

  - You are about to drop the column `frequences` on the `Station` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,frequence]` on the table `Station` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `frequence` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Station"
    DROP COLUMN "frequences",
    ADD COLUMN "frequence" VARCHAR(15) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Station_id_frequence_key" ON "Station" ("id", "frequence");
