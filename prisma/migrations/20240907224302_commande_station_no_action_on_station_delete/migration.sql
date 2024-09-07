-- DropForeignKey
ALTER TABLE "CommandeStation"
    DROP CONSTRAINT "CommandeStation_idStation_fkey";

-- AddForeignKey
ALTER TABLE "CommandeStation"
    ADD CONSTRAINT "CommandeStation_idStation_fkey" FOREIGN KEY ("idStation") REFERENCES "Station" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
