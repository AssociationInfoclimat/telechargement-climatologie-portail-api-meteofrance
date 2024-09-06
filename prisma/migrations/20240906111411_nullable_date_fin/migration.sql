-- AlterTable
ALTER TABLE "InformationStation"
    ALTER COLUMN "dateFin" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Parametre"
    ALTER COLUMN "dateFin" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Position"
    ALTER COLUMN "dateFin" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Producteur"
    ALTER COLUMN "dateFin" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TypePoste"
    ALTER COLUMN "dateFin" DROP NOT NULL;
