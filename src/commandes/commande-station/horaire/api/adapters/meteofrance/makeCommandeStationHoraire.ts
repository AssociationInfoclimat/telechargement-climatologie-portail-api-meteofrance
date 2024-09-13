import { createCommandeStationAPIMaker } from '@/commandes/commande-station/api/adapters/meteofrance/makeCommandeStationFrequency.js';
import { CommandeStationAPIMaker } from '@/commandes/commande-station/api/CommandeStationAPIMaker.js';

export const makeCommandeStationHoraire: CommandeStationAPIMaker = createCommandeStationAPIMaker();
