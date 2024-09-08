import { CommandeStation } from '@/commandes/commande-station/CommandeStation.js';
import { CommandeStationStatus } from '@/commandes/commande-station/CommandeStationStatus.js';
import { PrismaCommandesStationsRepository } from '@/commandes/commande-station/db/adapters/prisma/PrismaCommandesStationsRepository.js';
import { PrismaStationsRepository } from '@/stations/liste-stations/db/adapters/prisma/PrismaStationsRepository.js';
import { Stations } from '@/stations/liste-stations/Station.js';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('PrismaCommandesStationsRepository', () => {
    let prisma: PrismaClient;
    beforeAll(async () => {
        prisma = new PrismaClient();
        await prisma.station.deleteMany();
        const repository = new PrismaStationsRepository(prisma);
        await repository.insert(
            Stations.of([
                {
                    id: '01014002',
                    nom: 'ARBENT',
                    departement: 1,
                    frequences: ['infrahoraire-6m'],
                    posteOuvert: true,
                    typePoste: 1,
                    lon: 5.669,
                    lat: 46.278167,
                    alt: 534,
                    postePublic: true,
                },
            ])
        );
    });
    beforeEach(async () => {
        await prisma.commandeStation.deleteMany();
    });
    describe('insert', () => {
        it('should insert the station commande in the database', async () => {
            const commandeStation: CommandeStation = CommandeStation.of({
                id: '779663620169',
                dateDebPeriode: new Date('2024-06-15T12:00:00Z'),
                dateFinPeriode: new Date('2024-06-15T13:00:00Z'),
                idStation: '01014002',
                status: 'pending',
            });
            const repository = new PrismaCommandesStationsRepository(prisma);
            await repository.insert(commandeStation);
            const insertedInformationsStations = await repository.selectAll();
            expect(insertedInformationsStations).toEqual([commandeStation]);
        });
    });
    describe('updateStatus', () => {
        it('should update the status of the command', async () => {
            const repository = new PrismaCommandesStationsRepository(prisma);

            await repository.insert(
                CommandeStation.of({
                    id: '779663620169',
                    dateDebPeriode: new Date('2024-06-15T12:00:00Z'),
                    dateFinPeriode: new Date('2024-06-15T13:00:00Z'),
                    idStation: '01014002',
                    status: 'pending',
                })
            );

            await repository.updateStatus({
                id: '779663620169',
                status: CommandeStationStatus.of('done'),
            });

            const insertedInformationsStations = await repository.selectAll();
            expect(insertedInformationsStations).toEqual([
                CommandeStation.of({
                    id: '779663620169',
                    dateDebPeriode: new Date('2024-06-15T12:00:00Z'),
                    dateFinPeriode: new Date('2024-06-15T13:00:00Z'),
                    idStation: '01014002',
                    status: 'done',
                }),
            ]);
        });
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
