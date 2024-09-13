import { makeCommandeStation } from '@/commandes/commande-station/api/adapters/meteofrance/makeCommandeStation.js';
import { PrismaCommandesStationsRepository } from '@/commandes/commande-station/db/adapters/prisma/PrismaCommandesStationsRepository.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { makeStationCommande } from '@/commandes/commande-station/use-cases/makeStationCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('makeStationCommande', () => {
    const prisma = new PrismaClient();
    beforeAll(async () => {
        await prisma.commandeStation.deleteMany();
        const repository = new PrismaStationsRepository(prisma);
        await repository.upsertMany(
            Stations.of([
                {
                    id: '76116001',
                    nom: 'ROUEN-BOOS',
                    departement: 76,
                    frequence: 'quotidienne',
                    posteOuvert: true,
                    typePoste: 0,
                    lon: 1.178333,
                    lat: 49.3895,
                    alt: 156,
                    postePublic: true,
                },
            ])
        );
    });
    it('should make a station commande', async () => {
        const repository = new PrismaCommandesStationsRepository(prisma);
        await makeStationCommande({
            frequence: DataFrequency.of('quotidienne'),
            idStation: IdStation.of('76116001'),
            periodeCommande: PeriodeCommande.of({ debut: '2000-06-15T12:00:00Z', fin: '2000-06-15T12:00:00Z' }),
            commandeStationApiMaker: makeCommandeStation,
            commandesStationsRepository: repository,
        });
        const commandes = await repository.selectAll();
        expect(commandes.map(c => c.toDTO())).toEqual([
            {
                id: expect.any(String),
                frequence: 'quotidienne',
                idStation: '76116001',
                status: 'pending',
                dateDebPeriode: new Date('2000-06-15T12:00:00Z'),
                dateFinPeriode: new Date('2000-06-15T12:00:00Z'),
            },
        ]);
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
