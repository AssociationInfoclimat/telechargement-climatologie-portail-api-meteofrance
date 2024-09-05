import { CommandeStationHoraireMaker } from '@/commandes/commande-station/horaire/api/adapters/meteofrance/makeCommandeStationHoraire.js';
import { CommandeStationInfrahoraire6mMaker } from '@/commandes/commande-station/infrahoraire-6m/api/adapters/meteofrance/makeCommandeStationInfrahoraire6m.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { CommandeStationQuotidienneMaker } from '@/commandes/commande-station/quotidienne/api/adapters/meteofrance/makeCommandeStationQuotidienne.js';
import { IdStation } from '@/id-station/IdStation.js';
import { wait } from '@/lib/wait.js';
import { CommandeFichierFetcher } from '@/telechargement/commande-fichier/api/adapters/meteofrance/fetchCommandeFichier.js';
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
                try {
                    const maker = new CommandeStationInfrahoraire6mMaker();
                    const idCommande = await maker.makeCommandeStationInfrahoraire6m({
                        idStation: IdStation.of('76116001'),
                        periodeCommande: PeriodeCommande.of({
                            debut: '2024-06-15T12:00:00Z',
                            fin: '2024-06-15T13:00:00Z',
                        }),
                    });
                    const fetcher = new CommandeFichierFetcher();
                    const commande = await fetcher.fetchCommandeFichier<Infrahoraire6mCommandeData>(idCommande);
                    expect(commande).toEqual({ type: 'pending' });
                } catch (e) {
                    console.error(e);
                    console.error({ e });
                    throw e;
                }
            });
        });
        describe('when ready', async () => {
            it('should fetch data', async () => {
                try {
                    const maker = new CommandeStationInfrahoraire6mMaker();
                    const idCommande = await maker.makeCommandeStationInfrahoraire6m({
                        idStation: IdStation.of('76116001'),
                        periodeCommande: PeriodeCommande.of({
                            debut: '2024-06-15T12:00:00Z',
                            fin: '2024-06-15T13:00:00Z',
                        }),
                    });
                    await wait(5 * 1000);
                    const fetcher = new CommandeFichierFetcher();
                    const commande = await fetcher.fetchCommandeFichier<Infrahoraire6mCommandeData>(idCommande);
                    expect(commande).toEqual({
                        type: 'ready',
                        data: expect.any(String),
                    });
                } catch (e) {
                    console.error(e);
                    console.error({ e });
                    throw e;
                }
            });
        });
    });

    describe('Horaire', async () => {
        describe('when pending', async () => {
            it('should say it is pending', async () => {
                try {
                    const maker = new CommandeStationHoraireMaker();
                    const idCommande = await maker.makeCommandeStationHoraire({
                        idStation: IdStation.of('76116001'),
                        periodeCommande: PeriodeCommande.of({
                            debut: '2024-06-15T12:00:00Z',
                            fin: '2024-06-15T14:00:00Z',
                        }),
                    });
                    const fetcher = new CommandeFichierFetcher();
                    const commande = await fetcher.fetchCommandeFichier<HoraireCommandeData>(idCommande);
                    expect(commande).toEqual({ type: 'pending' });
                } catch (e) {
                    console.error(e);
                    console.error({ e });
                    throw e;
                }
            });
        });
        describe('when ready', async () => {
            it('should fetch data', async () => {
                try {
                    const maker = new CommandeStationHoraireMaker();
                    const idCommande = await maker.makeCommandeStationHoraire({
                        idStation: IdStation.of('76116001'),
                        periodeCommande: PeriodeCommande.of({
                            debut: '2024-06-15T12:00:00Z',
                            fin: '2024-06-15T13:00:00Z',
                        }),
                    });
                    await wait(5 * 1000);
                    const fetcher = new CommandeFichierFetcher();
                    const commande = await fetcher.fetchCommandeFichier<HoraireCommandeData>(idCommande);
                    expect(commande).toEqual({
                        type: 'ready',
                        data: expect.any(String),
                    });
                } catch (e) {
                    console.error(e);
                    console.error({ e });
                    throw e;
                }
            });
        });
    });

    describe('Quotidienne', async () => {
        describe('when pending', async () => {
            it('should say it is pending', async () => {
                try {
                    const maker = new CommandeStationQuotidienneMaker();
                    const idCommande = await maker.makeCommandeStationQuotidienne({
                        idStation: IdStation.of('76116001'),
                        periodeCommande: PeriodeCommande.of({
                            debut: '2024-06-15T12:00:00Z',
                            fin: '2024-06-16T12:00:00Z',
                        }),
                    });
                    const fetcher = new CommandeFichierFetcher();
                    const commande = await fetcher.fetchCommandeFichier<QuotidienneCommandeData>(idCommande);
                    expect(commande).toEqual({ type: 'pending' });
                } catch (e) {
                    console.error(e);
                    console.error({ e });
                    throw e;
                }
            });
        });
        describe('when ready', async () => {
            it('should fetch data', async () => {
                try {
                    const maker = new CommandeStationQuotidienneMaker();
                    const idCommande = await maker.makeCommandeStationQuotidienne({
                        idStation: IdStation.of('76116001'),
                        periodeCommande: PeriodeCommande.of({
                            debut: '2024-06-15T12:00:00Z',
                            fin: '2024-06-15T13:00:00Z',
                        }),
                    });
                    await wait(5 * 1000);
                    const fetcher = new CommandeFichierFetcher();
                    const commande = await fetcher.fetchCommandeFichier<QuotidienneCommandeData>(idCommande);
                    expect(commande).toEqual({
                        type: 'ready',
                        data: expect.any(String),
                    });
                } catch (e) {
                    console.error(e);
                    console.error({ e });
                    throw e;
                }
            });
        });
    });

    describe.skip('when already downloaded', async () => {
        it('should TODO', async () => {
            try {
                const fetcher = new CommandeFichierFetcher();
                const commande = await fetcher.fetchCommandeFichier<QuotidienneCommandeData>('779369825174');
                expect(commande).toEqual({
                    type: 'ready',
                    data: expect.any(String),
                });
            } catch (e) {
                console.error(e);
                console.error({ e });
                throw e;
            }
        });
    });
    describe.skip('when non existing commande', async () => {
        it('should TODO', async () => {
            try {
                const fetcher = new CommandeFichierFetcher();
                const commande = await fetcher.fetchCommandeFichier<QuotidienneCommandeData>('123456789012');
                expect(commande).toEqual({
                    type: 'ready',
                    data: expect.any(String),
                });
            } catch (e) {
                console.error(e);
                console.error({ e });
                throw e;
            }
        });
    });
});
