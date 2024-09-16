import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { CommandesStationsRepository } from '@/commandes/commande-station/db/CommandesStationsRepository.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { makeFrequencyStationsCommandes } from '@/commandes/commande-station/use-cases/makeFrequencyStationsCommandes.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';

export async function makeInfrahoraire6mStationsCommandes({
    stationsRepository,
    periodeCommande,
    commandeStationApiMaker,
    commandesStationsRepository,
    retries = 5,
    waitingTimeInMs = 2 * 1000,
}: {
    stationsRepository: StationsRepository;
    periodeCommande: PeriodeCommande;
    commandeStationApiMaker: CommandeStationAPIMaker;
    commandesStationsRepository: CommandesStationsRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    await makeFrequencyStationsCommandes({
        frequence: DataFrequency.of('infrahoraire-6m'),
        periodeCommande,
        commandeStationApiMaker,
        commandesStationsRepository,
        stationsRepository,
        retries,
        waitingTimeInMs,
    });
}
