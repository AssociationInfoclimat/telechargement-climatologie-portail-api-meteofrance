-- CreateTable
CREATE TABLE "CommandeStation"
(
    "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"      TIMESTAMP(3) NOT NULL,
    "id"             TEXT         NOT NULL,
    "status"         TEXT         NOT NULL DEFAULT 'pending',
    "dateDebPeriode" TIMESTAMP(3) NOT NULL,
    "dateFinPeriode" TIMESTAMP(3) NOT NULL,
    "idStation"      CHAR(8)      NOT NULL,

    CONSTRAINT "CommandeStation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommandeStation"
    ADD CONSTRAINT "CommandeStation_idStation_fkey" FOREIGN KEY ("idStation") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
