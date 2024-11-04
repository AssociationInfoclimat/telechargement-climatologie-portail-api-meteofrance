export type Pack = 'RADOME' | 'ETENDU';

export interface ListeStationLineDTO {
    Id_station: string;
    Id_omm: string | null;
    Nom_usuel: string;
    Latitude: number;
    Longitude: number;
    Altitude: number;
    Date_ouverture: Date;
    Pack: Pack;
}
