import { IdStation } from '@/id-station/IdStation.js';
import { utcFrom } from '@/lib/date/utcFrom.js';
import { InformationStationData } from '@/stations/information-station/api/InformationStationData.js';
import { InformationStationDTO } from '@/stations/information-station/InformationStation.js';

export function convertAPIDataToDTO(data: InformationStationData): InformationStationDTO[] {
    return data.map<InformationStationDTO>(datum => ({
        id: IdStation.of(datum.id).value(),
        nom: datum.nom,
        lieuDit: datum.lieuDit,
        bassin: datum.bassin,
        dateDebut: utcFrom(datum.dateDebut),
        dateFin: datum.dateFin ? utcFrom(datum.dateFin) : null,
        typesPoste: datum.typesPoste.map(typePoste => ({
            type: typePoste.type,
            dateDebut: utcFrom(typePoste.dateDebut),
            dateFin: typePoste.dateFin ? utcFrom(typePoste.dateFin) : null,
        })),
        parametres: datum.parametres.map(parametre => ({
            nom: parametre.nom,
            dateDebut: utcFrom(parametre.dateDebut),
            dateFin: parametre.dateFin ? utcFrom(parametre.dateFin) : null,
        })),
        producteurs: datum.producteurs.map(producteur => ({
            nom: producteur.nom,
            dateDebut: utcFrom(producteur.dateDebut),
            dateFin: producteur.dateFin ? utcFrom(producteur.dateFin) : null,
        })),
        positions: datum.positions.map(position => ({
            altitude: position.altitude,
            latitude: position.latitude,
            longitude: position.longitude,
            dateDebut: utcFrom(position.dateDebut),
            dateFin: position.dateFin ? utcFrom(position.dateFin) : null,
        })),
    }));
}
