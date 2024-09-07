import { IdStation } from '@/id-station/IdStation.js';

import { DataFrequency } from '@/stations/liste-stations/DataFrequency.js';
import { Departement } from '@/stations/liste-stations/departements/Departement.js';

export interface StationDTO {
    id: string;
    nom: string;
    departement: number;
    frequences: string[];
    posteOuvert: boolean;
    typePoste: number;
    lon: number;
    lat: number;
    alt: number;
    postePublic: boolean;
}

export class Station {
    id: IdStation;
    nom: string;
    departement: Departement;
    frequences: DataFrequency[];
    posteOuvert: boolean;
    typePoste: number;
    lon: number;
    lat: number;
    alt: number;
    postePublic: boolean;

    private constructor(
        id: IdStation,
        nom: string,
        departement: Departement,
        frequences: DataFrequency[],
        posteOuvert: boolean,
        typePoste: number,
        lon: number,
        lat: number,
        alt: number,
        postePublic: boolean
    ) {
        this.id = id;
        this.nom = nom;
        this.departement = departement;
        this.frequences = frequences;
        this.posteOuvert = posteOuvert;
        this.typePoste = typePoste;
        this.lon = lon;
        this.lat = lat;
        this.alt = alt;
        this.postePublic = postePublic;
    }

    static of(dto: StationDTO): Station {
        return new Station(
            IdStation.of(dto.id),
            dto.nom,
            Departement.of(dto.departement),
            dto.frequences.map(DataFrequency.of),
            dto.posteOuvert,
            dto.typePoste,
            dto.lon,
            dto.lat,
            dto.alt,
            dto.postePublic
        );
    }

    toDTO(): StationDTO {
        return {
            id: this.id.value(),
            nom: this.nom,
            departement: this.departement.value(),
            frequences: this.frequences.map(f => f.value()),
            posteOuvert: this.posteOuvert,
            typePoste: this.typePoste,
            lon: this.lon,
            lat: this.lat,
            alt: this.alt,
            postePublic: this.postePublic,
        };
    }
}

export class Stations {
    private readonly stations: Station[];

    private constructor(stations: Station[]) {
        this.stations = stations;
    }

    static of(dtos: StationDTO[]): Stations {
        return new Stations(dtos.map(Station.of));
    }

    get(): Station[] {
        return this.stations;
    }

    add(...stations: Station[]): void {
        this.stations.push(...stations);
    }

    merge(stations: Stations): void {
        this.add(...stations.get());
    }

    toDTOs(): StationDTO[] {
        return this.stations.map(station => station.toDTO());
    }
}
