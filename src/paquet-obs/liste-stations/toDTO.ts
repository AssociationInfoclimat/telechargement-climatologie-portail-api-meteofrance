import { ListeStationLine } from '@/paquet-obs/liste-stations/csv/parseCSV.js';
import { ListeStationLineDTO } from '@/paquet-obs/liste-stations/ListeStationLineDTO.js';

export function toDTO(line: ListeStationLine): ListeStationLineDTO {
    return {
        Id_station: line.Id_station.value(),
        Id_omm: line.Id_omm.value(),
        Nom_usuel: line.Nom_usuel,
        Latitude: line.Latitude,
        Longitude: line.Longitude,
        Altitude: line.Altitude,
        Date_ouverture: line.Date_ouverture,
        Pack: line.Pack,
    };
}
