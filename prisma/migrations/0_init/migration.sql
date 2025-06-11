CREATE EXTENSION IF NOT EXISTS timescaledb;

-- CreateEnum
CREATE TYPE "Pack" AS ENUM ('RADOME', 'ETENDU');

-- CreateTable
CREATE TABLE "Station"
(
    "createdAt"   TIMESTAMP(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3)     NOT NULL,
    "id"          CHAR(8)          NOT NULL,
    "nom"         TEXT             NOT NULL,
    "departement" INTEGER          NOT NULL,
    "frequence"   VARCHAR(15)      NOT NULL,
    "posteOuvert" BOOLEAN          NOT NULL,
    "typePoste"   INTEGER          NOT NULL,
    "lon"         DOUBLE PRECISION NOT NULL,
    "lat"         DOUBLE PRECISION NOT NULL,
    "alt"         DOUBLE PRECISION NOT NULL,
    "postePublic" BOOLEAN          NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id", "frequence")
);

-- CreateTable
CREATE TABLE "InformationStation"
(
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id"        CHAR(8)      NOT NULL,
    "nom"       TEXT         NOT NULL,
    "lieuDit"   TEXT,
    "bassin"    TEXT         NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin"   TIMESTAMP(3),

    CONSTRAINT "InformationStation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypePoste"
(
    "id"        SERIAL       NOT NULL,
    "type"      INTEGER      NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin"   TIMESTAMP(3),
    "stationId" CHAR(8)      NOT NULL,

    CONSTRAINT "TypePoste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parametre"
(
    "id"        SERIAL       NOT NULL,
    "nom"       TEXT         NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin"   TIMESTAMP(3),
    "stationId" CHAR(8)      NOT NULL,

    CONSTRAINT "Parametre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producteur"
(
    "id"        SERIAL       NOT NULL,
    "nom"       TEXT         NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin"   TIMESTAMP(3),
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
    "dateFin"   TIMESTAMP(3),
    "stationId" CHAR(8)          NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

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
    "frequence"      VARCHAR(15)  NOT NULL,

    CONSTRAINT "CommandeStation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StationTempsReel"
(
    "Id_station"     CHAR(8)          NOT NULL,
    "Id_omm"         CHAR(5),
    "Nom_usuel"      VARCHAR(255)     NOT NULL,
    "Latitude"       DOUBLE PRECISION NOT NULL,
    "Longitude"      DOUBLE PRECISION NOT NULL,
    "Altitude"       INTEGER          NOT NULL,
    "Date_ouverture" TIMESTAMP(3)     NOT NULL,
    "Pack"           "Pack"           NOT NULL,

    CONSTRAINT "StationTempsReel_pkey" PRIMARY KEY ("Id_station")
);

-- CreateTable
CREATE TABLE "InfrahoraireTempsReel"
(
    "geo_id_insee"   CHAR(8)          NOT NULL,
    "lat"            DOUBLE PRECISION NOT NULL,
    "lon"            DOUBLE PRECISION NOT NULL,
    "reference_time" TIMESTAMP(3)     NOT NULL,
    "insert_time"    TIMESTAMP(3)     NOT NULL,
    "validity_time"  TIMESTAMP(3)     NOT NULL,
    "t"              DOUBLE PRECISION,
    "td"             DOUBLE PRECISION,
    "u"              INTEGER,
    "dd"             INTEGER,
    "ff"             DOUBLE PRECISION,
    "dxi10"          INTEGER,
    "fxi10"          DOUBLE PRECISION,
    "rr_per"         DOUBLE PRECISION,
    "t_10"           DOUBLE PRECISION,
    "t_20"           DOUBLE PRECISION,
    "t_50"           DOUBLE PRECISION,
    "t_100"          DOUBLE PRECISION,
    "vv"             INTEGER,
    "etat_sol"       INTEGER,
    "sss"            DOUBLE PRECISION,
    "n"              INTEGER,
    "insolh"         DOUBLE PRECISION,
    "ray_glo01"      DOUBLE PRECISION,
    "pres"           DOUBLE PRECISION,
    "pmer"           DOUBLE PRECISION,

    CONSTRAINT "InfrahoraireTempsReel_pkey" PRIMARY KEY ("geo_id_insee", "validity_time")
) WITH (
      tsdb.hypertable = true,
      tsdb.partition_column = 'validity_time',
      tsdb.chunk_interval = '31 days',
      tsdb.create_default_indexes = false,
      tsdb.orderby = 'validity_time DESC',
      tsdb.segmentby = 'geo_id_insee'
);

-- CreateTable
CREATE TABLE "HoraireTempsReel"
(
    "geo_id_insee"   CHAR(8)          NOT NULL,
    "lat"            DOUBLE PRECISION NOT NULL,
    "lon"            DOUBLE PRECISION NOT NULL,
    "reference_time" TIMESTAMP(3)     NOT NULL,
    "insert_time"    TIMESTAMP(3)     NOT NULL,
    "validity_time"  TIMESTAMP(3)     NOT NULL,
    "t"              DOUBLE PRECISION,
    "td"             DOUBLE PRECISION,
    "tx"             DOUBLE PRECISION,
    "tn"             DOUBLE PRECISION,
    "u"              INTEGER,
    "ux"             INTEGER,
    "un"             INTEGER,
    "dd"             INTEGER,
    "ff"             DOUBLE PRECISION,
    "dxy"            INTEGER,
    "fxy"            DOUBLE PRECISION,
    "dxi"            INTEGER,
    "fxi"            DOUBLE PRECISION,
    "rr1"            DOUBLE PRECISION,
    "t_10"           DOUBLE PRECISION,
    "t_20"           DOUBLE PRECISION,
    "t_50"           DOUBLE PRECISION,
    "t_100"          DOUBLE PRECISION,
    "vv"             INTEGER,
    "etat_sol"       INTEGER,
    "sss"            DOUBLE PRECISION,
    "n"              INTEGER,
    "insolh"         DOUBLE PRECISION,
    "ray_glo01"      DOUBLE PRECISION,
    "pres"           DOUBLE PRECISION,
    "pmer"           DOUBLE PRECISION,

    CONSTRAINT "HoraireTempsReel_pkey" PRIMARY KEY ("geo_id_insee", "validity_time")
) WITH (
      tsdb.hypertable = true,
      tsdb.partition_column = 'validity_time',
      tsdb.chunk_interval = '31 days',
      tsdb.create_default_indexes = false,
      tsdb.orderby = 'validity_time DESC',
      tsdb.segmentby = 'geo_id_insee'
);

-- CreateTable
CREATE TABLE "Mensuelle"
(
    "NUM_POSTE"     CHAR(8)          NOT NULL,
    "NOM_USUEL"     VARCHAR(255)     NOT NULL,
    "LAT"           DOUBLE PRECISION NOT NULL,
    "LON"           DOUBLE PRECISION NOT NULL,
    "ALTI"          DOUBLE PRECISION NOT NULL,
    "AAAAMM"        TIMESTAMP(3)     NOT NULL,
    "RR"            DOUBLE PRECISION,
    "QRR"           INTEGER,
    "NBRR"          INTEGER,
    "RR_ME"         DOUBLE PRECISION,
    "RRAB"          DOUBLE PRECISION,
    "QRRAB"         INTEGER,
    "RRABDAT"       INTEGER,
    "NBJRR1"        INTEGER,
    "NBJRR5"        INTEGER,
    "NBJRR10"       INTEGER,
    "NBJRR30"       INTEGER,
    "NBJRR50"       INTEGER,
    "NBJRR100"      INTEGER,
    "PMERM"         DOUBLE PRECISION,
    "QPMERM"        INTEGER,
    "NBPMERM"       INTEGER,
    "PMERMINAB"     DOUBLE PRECISION,
    "QPMERMINAB"    INTEGER,
    "PMERMINABDAT"  INTEGER,
    "TX"            DOUBLE PRECISION,
    "QTX"           INTEGER,
    "NBTX"          INTEGER,
    "TX_ME"         DOUBLE PRECISION,
    "TXAB"          DOUBLE PRECISION,
    "QTXAB"         INTEGER,
    "TXDAT"         INTEGER,
    "TXMIN"         DOUBLE PRECISION,
    "QTXMIN"        INTEGER,
    "TXMINDAT"      INTEGER,
    "NBJTX0"        INTEGER,
    "NBJTX25"       INTEGER,
    "NBJTX30"       INTEGER,
    "NBJTX35"       INTEGER,
    "NBJTXI20"      INTEGER,
    "NBJTXI27"      INTEGER,
    "NBJTXS32"      INTEGER,
    "TN"            DOUBLE PRECISION,
    "QTN"           INTEGER,
    "NBTN"          INTEGER,
    "TN_ME"         DOUBLE PRECISION,
    "TNAB"          DOUBLE PRECISION,
    "QTNAB"         INTEGER,
    "TNDAT"         INTEGER,
    "TNMAX"         DOUBLE PRECISION,
    "QTNMAX"        INTEGER,
    "TNMAXDAT"      INTEGER,
    "NBJTN5"        INTEGER,
    "NBJTN10"       INTEGER,
    "NBJTNI10"      INTEGER,
    "NBJTNI15"      INTEGER,
    "NBJTNI20"      INTEGER,
    "NBJTNS20"      INTEGER,
    "NBJTNS25"      INTEGER,
    "NBJGELEE"      INTEGER,
    "TAMPLIM"       DOUBLE PRECISION,
    "QTAMPLIM"      INTEGER,
    "TAMPLIAB"      DOUBLE PRECISION,
    "QTAMPLIAB"     INTEGER,
    "TAMPLIABDAT"   INTEGER,
    "NBTAMPLI"      INTEGER,
    "TM"            DOUBLE PRECISION,
    "QTM"           INTEGER,
    "NBTM"          INTEGER,
    "TMM"           DOUBLE PRECISION,
    "QTMM"          INTEGER,
    "NBTMM"         INTEGER,
    "NBJTMS24"      INTEGER,
    "TMMIN"         DOUBLE PRECISION,
    "QTMMIN"        INTEGER,
    "TMMINDAT"      INTEGER,
    "TMMAX"         DOUBLE PRECISION,
    "QTMMAX"        INTEGER,
    "TMMAXDAT"      INTEGER,
    "UNAB"          INTEGER,
    "QUNAB"         INTEGER,
    "UNABDAT"       INTEGER,
    "NBUN"          INTEGER,
    "UXAB"          INTEGER,
    "QUXAB"         INTEGER,
    "UXABDAT"       INTEGER,
    "NBUX"          INTEGER,
    "UMM"           INTEGER,
    "QUMM"          INTEGER,
    "NBUM"          INTEGER,
    "TSVM"          DOUBLE PRECISION,
    "QTSVM"         INTEGER,
    "NBTSVM"        INTEGER,
    "ETP"           DOUBLE PRECISION,
    "QETP"          INTEGER,
    "FXIAB"         DOUBLE PRECISION,
    "QFXIAB"        INTEGER,
    "DXIAB"         INTEGER,
    "QDXIAB"        INTEGER,
    "FXIDAT"        INTEGER,
    "NBJFF10"       INTEGER,
    "NBJFF16"       INTEGER,
    "NBJFF28"       INTEGER,
    "NBFXI"         INTEGER,
    "FXI3SAB"       DOUBLE PRECISION,
    "QFXI3SAB"      INTEGER,
    "DXI3SAB"       INTEGER,
    "QDXI3SAB"      INTEGER,
    "FXI3SDAT"      INTEGER,
    "NBJFXI3S10"    INTEGER,
    "NBJFXI3S16"    INTEGER,
    "NBJFXI3S28"    INTEGER,
    "NBFXI3S"       INTEGER,
    "FXYAB"         DOUBLE PRECISION,
    "QFXYAB"        INTEGER,
    "DXYAB"         INTEGER,
    "QDXYAB"        INTEGER,
    "FXYABDAT"      INTEGER,
    "NBJFXY8"       INTEGER,
    "NBJFXY10"      INTEGER,
    "NBJFXY15"      INTEGER,
    "NBFXY"         INTEGER,
    "FFM"           DOUBLE PRECISION,
    "QFFM"          INTEGER,
    "NBFFM"         INTEGER,
    "INST"          INTEGER,
    "QINST"         INTEGER,
    "NBINST"        INTEGER,
    "NBSIGMA0"      INTEGER,
    "NBSIGMA20"     INTEGER,
    "NBSIGMA80"     INTEGER,
    "GLOT"          INTEGER,
    "QGLOT"         INTEGER,
    "NBGLOT"        INTEGER,
    "DIFT"          INTEGER,
    "QDIFT"         INTEGER,
    "NBDIFT"        INTEGER,
    "DIRT"          INTEGER,
    "QDIRT"         INTEGER,
    "NBDIRT"        INTEGER,
    "HNEIGEFTOT"    INTEGER,
    "QHNEIGEFTOT"   INTEGER,
    "HNEIGEFAB"     INTEGER,
    "QHNEIGEFAB"    INTEGER,
    "HNEIGEFDAT"    INTEGER,
    "NBHNEIGEF"     INTEGER,
    "NBJNEIG"       INTEGER,
    "NBJHNEIGEF1"   INTEGER,
    "NBJHNEIGEF5"   INTEGER,
    "NBJHNEIGEF10"  INTEGER,
    "NBJSOLNG"      INTEGER,
    "NEIGETOTM"     INTEGER,
    "QNEIGETOTM"    INTEGER,
    "NEIGETOTAB"    INTEGER,
    "QNEIGETOTAB"   INTEGER,
    "NEIGETOTABDAT" INTEGER,
    "NBJNEIGETOT1"  INTEGER,
    "NBJNEIGETOT10" INTEGER,
    "NBJNEIGETOT30" INTEGER,
    "NBJGREL"       INTEGER,
    "NBJORAG"       INTEGER,
    "NBJBROU"       INTEGER,

    CONSTRAINT "Mensuelle_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMM")
);

-- CreateTable
CREATE TABLE "Decadaire"
(
    "NUM_POSTE"     CHAR(8)          NOT NULL,
    "NOM_USUEL"     VARCHAR(255)     NOT NULL,
    "LAT"           DOUBLE PRECISION NOT NULL,
    "LON"           DOUBLE PRECISION NOT NULL,
    "ALTI"          DOUBLE PRECISION NOT NULL,
    "AAAAMM"        TIMESTAMP(3)     NOT NULL,
    "NUM_DECADE"    INTEGER          NOT NULL,
    "RR"            DOUBLE PRECISION,
    "QRR"           INTEGER,
    "NBRR"          INTEGER,
    "RRAB"          DOUBLE PRECISION,
    "QRRAB"         INTEGER,
    "RRABDAT"       INTEGER,
    "NBJRR1"        INTEGER,
    "NBJRR5"        INTEGER,
    "NBJRR10"       INTEGER,
    "NBJRR30"       INTEGER,
    "NBJRR50"       INTEGER,
    "NBJRR100"      INTEGER,
    "PMERM"         DOUBLE PRECISION,
    "QPMERM"        INTEGER,
    "NBPMERM"       INTEGER,
    "PMERMINAB"     DOUBLE PRECISION,
    "QPMERMINAB"    INTEGER,
    "PMERMINABDAT"  INTEGER,
    "TX"            DOUBLE PRECISION,
    "QTX"           INTEGER,
    "NBTX"          INTEGER,
    "TXAB"          DOUBLE PRECISION,
    "QTXAB"         INTEGER,
    "TXDAT"         INTEGER,
    "TXMIN"         DOUBLE PRECISION,
    "QTXMIN"        INTEGER,
    "TXMINDAT"      INTEGER,
    "NBJTX0"        INTEGER,
    "NBJTX25"       INTEGER,
    "NBJTX30"       INTEGER,
    "NBJTX35"       INTEGER,
    "NBJTXI20"      INTEGER,
    "NBJTXI27"      INTEGER,
    "NBJTXS32"      INTEGER,
    "TN"            DOUBLE PRECISION,
    "QTN"           INTEGER,
    "NBTN"          INTEGER,
    "TNAB"          DOUBLE PRECISION,
    "QTNAB"         INTEGER,
    "TNDAT"         INTEGER,
    "TNMAX"         DOUBLE PRECISION,
    "QTNMAX"        INTEGER,
    "TNMAXDAT"      INTEGER,
    "NBJTN5"        INTEGER,
    "NBJTN10"       INTEGER,
    "NBJTNI10"      INTEGER,
    "NBJTNI15"      INTEGER,
    "NBJTNI20"      INTEGER,
    "NBJTNS20"      INTEGER,
    "NBJTNS25"      INTEGER,
    "NBJGELEE"      INTEGER,
    "TAMPLIM"       DOUBLE PRECISION,
    "QTAMPLIM"      INTEGER,
    "TAMPLIAB"      DOUBLE PRECISION,
    "QTAMPLIAB"     INTEGER,
    "TAMPLIABDAT"   INTEGER,
    "NBTAMPLI"      INTEGER,
    "TM"            DOUBLE PRECISION,
    "QTM"           INTEGER,
    "NBTM"          INTEGER,
    "TMM"           DOUBLE PRECISION,
    "QTMM"          INTEGER,
    "NBTMM"         INTEGER,
    "NBJTMS24"      INTEGER,
    "TMMIN"         DOUBLE PRECISION,
    "QTMMIN"        INTEGER,
    "TMMINDAT"      INTEGER,
    "TMMAX"         DOUBLE PRECISION,
    "QTMMAX"        INTEGER,
    "TMMAXDAT"      INTEGER,
    "UNAB"          INTEGER,
    "QUNAB"         INTEGER,
    "UNABDAT"       INTEGER,
    "NBUN"          INTEGER,
    "UXAB"          INTEGER,
    "QUXAB"         INTEGER,
    "UXABDAT"       INTEGER,
    "NBUX"          INTEGER,
    "UMM"           INTEGER,
    "QUMM"          INTEGER,
    "NBUM"          INTEGER,
    "TSVM"          DOUBLE PRECISION,
    "QTSVM"         INTEGER,
    "NBTSVM"        INTEGER,
    "FXIAB"         DOUBLE PRECISION,
    "QFXIAB"        INTEGER,
    "DXIAB"         INTEGER,
    "QDXIAB"        INTEGER,
    "FXIDAT"        INTEGER,
    "NBJFF10"       INTEGER,
    "NBJFF16"       INTEGER,
    "NBJFF28"       INTEGER,
    "NBFXI"         INTEGER,
    "FXI3SAB"       DOUBLE PRECISION,
    "QFXI3SAB"      INTEGER,
    "DXI3SAB"       INTEGER,
    "QDXI3SAB"      INTEGER,
    "FXI3SDAT"      INTEGER,
    "NBJFXI3S10"    INTEGER,
    "NBJFXI3S16"    INTEGER,
    "NBJFXI3S28"    INTEGER,
    "NBFXI3S"       INTEGER,
    "FXYAB"         DOUBLE PRECISION,
    "QFXYAB"        INTEGER,
    "DXYAB"         INTEGER,
    "QDXYAB"        INTEGER,
    "FXYABDAT"      INTEGER,
    "NBJFXY8"       INTEGER,
    "NBJFXY10"      INTEGER,
    "NBJFXY15"      INTEGER,
    "NBFXY"         INTEGER,
    "FFM"           DOUBLE PRECISION,
    "QFFM"          INTEGER,
    "NBFFM"         INTEGER,
    "INST"          INTEGER,
    "QINST"         INTEGER,
    "NBINST"        INTEGER,
    "NBSIGMA0"      INTEGER,
    "NBSIGMA20"     INTEGER,
    "NBSIGMA80"     INTEGER,
    "GLOT"          INTEGER,
    "QGLOT"         INTEGER,
    "NBGLOT"        INTEGER,
    "DIFT"          INTEGER,
    "QDIFT"         INTEGER,
    "NBDIFT"        INTEGER,
    "DIRT"          INTEGER,
    "QDIRT"         INTEGER,
    "NBDIRT"        INTEGER,
    "HNEIGEFTOT"    INTEGER,
    "QHNEIGEFTOT"   INTEGER,
    "HNEIGEFAB"     INTEGER,
    "QHNEIGEFAB"    INTEGER,
    "HNEIGEFDAT"    INTEGER,
    "NBHNEIGEF"     INTEGER,
    "NBJNEIG"       INTEGER,
    "NBJHNEIGEF1"   INTEGER,
    "NBJHNEIGEF5"   INTEGER,
    "NBJHNEIGEF10"  INTEGER,
    "NBJSOLNG"      INTEGER,
    "NEIGETOTM"     INTEGER,
    "QNEIGETOTM"    INTEGER,
    "NEIGETOTAB"    INTEGER,
    "QNEIGETOTAB"   INTEGER,
    "NEIGETOTABDAT" INTEGER,
    "NBJNEIGETOT1"  INTEGER,
    "NBJNEIGETOT10" INTEGER,
    "NBJNEIGETOT30" INTEGER,
    "NBJGREL"       INTEGER,
    "NBJORAG"       INTEGER,
    "NBJBROU"       INTEGER,

    CONSTRAINT "Decadaire_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMM", "NUM_DECADE")
);

-- CreateTable
CREATE TABLE "DecadaireAgro"
(
    "NUM_POSTE"  CHAR(8)          NOT NULL,
    "NOM_USUEL"  VARCHAR(255)     NOT NULL,
    "LAT"        DOUBLE PRECISION NOT NULL,
    "LON"        DOUBLE PRECISION NOT NULL,
    "ALTI"       DOUBLE PRECISION NOT NULL,
    "AAAAMM"     TIMESTAMP(3)     NOT NULL,
    "NUM_DECADE" INTEGER          NOT NULL,
    "RR"         DOUBLE PRECISION,
    "CRR"        INTEGER,
    "TN"         DOUBLE PRECISION,
    "CTN"        INTEGER,
    "TX"         DOUBLE PRECISION,
    "CTX"        INTEGER,
    "FFM"        DOUBLE PRECISION,
    "CFFM"       INTEGER,
    "TSVM"       DOUBLE PRECISION,
    "CTSVM"      INTEGER,
    "INST"       INTEGER,
    "CINST"      INTEGER,
    "GLOT"       INTEGER,
    "CGLOT"      INTEGER,
    "ETP"        DOUBLE PRECISION,

    CONSTRAINT "DecadaireAgro_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMM", "NUM_DECADE")
);

-- CreateTable
CREATE TABLE "Quotidienne"
(
    "NUM_POSTE" CHAR(8)          NOT NULL,
    "NOM_USUEL" VARCHAR(255)     NOT NULL,
    "LAT"       DOUBLE PRECISION NOT NULL,
    "LON"       DOUBLE PRECISION NOT NULL,
    "ALTI"      DOUBLE PRECISION NOT NULL,
    "AAAAMMJJ"  TIMESTAMP(3)     NOT NULL,
    "RR"        DOUBLE PRECISION,
    "QRR"       INTEGER,
    "TN"        DOUBLE PRECISION,
    "QTN"       INTEGER,
    "HTN"       CHAR(4),
    "QHTN"      INTEGER,
    "TX"        DOUBLE PRECISION,
    "QTX"       INTEGER,
    "HTX"       CHAR(4),
    "QHTX"      INTEGER,
    "TM"        DOUBLE PRECISION,
    "QTM"       INTEGER,
    "TNTXM"     DOUBLE PRECISION,
    "QTNTXM"    INTEGER,
    "TAMPLI"    DOUBLE PRECISION,
    "QTAMPLI"   INTEGER,
    "TNSOL"     DOUBLE PRECISION,
    "QTNSOL"    INTEGER,
    "TN50"      DOUBLE PRECISION,
    "QTN50"     INTEGER,
    "DG"        INTEGER,
    "QDG"       INTEGER,
    "FFM"       DOUBLE PRECISION,
    "QFFM"      INTEGER,
    "FF2M"      DOUBLE PRECISION,
    "QFF2M"     INTEGER,
    "FXY"       DOUBLE PRECISION,
    "QFXY"      INTEGER,
    "DXY"       INTEGER,
    "QDXY"      INTEGER,
    "HXY"       CHAR(4),
    "QHXY"      INTEGER,
    "FXI"       DOUBLE PRECISION,
    "QFXI"      INTEGER,
    "DXI"       INTEGER,
    "QDXI"      INTEGER,
    "HXI"       CHAR(4),
    "QHXI"      INTEGER,
    "FXI2"      DOUBLE PRECISION,
    "QFXI2"     INTEGER,
    "DXI2"      INTEGER,
    "QDXI2"     INTEGER,
    "HXI2"      CHAR(4),
    "QHXI2"     INTEGER,
    "FXI3S"     DOUBLE PRECISION,
    "QFXI3S"    INTEGER,
    "DXI3S"     INTEGER,
    "QDXI3S"    INTEGER,
    "HXI3S"     CHAR(4),
    "QHXI3S"    INTEGER,
    "DRR"       INTEGER,
    "QDRR"      INTEGER,

    CONSTRAINT "Quotidienne_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMMJJ")
);

-- CreateTable
CREATE TABLE "QuotidienneAutresParametres"
(
    "NUM_POSTE"    CHAR(8)          NOT NULL,
    "NOM_USUEL"    VARCHAR(255)     NOT NULL,
    "LAT"          DOUBLE PRECISION NOT NULL,
    "LON"          DOUBLE PRECISION NOT NULL,
    "ALTI"         DOUBLE PRECISION NOT NULL,
    "AAAAMMJJ"     TIMESTAMP(3)     NOT NULL,
    "DHUMEC"       INTEGER,
    "QDHUMEC"      INTEGER,
    "PMERM"        DOUBLE PRECISION,
    "QPMERM"       INTEGER,
    "PMERMIN"      DOUBLE PRECISION,
    "QPMERMIN"     INTEGER,
    "INST"         INTEGER,
    "QINST"        INTEGER,
    "GLOT"         INTEGER,
    "QGLOT"        INTEGER,
    "DIFT"         INTEGER,
    "QDIFT"        INTEGER,
    "DIRT"         INTEGER,
    "QDIRT"        INTEGER,
    "INFRART"      INTEGER,
    "QINFRART"     INTEGER,
    "UV"           DOUBLE PRECISION,
    "QUV"          INTEGER,
    "UV_INDICEX"   INTEGER,
    "QUV_INDICEX"  INTEGER,
    "SIGMA"        INTEGER,
    "QSIGMA"       INTEGER,
    "UN"           INTEGER,
    "QUN"          INTEGER,
    "HUN"          CHAR(4),
    "QHUN"         INTEGER,
    "UX"           INTEGER,
    "QUX"          INTEGER,
    "HUX"          CHAR(4),
    "QHUX"         INTEGER,
    "UM"           INTEGER,
    "QUM"          INTEGER,
    "DHUMI40"      INTEGER,
    "QDHUMI40"     INTEGER,
    "DHUMI80"      INTEGER,
    "QDHUMI80"     INTEGER,
    "TSVM"         DOUBLE PRECISION,
    "QTSVM"        INTEGER,
    "ETPMON"       DOUBLE PRECISION,
    "QETPMON"      INTEGER,
    "ETPGRILLE"    DOUBLE PRECISION,
    "QETPGRILLE"   INTEGER,
    "ECOULEMENTM"  DOUBLE PRECISION,
    "QECOULEMENTM" INTEGER,
    "HNEIGEF"      INTEGER,
    "QHNEIGEF"     INTEGER,
    "NEIGETOTX"    INTEGER,
    "QNEIGETOTX"   INTEGER,
    "NEIGETOT06"   INTEGER,
    "QNEIGETOT06"  INTEGER,
    "NEIG"         BOOLEAN,
    "QNEIG"        INTEGER,
    "BROU"         BOOLEAN,
    "QBROU"        INTEGER,
    "ORAG"         BOOLEAN,
    "QORAG"        INTEGER,
    "GRESIL"       BOOLEAN,
    "QGRESIL"      INTEGER,
    "GRELE"        BOOLEAN,
    "QGRELE"       INTEGER,
    "ROSEE"        BOOLEAN,
    "QROSEE"       INTEGER,
    "VERGLAS"      BOOLEAN,
    "QVERGLAS"     INTEGER,
    "SOLNEIGE"     BOOLEAN,
    "QSOLNEIGE"    INTEGER,
    "GELEE"        BOOLEAN,
    "QGELEE"       INTEGER,
    "FUMEE"        BOOLEAN,
    "QFUMEE"       INTEGER,
    "BRUME"        BOOLEAN,
    "QBRUME"       INTEGER,
    "ECLAIR"       BOOLEAN,
    "QECLAIR"      INTEGER,
    "NB300"        INTEGER,
    "QNB300"       INTEGER,
    "BA300"        INTEGER,
    "QBA300"       INTEGER,
    "TMERMIN"      DOUBLE PRECISION,
    "QTMERMIN"     INTEGER,
    "TMERMAX"      DOUBLE PRECISION,
    "QTMERMAX"     INTEGER,

    CONSTRAINT "QuotidienneAutresParametres_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMMJJ")
);

-- CreateTable
CREATE TABLE "Horaire"
(
    "NUM_POSTE"    CHAR(8)          NOT NULL,
    "NOM_USUEL"    VARCHAR(255)     NOT NULL,
    "LAT"          DOUBLE PRECISION NOT NULL,
    "LON"          DOUBLE PRECISION NOT NULL,
    "ALTI"         DOUBLE PRECISION NOT NULL,
    "AAAAMMJJHH"   TIMESTAMP(3)     NOT NULL,
    "RR1"          DOUBLE PRECISION,
    "QRR1"         INTEGER,
    "DRR1"         INTEGER,
    "QDRR1"        INTEGER,
    "FF"           DOUBLE PRECISION,
    "QFF"          INTEGER,
    "DD"           INTEGER,
    "QDD"          INTEGER,
    "FXY"          DOUBLE PRECISION,
    "QFXY"         INTEGER,
    "DXY"          INTEGER,
    "QDXY"         INTEGER,
    "HXY"          CHAR(4),
    "QHXY"         INTEGER,
    "FXI"          DOUBLE PRECISION,
    "QFXI"         INTEGER,
    "DXI"          INTEGER,
    "QDXI"         INTEGER,
    "HXI"          CHAR(4),
    "QHXI"         INTEGER,
    "FF2"          DOUBLE PRECISION,
    "QFF2"         INTEGER,
    "DD2"          INTEGER,
    "QDD2"         INTEGER,
    "FXI2"         DOUBLE PRECISION,
    "QFXI2"        INTEGER,
    "DXI2"         INTEGER,
    "QDXI2"        INTEGER,
    "HXI2"         CHAR(4),
    "QHXI2"        INTEGER,
    "FXI3S"        DOUBLE PRECISION,
    "QFXI3S"       INTEGER,
    "DXI3S"        INTEGER,
    "QDXI3S"       INTEGER,
    "HFXI3S"       CHAR(4),
    "QHFXI3S"      INTEGER,
    "T"            DOUBLE PRECISION,
    "QT"           INTEGER,
    "TD"           DOUBLE PRECISION,
    "QTD"          INTEGER,
    "TN"           DOUBLE PRECISION,
    "QTN"          INTEGER,
    "HTN"          CHAR(4),
    "QHTN"         INTEGER,
    "TX"           DOUBLE PRECISION,
    "QTX"          INTEGER,
    "HTX"          CHAR(4),
    "QHTX"         INTEGER,
    "DG"           INTEGER,
    "QDG"          INTEGER,
    "T10"          DOUBLE PRECISION,
    "QT10"         INTEGER,
    "T20"          DOUBLE PRECISION,
    "QT20"         INTEGER,
    "T50"          DOUBLE PRECISION,
    "QT50"         INTEGER,
    "T100"         DOUBLE PRECISION,
    "QT100"        INTEGER,
    "TNSOL"        DOUBLE PRECISION,
    "QTNSOL"       INTEGER,
    "TN50"         DOUBLE PRECISION,
    "QTN50"        INTEGER,
    "TCHAUSSEE"    DOUBLE PRECISION,
    "QTCHAUSSEE"   INTEGER,
    "DHUMEC"       INTEGER,
    "QDHUMEC"      INTEGER,
    "U"            INTEGER,
    "QU"           INTEGER,
    "UN"           INTEGER,
    "QUN"          INTEGER,
    "HUN"          CHAR(4),
    "QHUN"         INTEGER,
    "UX"           INTEGER,
    "QUX"          INTEGER,
    "HUX"          CHAR(4),
    "QHUX"         INTEGER,
    "DHUMI40"      INTEGER,
    "QDHUMI40"     INTEGER,
    "DHUMI80"      INTEGER,
    "QDHUMI80"     INTEGER,
    "TSV"          DOUBLE PRECISION,
    "QTSV"         INTEGER,
    "PMER"         DOUBLE PRECISION,
    "QPMER"        INTEGER,
    "PSTAT"        DOUBLE PRECISION,
    "QPSTAT"       INTEGER,
    "PMERMIN"      DOUBLE PRECISION,
    "QPMERMIN" INTEGER,
    "GEOP"         INTEGER,
    "QGEOP"        INTEGER,
    "N"            INTEGER,
    "QN"           INTEGER,
    "NBAS"         INTEGER,
    "QNBAS"        INTEGER,
    "CL"           TEXT,
    "QCL"          INTEGER,
    "CM"           TEXT,
    "QCM"          INTEGER,
    "CH"           TEXT,
    "QCH"          INTEGER,
    "N1"           INTEGER,
    "QN1"          INTEGER,
    "C1"           TEXT,
    "QC1"          INTEGER,
    "B1"           INTEGER,
    "QB1"          INTEGER,
    "N2"           INTEGER,
    "QN2"          INTEGER,
    "C2"           TEXT,
    "QC2"          INTEGER,
    "B2"           INTEGER,
    "QB2"      INTEGER,
    "N3"           INTEGER,
    "QN3"          INTEGER,
    "C3"           TEXT,
    "QC3"          INTEGER,
    "B3"           INTEGER,
    "QB3"          INTEGER,
    "N4"           INTEGER,
    "QN4"          INTEGER,
    "C4"           TEXT,
    "QC4"          INTEGER,
    "B4"           INTEGER,
    "QB4"          INTEGER,
    "VV"           INTEGER,
    "QVV"          INTEGER,
    "DVV200"       INTEGER,
    "QDVV200"      INTEGER,
    "WW"           CHAR(2),
    "QWW"          INTEGER,
    "W1"           CHAR(2),
    "QW1"          INTEGER,
    "W2"           CHAR(2),
    "QW2"          INTEGER,
    "SOL"          INTEGER,
    "QSOL"         INTEGER,
    "SOLNG"        INTEGER,
    "QSOLNG"       INTEGER,
    "TMER"         DOUBLE PRECISION,
    "QTMER"        INTEGER,
    "VVMER"        INTEGER,
    "QVVMER"       INTEGER,
    "ETATMER"      INTEGER,
    "QETATMER"     INTEGER,
    "DIRHOULE"     INTEGER,
    "QDIRHOULE"    INTEGER,
    "HVAGUE"       DOUBLE PRECISION,
    "QHVAGUE"      INTEGER,
    "PVAGUE"       DOUBLE PRECISION,
    "QPVAGUE"      INTEGER,
    "HNEIGEF"      INTEGER,
    "QHNEIGEF"     INTEGER,
    "NEIGETOT"     INTEGER,
    "QNEIGETOT"    INTEGER,
    "TSNEIGE"      DOUBLE PRECISION,
    "QTSNEIGE"     INTEGER,
    "TUBENEIGE"    INTEGER,
    "QTUBENEIGE"   INTEGER,
    "HNEIGEFI3"    INTEGER,
    "QHNEIGEFI3"   INTEGER,
    "HNEIGEFI1"    INTEGER,
    "QHNEIGEFI1"   INTEGER,
    "ESNEIGE"      INTEGER,
    "QESNEIGE"     INTEGER,
    "CHARGENEIGE"  INTEGER,
    "QCHARGENEIGE" INTEGER,
    "GLO"          INTEGER,
    "QGLO"         INTEGER,
    "GLO2"         INTEGER,
    "QGLO2"        INTEGER,
    "DIR"          INTEGER,
    "QDIR"         INTEGER,
    "DIR2"         INTEGER,
    "QDIR2"        INTEGER,
    "DIF"          INTEGER,
    "QDIF"         INTEGER,
    "DIF2"         INTEGER,
    "QDIF2"        INTEGER,
    "UV"           DOUBLE PRECISION,
    "QUV"          INTEGER,
    "UV2"          DOUBLE PRECISION,
    "QUV2"         INTEGER,
    "UV_INDICE"    INTEGER,
    "QUV_INDICE"   INTEGER,
    "INFRAR"       INTEGER,
    "QINFRAR"      INTEGER,
    "INFRAR2"      INTEGER,
    "QINFRAR2"     INTEGER,
    "INS"          INTEGER,
    "QINS"         INTEGER,
    "INS2"         INTEGER,
    "QINS2"        INTEGER,
    "TLAGON"       DOUBLE PRECISION,
    "QTLAGON"      INTEGER,
    "TVEGETAUX"    DOUBLE PRECISION,
    "QTVEGETAUX"   INTEGER,
    "ECOULEMENT"   DOUBLE PRECISION,
    "QECOULEMENT"  INTEGER,

    CONSTRAINT "Horaire_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMMJJHH")
) WITH (
      tsdb.hypertable = true,
      tsdb.partition_column = 'AAAAMMJJHH',
      tsdb.chunk_interval = '31 days',
      tsdb.create_default_indexes = false,
      tsdb.orderby = '"AAAAMMJJHH" DESC',
      tsdb.segmentby = '"NUM_POSTE"'
);

-- CreateTable
CREATE TABLE "Infrahoraire"
(
    "NUM_POSTE"    CHAR(8)          NOT NULL,
    "NOM_USUEL"    VARCHAR(255)     NOT NULL,
    "LAT"          DOUBLE PRECISION NOT NULL,
    "LON"          DOUBLE PRECISION NOT NULL,
    "ALTI"         DOUBLE PRECISION NOT NULL,
    "AAAAMMJJHHMN" TIMESTAMP(3)     NOT NULL,
    "RR"           DOUBLE PRECISION,
    "QRR"          INTEGER,

    CONSTRAINT "Infrahoraire_pkey" PRIMARY KEY ("NUM_POSTE", "AAAAMMJJHHMN")
) WITH (
      tsdb.hypertable = true,
      tsdb.partition_column = 'AAAAMMJJHHMN',
      tsdb.chunk_interval = '31 days',
      tsdb.create_default_indexes = false,
      tsdb.orderby = '"AAAAMMJJHHMN" DESC',
      tsdb.segmentby = '"NUM_POSTE"'
);

-- CreateTable
CREATE TABLE "SaveProgress"
(
    "name"      VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaveProgress_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ommid"
(
    "mfid" CHAR(8) NOT NULL,
    "stid" VARCHAR NOT NULL,

    CONSTRAINT "ommid_pkey" PRIMARY KEY ("mfid")
);

-- CreateIndex
CREATE INDEX "Station_lat_idx" ON "Station" ("lat");

-- CreateIndex
CREATE INDEX "Station_lon_idx" ON "Station" ("lon");

-- CreateIndex
CREATE INDEX "StationTempsReel_Latitude_idx" ON "StationTempsReel" ("Latitude");

-- CreateIndex
CREATE INDEX "StationTempsReel_Longitude_idx" ON "StationTempsReel" ("Longitude");

-- CreateIndex
CREATE INDEX "InfrahoraireTempsReel_validity_time_idx" ON "InfrahoraireTempsReel" ("validity_time");

-- CreateIndex
CREATE INDEX "HoraireTempsReel_validity_time_idx" ON "HoraireTempsReel" ("validity_time");

-- CreateIndex
CREATE INDEX "Mensuelle_AAAAMM_idx" ON "Mensuelle" ("AAAAMM");

-- CreateIndex
CREATE INDEX "Decadaire_AAAAMM_idx" ON "Decadaire" ("AAAAMM");

-- CreateIndex
CREATE INDEX "Decadaire_NUM_DECADE_idx" ON "Decadaire" ("NUM_DECADE");

-- CreateIndex
CREATE INDEX "DecadaireAgro_AAAAMM_idx" ON "DecadaireAgro" ("AAAAMM");

-- CreateIndex
CREATE INDEX "DecadaireAgro_NUM_DECADE_idx" ON "DecadaireAgro" ("NUM_DECADE");

-- CreateIndex
CREATE INDEX "Quotidienne_AAAAMMJJ_idx" ON "Quotidienne" ("AAAAMMJJ");

-- CreateIndex
CREATE INDEX "QuotidienneAutresParametres_AAAAMMJJ_idx" ON "QuotidienneAutresParametres" ("AAAAMMJJ");

-- CreateIndex
CREATE INDEX "Horaire_AAAAMMJJHH_idx" ON "Horaire" ("AAAAMMJJHH");

-- CreateIndex
CREATE INDEX "Infrahoraire_AAAAMMJJHHMN_idx" ON "Infrahoraire" ("AAAAMMJJHHMN");

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

-- AddForeignKey
ALTER TABLE "CommandeStation"
    ADD CONSTRAINT "CommandeStation_idStation_frequence_fkey" FOREIGN KEY ("idStation", "frequence") REFERENCES "Station" ("id", "frequence") ON DELETE CASCADE ON UPDATE CASCADE;

