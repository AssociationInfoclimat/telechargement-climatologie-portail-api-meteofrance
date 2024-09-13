import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { CommandesStationsRepository } from '@/commandes/commande-station/db/CommandesStationsRepository.js';
import {
    createYearPeriodeCommande,
    YearCommande,
} from '@/commandes/commande-station/periode-commande/createYearPeriodeCommande.js';
import { makeStationCommande } from '@/commandes/commande-station/use-cases/makeStationCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export async function makeYearStationCommande({
    frequence,
    idStation,
    yearCommande,
    commandeStationApiMaker,
    commandesStationsRepository,
    retries = 5,
    waitingTimeInMs = 2 * 1000,
}: {
    frequence: DataFrequency;
    idStation: IdStation;
    yearCommande: YearCommande;
    commandeStationApiMaker: CommandeStationAPIMaker;
    commandesStationsRepository: CommandesStationsRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    await makeStationCommande({
        frequence,
        idStation,
        periodeCommande: createYearPeriodeCommande(yearCommande),
        commandeStationApiMaker,
        commandesStationsRepository,
        retries,
        waitingTimeInMs,
    });
}
