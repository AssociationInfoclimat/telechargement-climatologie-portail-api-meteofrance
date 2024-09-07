import { TooManyRetriesError, UnexpectedResponseError } from '@/api/APIResponse.js';
import {
    createInMemoryCommandeStationAPIMaker,
    createServerErrorAPIResponse,
    createSuccessfulAPIResponse,
} from '@/commandes/commande-station/api/adapters/in-memory/makeCommandeStationFrequency.js';
import { CommandeStationData } from '@/commandes/commande-station/api/CommandeStationData.js';
import { CommandeStationMaker } from '@/commandes/commande-station/api/CommandeStationMaker.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { describe, expect, it } from 'vitest';

describe('CommandeStationMaker', () => {
    describe('when too many retries', () => {
        it('should throw too many retries error', async () => {
            const maker = new CommandeStationMaker({
                commandeStationApiMaker: createInMemoryCommandeStationAPIMaker({
                    '76116001': createServerErrorAPIResponse(),
                }),
                waitingTimeInMs: 0,
            });
            await expect(() =>
                maker.makeCommandeStation({
                    idStation: IdStation.of('76116001'),
                    periodeCommande: PeriodeCommande.of({ debut: '2000-06-15T12:00:00Z', fin: '2000-06-15T12:00:00Z' }),
                })
            ).rejects.toThrow(TooManyRetriesError);
        });
    });
    describe('when unknown code', () => {
        it('should throw unexpected response error', async () => {
            const maker = new CommandeStationMaker({
                commandeStationApiMaker: createInMemoryCommandeStationAPIMaker(),
            });
            await expect(() =>
                maker.makeCommandeStation({
                    idStation: IdStation.of('76116001'),
                    periodeCommande: PeriodeCommande.of({ debut: '2000-06-15T12:00:00Z', fin: '2000-06-15T12:00:00Z' }),
                })
            ).rejects.toThrow(UnexpectedResponseError);
        });
    });
    describe('when wrong data', () => {
        it('should throw a zod error', async () => {
            const maker = new CommandeStationMaker({
                commandeStationApiMaker: createInMemoryCommandeStationAPIMaker({
                    '76116001': createSuccessfulAPIResponse([{ key: 'value' }]),
                }),
            });
            await expect(() =>
                maker.makeCommandeStation({
                    idStation: IdStation.of('76116001'),
                    periodeCommande: PeriodeCommande.of({ debut: '2000-06-15T12:00:00Z', fin: '2000-06-15T12:00:00Z' }),
                })
            ).rejects.toThrow();
        });
    });
    describe('when successful', () => {
        it('should return the commande id', async () => {
            const idCommande = '779660013384';
            const data: CommandeStationData = {
                elaboreProduitAvecDemandeResponse: { return: idCommande },
            };
            const maker = new CommandeStationMaker({
                commandeStationApiMaker: createInMemoryCommandeStationAPIMaker({
                    '76116001': createSuccessfulAPIResponse(data),
                }),
            });
            const fetched = await maker.makeCommandeStation({
                idStation: IdStation.of('76116001'),
                periodeCommande: PeriodeCommande.of({ debut: '2000-06-15T12:00:00Z', fin: '2000-06-15T12:00:00Z' }),
            });
            expect(fetched).toEqual(idCommande);
        });
    });
});
