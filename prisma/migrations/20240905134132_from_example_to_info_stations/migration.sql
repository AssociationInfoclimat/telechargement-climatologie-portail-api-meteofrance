/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post"
    DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile"
    DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Station"
(
    "createdAt"   TIMESTAMP(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3)     NOT NULL,
    "id"          CHAR(8)          NOT NULL,
    "nom"         TEXT             NOT NULL,
    "posteOuvert" BOOLEAN          NOT NULL,
    "typePoste"   INTEGER          NOT NULL,
    "lon"         DOUBLE PRECISION NOT NULL,
    "lat"         DOUBLE PRECISION NOT NULL,
    "alt"         DOUBLE PRECISION NOT NULL,
    "postePublic" BOOLEAN          NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InformationStation"
(
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id"        CHAR(8)      NOT NULL,
    "nom"       TEXT         NOT NULL,
    "lieuDit"   TEXT         NOT NULL,
    "bassin"    TEXT         NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin"   TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InformationStation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypePoste"
(
    "id"        SERIAL       NOT NULL,
    "type"      INTEGER      NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin"   TIMESTAMP(3) NOT NULL,
    "stationId" CHAR(8)      NOT NULL,

    CONSTRAINT "TypePoste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parametre"
(
    "id"        SERIAL       NOT NULL,
    "nom"       TEXT         NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin"   TIMESTAMP(3) NOT NULL,
    "stationId" CHAR(8)      NOT NULL,

    CONSTRAINT "Parametre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producteur"
(
    "id"        SERIAL       NOT NULL,
    "nom"       TEXT         NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin"   TIMESTAMP(3) NOT NULL,
    "stationId" CHAR(8)      NOT NULL,

    CONSTRAINT "Producteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position"
(
    "id"        SERIAL           NOT NULL,
    "altitude"  DOUBLE PRECISION NOT NULL,
    "latitude"  DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "dateDebut" TIMESTAMP(3)     NOT NULL,
    "dateFin"   TIMESTAMP(3)     NOT NULL,
    "stationId" CHAR(8)          NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InformationStation"
    ADD CONSTRAINT "InformationStation_id_fkey" FOREIGN KEY ("id") REFERENCES "Station" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypePoste"
    ADD CONSTRAINT "TypePoste_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "InformationStation" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parametre"
    ADD CONSTRAINT "Parametre_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "InformationStation" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producteur"
    ADD CONSTRAINT "Producteur_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "InformationStation" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position"
    ADD CONSTRAINT "Position_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "InformationStation" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
