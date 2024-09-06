import { IdStation } from '@/id-station/IdStation.js';

export interface InformationStationDTO {
    id: string;
    nom: string;
    lieuDit: string;
    bassin: string;
    dateDebut: Date;
    dateFin: Date | null;
    typesPoste: {
        type: number;
        dateDebut: Date;
        dateFin: Date | null;
    }[];
    parametres: {
        nom: string;
        dateDebut: Date;
        dateFin: Date | null;
    }[];
    producteurs: {
        nom: string;
        dateDebut: Date;
        dateFin: Date | null;
    }[];
    positions: {
        altitude: number;
        latitude: number;
        longitude: number;
        dateDebut: Date;
        dateFin: Date | null;
    }[];
}

export class InformationStation {
    id: IdStation;
    nom: string;
    lieuDit: string;
    bassin: string;
    dateDebut: Date;
    dateFin: Date | null;
    typesPoste: {
        type: number;
        dateDebut: Date;
        dateFin: Date | null;
    }[];
    parametres: {
        nom: string;
        dateDebut: Date;
        dateFin: Date | null;
    }[];
    producteurs: {
        nom: string;
        dateDebut: Date;
        dateFin: Date | null;
    }[];
    positions: {
        altitude: number;
        latitude: number;
        longitude: number;
        dateDebut: Date;
        dateFin: Date | null;
    }[];

    private constructor(
        id: IdStation,
        nom: string,
        lieuDit: string,
        bassin: string,
        dateDebut: Date,
        dateFin: Date | null,
        typesPoste: { type: number; dateDebut: Date; dateFin: Date | null }[],
        parametres: { nom: string; dateDebut: Date; dateFin: Date | null }[],
        producteurs: { nom: string; dateDebut: Date; dateFin: Date | null }[],
        positions: { altitude: number; latitude: number; longitude: number; dateDebut: Date; dateFin: Date | null }[]
    ) {
        this.id = id;
        this.nom = nom;
        this.lieuDit = lieuDit;
        this.bassin = bassin;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.typesPoste = typesPoste;
        this.parametres = parametres;
        this.producteurs = producteurs;
        this.positions = positions;
    }

    static of(dto: InformationStationDTO): InformationStation {
        return new InformationStation(
            IdStation.of(dto.id),
            dto.nom,
            dto.lieuDit,
            dto.bassin,
            dto.dateDebut,
            dto.dateFin,
            dto.typesPoste,
            dto.parametres,
            dto.producteurs,
            dto.positions
        );
    }

    toDTO(): InformationStationDTO {
        return {
            id: this.id.value(),
            nom: this.nom,
            lieuDit: this.lieuDit,
            bassin: this.bassin,
            dateDebut: this.dateDebut,
            dateFin: this.dateFin,
            typesPoste: this.typesPoste,
            parametres: this.parametres,
            producteurs: this.producteurs,
            positions: this.positions,
        };
    }
}

export class InformationsStations {
    private readonly informationsStations: InformationStation[];

    private constructor(informationsStations: InformationStation[]) {
        this.informationsStations = informationsStations;
    }

    static of(dtos: InformationStationDTO[]): InformationsStations {
        return new InformationsStations(dtos.map(InformationStation.of));
    }

    get(): InformationStation[] {
        return this.informationsStations;
    }

    add(...informationsStations: InformationStation[]): void {
        this.informationsStations.push(...informationsStations);
    }

    merge(informationsStations: InformationsStations): void {
        this.add(...informationsStations.get());
    }

    toDTOs(): InformationStationDTO[] {
        return this.informationsStations.map(informationStation => informationStation.toDTO());
    }
}