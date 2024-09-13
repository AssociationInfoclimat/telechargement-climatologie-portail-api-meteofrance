import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';
import { CommandeStationMaker } from '@/commandes/commande-station/api/CommandeStationMaker.js';
import { CommandeStation } from '@/commandes/commande-station/CommandeStation.js';
import { CommandesStationsRepository } from '@/commandes/commande-station/db/CommandesStationsRepository.js';
import { PeriodeCommande } from '@/commandes/commande-station/periode-commande/PeriodeCommande.js';
import { IdStation } from '@/id-station/IdStation.js';
import { IdCommande } from '@/IdCommande.js';
import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';

export async function makeStationCommande({
    frequence,
    idStation,
    periodeCommande,
    commandeStationApiMaker,
    commandesStationsRepository,
    retries = 5,
    waitingTimeInMs = 2 * 1000,
}: {
    frequence: DataFrequency;
    idStation: IdStation;
    periodeCommande: PeriodeCommande;
    commandeStationApiMaker: CommandeStationAPIMaker;
    commandesStationsRepository: CommandesStationsRepository;
    retries?: number;
    waitingTimeInMs?: number;
}): Promise<void> {
    const maker = new CommandeStationMaker({
        commandeStationApiMaker,
        retries,
        waitingTimeInMs,
    });
    const commandeId: IdCommande = await maker.makeCommandeStation({
        frequence,
        idStation,
        periodeCommande,
    });
    await commandesStationsRepository.insert(
        CommandeStation.of({
            id: commandeId,
            frequence: frequence.value(),
            idStation: idStation.value(),
            status: 'pending',
            dateDebPeriode: periodeCommande.toDate().debut,
            dateFinPeriode: periodeCommande.toDate().fin,
        })
    );
}
