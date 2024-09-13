import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { CommandesStationsRepository } from '@/commandes/commande-station/db/CommandesStationsRepository.js';
import {
    createDaysPeriodeCommande,
    DaysCommande,
} from '@/commandes/commande-station/periode-commande/createDaysPeriodeCommande.js';
import { makeStationCommande } from '@/commandes/commande-station/use-cases/makeStationCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export async function makeDaysStationCommande({
    frequence,
    idStation,
    daysCommande,
    commandeStationApiMaker,
    commandesStationsRepository,
    retries = 5,
    waitingTimeInMs = 2 * 1000,
}: {
    frequence: DataFrequency;
    idStation: IdStation;
    daysCommande: DaysCommande;
    commandeStationApiMaker: CommandeStationAPIMaker;
    commandesStationsRepository: CommandesStationsRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    await makeStationCommande({
        frequence,
        idStation,
        periodeCommande: createDaysPeriodeCommande(daysCommande),
        commandeStationApiMaker,
        commandesStationsRepository,
        retries,
        waitingTimeInMs,
    });
}
