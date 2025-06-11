import { CommandeStationMaker } from '@/commandes/commande-station/api/CommandeStationMaker.js';
import { makeCommandeStationHoraire } from '@/commandes/commande-station/horaire/api/adapters/meteofrance/makeCommandeStationHoraire.js';
import { makeCommandeStationInfrahoraire6m } from '@/commandes/commande-station/infrahoraire-6m/api/adapters/meteofrance/makeCommandeStationInfrahoraire6m.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { makeCommandeStationQuotidienne } from '@/commandes/commande-station/quotidienne/api/adapters/meteofrance/makeCommandeStationQuotidienne.js';
import { IdStation } from '@/id-station/IdStation.js';
import { wait } from '@/lib/wait.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { fetchCommandeFichier } from '@/telechargement/commande-fichier/api/adapters/meteofrance/fetchCommandeFichier.js';

import { CommandeFichierFetcher } from '@/telechargement/commande-fichier/api/CommandeFichierFetcher.js';
import {
    HoraireCommandeData,
    Infrahoraire6mCommandeData,
    QuotidienneCommandeData,
} from '@/telechargement/commande-fichier/api/CommandeResult.js';
import { describe, expect, it } from 'vitest';

describe('CommandeFichierFetcher', () => {
    describe('Infrahoraire6m', async () => {
        describe('when pending', async () => {
            it('should say it is pending', async () => {
                const maker = new CommandeStationMaker({ commandeStationApiMaker: makeCommandeStationInfrahoraire6m });
                const idCommande = await maker.makeCommandeStation({
                    frequence: DataFrequency.of('infrahoraire-6m'),
                    idStation: IdStation.of('76116001'),
                    periodeCommande: PeriodeCommande.of({
                        debut: '2024-06-15T12:00:00Z',
                        fin: '2024-06-26T20:00:00Z',
                    }),
                });
                const fetcher = new CommandeFichierFetcher({ commandeFichierAPIFetcher: fetchCommandeFichier });
                const commande = await fetcher.fetchCommandeFichier<Infrahoraire6mCommandeData>(idCommande);
                expect(commande).toEqual({ type: 'pending' });
            });
        });
        describe('when ready', async () => {
            it('should fetch data', async () => {
                const maker = new CommandeStationMaker({ commandeStationApiMaker: makeCommandeStationInfrahoraire6m });
                const idCommande = await maker.makeCommandeStation({
                    frequence: DataFrequency.of('infrahoraire-6m'),
                    idStation: IdStation.of('76116001'),
                    periodeCommande: PeriodeCommande.of({
                        debut: '2024-06-15T12:00:00Z',
                        fin: '2024-06-15T13:00:00Z',
                    }),
                });
                await wait(5 * 1000);
                const fetcher = new CommandeFichierFetcher({ commandeFichierAPIFetcher: fetchCommandeFichier });
                const commande = await fetcher.fetchCommandeFichier<Infrahoraire6mCommandeData>(idCommande);
                expect(commande).toEqual({
                    type: 'ready',
                    data: expect.any(String),
                });
            });
        });
    });

    describe('Horaire', async () => {
        describe('when pending', async () => {
            it('should say it is pending', async () => {
                const maker = new CommandeStationMaker({ commandeStationApiMaker: makeCommandeStationHoraire });
                const idCommande = await maker.makeCommandeStation({
                    frequence: DataFrequency.of('horaire'),
                    idStation: IdStation.of('76116001'),
                    periodeCommande: PeriodeCommande.of({
                        debut: '2024-06-15T12:00:00Z',
                        fin: '2024-06-23T15:00:00Z',
                    }),
                });
                const fetcher = new CommandeFichierFetcher({ commandeFichierAPIFetcher: fetchCommandeFichier });
                const commande = await fetcher.fetchCommandeFichier<HoraireCommandeData>(idCommande);
                expect(commande).toEqual({ type: 'pending' });
            });
        });
        describe('when ready', async () => {
            it('should fetch data', async () => {
                const maker = new CommandeStationMaker({ commandeStationApiMaker: makeCommandeStationHoraire });
                const idCommande = await maker.makeCommandeStation({
                    frequence: DataFrequency.of('horaire'),
                    idStation: IdStation.of('76116001'),
                    periodeCommande: PeriodeCommande.of({
                        debut: '2024-06-15T12:00:00Z',
                        fin: '2024-06-15T13:00:00Z',
                    }),
                });
                await wait(5 * 1000);
                const fetcher = new CommandeFichierFetcher({ commandeFichierAPIFetcher: fetchCommandeFichier });
                const commande = await fetcher.fetchCommandeFichier<HoraireCommandeData>(idCommande);
                expect(commande).toEqual({
                    type: 'ready',
                    data: expect.any(String),
                });
            });
        });
    });

    describe('Quotidienne', async () => {
        describe('when pending', async () => {
            it('should say it is pending', async () => {
                const maker = new CommandeStationMaker({ commandeStationApiMaker: makeCommandeStationQuotidienne });
                const idCommande = await maker.makeCommandeStation({
                    frequence: DataFrequency.of('quotidienne'),
                    idStation: IdStation.of('76116001'),
                    periodeCommande: PeriodeCommande.of({
                        debut: '2024-06-15T12:00:00Z',
                        fin: '2025-02-15T12:00:00Z',
                    }),
                });
                const fetcher = new CommandeFichierFetcher({ commandeFichierAPIFetcher: fetchCommandeFichier });
                const commande = await fetcher.fetchCommandeFichier<QuotidienneCommandeData>(idCommande);
                expect(commande).toEqual({ type: 'pending' });
            });
        });
        describe('when ready', async () => {
            it('should fetch data', async () => {
                const maker = new CommandeStationMaker({ commandeStationApiMaker: makeCommandeStationQuotidienne });
                const idCommande = await maker.makeCommandeStation({
                    frequence: DataFrequency.of('quotidienne'),
                    idStation: IdStation.of('76116001'),
                    periodeCommande: PeriodeCommande.of({
                        debut: '2024-06-15T12:00:00Z',
                        fin: '2024-06-15T13:00:00Z',
                    }),
                });
                await wait(5 * 1000);
                const fetcher = new CommandeFichierFetcher({ commandeFichierAPIFetcher: fetchCommandeFichier });
                const commande = await fetcher.fetchCommandeFichier<QuotidienneCommandeData>(idCommande);
                expect(commande).toEqual({
                    type: 'ready',
                    data: expect.any(String),
                });
            });
        });
    });

    describe('when already downloaded', async () => {
        it('should throw', async () => {
            const fetcher = new CommandeFichierFetcher({ commandeFichierAPIFetcher: fetchCommandeFichier });
            await expect(() => fetcher.fetchCommandeFichier<QuotidienneCommandeData>('779369825174')).rejects.toThrow();
        });
    });
    describe('when non existing commande', async () => {
        it('should throw', async () => {
            const fetcher = new CommandeFichierFetcher({ commandeFichierAPIFetcher: fetchCommandeFichier });
            await expect(() => fetcher.fetchCommandeFichier<QuotidienneCommandeData>('123456789012')).rejects.toThrow();
        });
    });
});
