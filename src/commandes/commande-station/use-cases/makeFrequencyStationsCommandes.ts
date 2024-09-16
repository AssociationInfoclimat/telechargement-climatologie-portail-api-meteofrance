import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { CommandesStationsRepository } from '@/commandes/commande-station/db/CommandesStationsRepository.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { makeStationsCommandes } from '@/commandes/commande-station/use-cases/makeStationsCommandes.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';

export async function makeFrequencyStationsCommandes({
    frequence,
    stationsRepository,
    periodeCommande,
    commandeStationApiMaker,
    commandesStationsRepository,
    retries = 5,
    waitingTimeInMs = 2 * 1000,
}: {
    frequence: DataFrequency;
    stationsRepository: StationsRepository;
    periodeCommande: PeriodeCommande;
    commandeStationApiMaker: CommandeStationAPIMaker;
    commandesStationsRepository: CommandesStationsRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    const idsStations = await stationsRepository.selectIdsForFrequency(frequence);
    await makeStationsCommandes({
        frequence,
        idsStations,
        periodeCommande,
        commandeStationApiMaker,
        commandesStationsRepository,
        retries,
        waitingTimeInMs,
    });
}
