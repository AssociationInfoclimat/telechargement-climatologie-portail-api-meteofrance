import { LoggerSingleton } from '@/lib/logger/LoggerSingleton.js';
import { wait } from '@/lib/wait.js';
import { ListeStationsAPIFetcher } from '@/stations/liste-stations/api/ListeStationsAPIFetcher.js';
import { ListeStationsFetcher } from '@/stations/liste-stations/api/ListeStationsFetcher.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { StationsRepository } from '@/stations/liste-stations/db/StationsRepository.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';
import { getDepartements } from '@/stations/liste-stations/departements/getDepartements.js';
import { Stations } from '@/stations/liste-stations/Station.js';

export async function downloadListeStations({
    frequency,
    departement,
    listeStationsFetcher,
    stationsRepository,
}: {
    frequency: DataFrequency;
    departement: Departement;
    listeStationsFetcher: ListeStationsFetcher;
    stationsRepository: StationsRepository;
}): Promise<void> {
    const stations = await listeStationsFetcher.fetchListeStations({ frequency, departement });
    await stationsRepository.upsertMany(
        Stations.of(
            stations.map(station => ({
                id: station.id,
                nom: station.nom,
                departement: departement.value(),
                frequence: frequency.value(),
                posteOuvert: station.posteOuvert,
                typePoste: station.typePoste,
                lon: station.lon,
                lat: station.lat,
                alt: station.alt,
                postePublic: station.postePublic,
            }))
        )
    );
}

export async function downloadListesStations({
    listeStationsAPIFetcher,
    stationsRepository,
    throttleInMs = 2 * 1000,
    retries = 3,
    waitingTimeInMs = 5 * 1000,
}: {
    listeStationsAPIFetcher: ListeStationsAPIFetcher;
    stationsRepository: StationsRepository;
    throttleInMs?: number;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    const listeStationsFetcher = new ListeStationsFetcher({ listeStationsAPIFetcher, retries, waitingTimeInMs });
    const frequencies: DataFrequency[] = [
        DataFrequency.of('horaire'),
        DataFrequency.of('infrahoraire-6m'),
        DataFrequency.of('quotidienne'),
    ];
    const departements = getDepartements();
    for (const frequency of frequencies) {
        for (const departement of departements) {
            LoggerSingleton.getSingleton().info({
                message: `Downloading '${frequency.value()}' stations for departement '${departement.value()}'...`,
            });
            await downloadListeStations({
                listeStationsFetcher,
                frequency,
                departement,
                stationsRepository,
            });
            await wait(throttleInMs);
        }
    }
}
