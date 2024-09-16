import { makeCommandeStation } from '@/commandes/commande-station/api/adapters/meteofrance/makeCommandeStation.js';
import { PrismaCommandesStationsRepository } from '@/commandes/commande-station/db/adapters/prisma/PrismaCommandesStationsRepository.js';
import { createHoursPeriodeCommande } from '@/commandes/commande-station/periode-commande/createHoursPeriodeCommande.js';
import { makeQuotidienneStationsCommandes } from '@/commandes/commande-station/use-cases/quotidienne/makeQuotidienneStationsCommandes.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('makeQuotidienneStationsCommandes', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.station.deleteMany();
        await prisma.commandeStation.deleteMany();
    });
    it('should make commandes for all horaire stations', async () => {
        const stationsRepository = new PrismaStationsRepository(prisma);
        await stationsRepository.upsertMany(
            Stations.of([
                {
                    id: '97502001',
                    nom: 'ST-PIERRE',
                    departement: 975,
                    frequence: 'infrahoraire-6m',
                    posteOuvert: true,
                    typePoste: 0,
                    lon: -56.179167,
                    lat: 46.766333,
                    alt: 21,
                    postePublic: true,
                },
                {
                    id: '97502001',
                    nom: 'ST-PIERRE',
                    departement: 975,
                    frequence: 'horaire',
                    posteOuvert: true,
                    typePoste: 0,
                    lon: -56.179167,
                    lat: 46.766333,
                    alt: 21,
                    postePublic: true,
                },
                {
                    id: '97502004',
                    nom: 'SAINT-PIERRE',
                    departement: 975,
                    frequence: 'horaire',
                    posteOuvert: false,
                    typePoste: 0,
                    lon: -56.172,
                    lat: 46.773,
                    alt: 3,
                    postePublic: true,
                },
                {
                    id: '97502001',
                    nom: 'ST-PIERRE',
                    departement: 975,
                    frequence: 'quotidienne',
                    posteOuvert: true,
                    typePoste: 0,
                    lon: -56.179167,
                    lat: 46.766333,
                    alt: 21,
                    postePublic: true,
                },
                {
                    id: '97502004',
                    nom: 'SAINT-PIERRE',
                    departement: 975,
                    frequence: 'quotidienne',
                    posteOuvert: false,
                    typePoste: 0,
                    lon: -56.172,
                    lat: 46.773,
                    alt: 3,
                    postePublic: true,
                },
            ])
        );
        const commandesStationsRepository = new PrismaCommandesStationsRepository(prisma);
        await makeQuotidienneStationsCommandes({
            stationsRepository,
            periodeCommande: createHoursPeriodeCommande({
                debut: { year: 2024, month: 6, day: 14, hour: 6 },
                fin: { year: 2024, month: 6, day: 15, hour: 18 },
            }),
            commandeStationApiMaker: makeCommandeStation,
            commandesStationsRepository,
        });
        const commandes = await commandesStationsRepository.selectAll();
        expect(commandes.length).greaterThan(0);
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
