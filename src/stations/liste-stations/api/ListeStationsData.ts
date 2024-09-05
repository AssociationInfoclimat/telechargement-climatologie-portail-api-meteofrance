export interface ListeStationsDataElement {
    id: string;
    nom: string;
    posteOuvert: boolean;
    typePoste: number;
    lon: number;
    lat: number;
    alt: number;
    postePublic: boolean;
}

export type ListeStationsData = ListeStationsDataElement[];
