export interface InformationStationDataElement {
    id: number;
    nom: string;
    lieuDit: string | null;
    bassin: string;
    dateDebut: string;
    dateFin: string;
    typesPoste: {
        type: number;
        dateDebut: string;
        dateFin: string;
    }[];
    parametres: {
        nom: string;
        dateDebut: string;
        dateFin: string;
    }[];
    producteurs: {
        nom: string;
        dateDebut: string;
        dateFin: string;
    }[];
    positions: {
        altitude: number;
        latitude: number;
        longitude: number;
        dateDebut: string;
        dateFin: string;
    }[];
}

export type InformationStationData = InformationStationDataElement[];
