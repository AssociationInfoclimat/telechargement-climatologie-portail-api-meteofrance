import { parseCSV, QuotidienneLine } from '@/csv/quotidiennes/parseCSV.js';
import { HumiditeRelative } from '@/data/value-objects/HumiditeRelative.js';
import { Octa } from '@/data/value-objects/Octa.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { PositiveInteger } from '@/data/value-objects/PositiveInteger.js';
import { RelativePercentage } from '@/data/value-objects/RelativePercentage.js';
import { Time } from '@/data/value-objects/Time.js';
import { UVIndex } from '@/data/value-objects/UVIndex.js';
import { WindDirection } from '@/data/value-objects/WindDirection.js';
import { IdStation } from '@/id-station/IdStation.js';
import { describe, expect, it } from 'vitest';

describe('parseCSV', () => {
    describe('parseCSV', () => {
        it('should parse the CSV', async () => {
            const csvLines = `POSTE;DATE;RR;DRR;TN;HTN;TX;HTX;TM;TMNX;TNSOL;TN50;DG;TAMPLI;TNTXM;PMERM;PMERMIN;FFM;FXI;DXI;HXI;FXY;DXY;HXY;FF2M;FXI2;DXI2;HXI2;FXI3S;DXI3S;HXI3S;UN;HUN;UX;HUX;DHUMI40;DHUMI80;TSVM;DHUMEC;UM;INST;GLOT;DIFT;DIRT;SIGMA;INFRART;UV_INDICEX;NB300;BA300;NEIG;BROU;ORAG;GRESIL;GRELE;ROSEE;VERGLAS;SOLNEIGE;GELEE;FUMEE;BRUME;ECLAIR;ETPMON;ETPGRILLE;UV;TMERMAX;TMERMIN;HNEIGEF;NEIGETOTX;NEIGETOT06
76116001;20240615;10,4;162;8,8;415;15,2;1300;12,3;12,00;7,8;8,4;0;6,4;12,0;1006,4;1003,4;6,0;15,0;210;1331;9,8;220;918;;;;;13,6;;1210;64;913;99;2235;0;1013;12,3;;87;257;1111;;;27;;;;;0;0;0;;;;;;;0;0;;1,6;2,0;;;;;0;0
76116001;20240616;0,0;43;11,2;145;17,8;1739;14,4;14,50;10,3;10,5;0;6,6;14,5;1006,9;1005,4;3,4;9,4;220;1238;6,3;240;1025;;;;;8,9;;1238;65;1056;99;612;0;837;13,7;;85;141;1354;;;15;;;;;0;0;0;;;;;;;0;0;;2,4;2,6;;;;;0;0
76116001;20240617;2,2;1;-3,3;1230;-3,3;1230;-3,3;-3,3;-3,3;-3,3;1;1,1;-3,3;2,2;2,2;1,1;1,1;360;1230;1,1;360;1230;1,1;1,1;360;1230;1,1;360;1230;100;1230;100;1230;1;1;2,2;1;100;1;1;1;1;100;1;12;8;1;1;1;1;1;1;1;1;1;1;1;1;1;2,2;2,2;12;-3,3;-3,3;1;1;1
76116001;20240618;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`;
            const infrahoraireLines = parseCSV(csvLines);
            expect(infrahoraireLines.ok).toEqual<QuotidienneLine[]>([
                {
                    POSTE: IdStation.of('76116001'),
                    DATE: new Date('2024-06-15T00:00:00Z'),
                    RR: PositiveFloat.of(10.4),
                    DRR: PositiveInteger.of(162),
                    TN: 8.8,
                    HTN: Time.of('0415'),
                    TX: 15.2,
                    HTX: Time.of('1300'),
                    TM: 12.3,
                    TMNX: 12.0,
                    TNSOL: 7.8,
                    TN50: 8.4,
                    DG: PositiveInteger.of(0),
                    TAMPLI: PositiveFloat.of(6.4),
                    TNTXM: 12.0,
                    PMERM: PositiveFloat.of(1006.4),
                    PMERMIN: PositiveFloat.of(1003.4),
                    FFM: PositiveFloat.of(6.0),
                    FXI: PositiveFloat.of(15.0),
                    DXI: WindDirection.of(PositiveInteger.of(210)),
                    HXI: Time.of('1331'),
                    FXY: PositiveFloat.of(9.8),
                    DXY: WindDirection.of(PositiveInteger.of(220)),
                    HXY: Time.of('0918'),
                    FF2M: PositiveFloat.of(null),
                    FXI2: PositiveFloat.of(null),
                    DXI2: WindDirection.of(PositiveInteger.of(null)),
                    HXI2: Time.of(''),
                    FXI3S: PositiveFloat.of(13.6),
                    DXI3S: WindDirection.of(PositiveInteger.of(null)),
                    HXI3S: Time.of('1210'),
                    UN: HumiditeRelative.of(64),
                    HUN: Time.of('0913'),
                    UX: HumiditeRelative.of(99),
                    HUX: Time.of('2235'),
                    DHUMI40: PositiveInteger.of(0),
                    DHUMI80: PositiveInteger.of(1013),
                    TSVM: PositiveFloat.of(12.3),
                    DHUMEC: PositiveInteger.of(null),
                    UM: HumiditeRelative.of(87),
                    INST: PositiveInteger.of(257),
                    GLOT: PositiveInteger.of(1111),
                    DIFT: PositiveInteger.of(null),
                    DIRT: PositiveInteger.of(null),
                    SIGMA: RelativePercentage.of(27),
                    INFRART: PositiveInteger.of(null),
                    UV_INDICEX: UVIndex.of(PositiveInteger.of(null)),
                    NB300: Octa.of(PositiveInteger.of(null)),
                    BA300: PositiveInteger.of(null),
                    NEIG: false,
                    BROU: false,
                    ORAG: false,
                    GRESIL: null,
                    GRELE: null,
                    ROSEE: null,
                    VERGLAS: null,
                    SOLNEIGE: null,
                    GELEE: null,
                    FUMEE: false,
                    BRUME: false,
                    ECLAIR: null,
                    ETPMON: PositiveFloat.of(1.6),
                    ETPGRILLE: PositiveFloat.of(2.0),
                    UV: UVIndex.of(PositiveInteger.of(null)),
                    TMERMAX: null,
                    TMERMIN: null,
                    HNEIGEF: PositiveInteger.of(null),
                    NEIGETOTX: PositiveInteger.of(0),
                    NEIGETOT06: PositiveInteger.of(0),
                },
                {
                    POSTE: IdStation.of('76116001'),
                    DATE: new Date('2024-06-16T00:00:00Z'),
                    RR: PositiveFloat.of(0.0),
                    DRR: PositiveInteger.of(43),
                    TN: 11.2,
                    HTN: Time.of('0145'),
                    TX: 17.8,
                    HTX: Time.of('1739'),
                    TM: 14.4,
                    TMNX: 14.5,
                    TNSOL: 10.3,
                    TN50: 10.5,
                    DG: PositiveInteger.of(0),
                    TAMPLI: PositiveFloat.of(6.6),
                    TNTXM: 14.5,
                    PMERM: PositiveFloat.of(1006.9),
                    PMERMIN: PositiveFloat.of(1005.4),
                    FFM: PositiveFloat.of(3.4),
                    FXI: PositiveFloat.of(9.4),
                    DXI: WindDirection.of(PositiveInteger.of(220)),
                    HXI: Time.of('1238'),
                    FXY: PositiveFloat.of(6.3),
                    DXY: WindDirection.of(PositiveInteger.of(240)),
                    HXY: Time.of('1025'),
                    FF2M: PositiveFloat.of(null),
                    FXI2: PositiveFloat.of(null),
                    DXI2: WindDirection.of(PositiveInteger.of(null)),
                    HXI2: Time.of(''),
                    FXI3S: PositiveFloat.of(8.9),
                    DXI3S: WindDirection.of(PositiveInteger.of(null)),
                    HXI3S: Time.of('1238'),
                    UN: HumiditeRelative.of(65),
                    HUN: Time.of('1056'),
                    UX: HumiditeRelative.of(99),
                    HUX: Time.of('0612'),
                    DHUMI40: PositiveInteger.of(0),
                    DHUMI80: PositiveInteger.of(837),
                    TSVM: PositiveFloat.of(13.7),
                    DHUMEC: PositiveInteger.of(null),
                    UM: HumiditeRelative.of(85),
                    INST: PositiveInteger.of(141),
                    GLOT: PositiveInteger.of(1354),
                    DIFT: PositiveInteger.of(null),
                    DIRT: PositiveInteger.of(null),
                    SIGMA: RelativePercentage.of(15),
                    INFRART: PositiveInteger.of(null),
                    UV_INDICEX: UVIndex.of(PositiveInteger.of(null)),
                    NB300: Octa.of(PositiveInteger.of(null)),
                    BA300: PositiveInteger.of(null),
                    NEIG: false,
                    BROU: false,
                    ORAG: false,
                    GRESIL: null,
                    GRELE: null,
                    ROSEE: null,
                    VERGLAS: null,
                    SOLNEIGE: null,
                    GELEE: null,
                    FUMEE: false,
                    BRUME: false,
                    ECLAIR: null,
                    ETPMON: PositiveFloat.of(2.4),
                    ETPGRILLE: PositiveFloat.of(2.6),
                    UV: UVIndex.of(PositiveInteger.of(null)),
                    TMERMAX: null,
                    TMERMIN: null,
                    HNEIGEF: PositiveInteger.of(null),
                    NEIGETOTX: PositiveInteger.of(0),
                    NEIGETOT06: PositiveInteger.of(0),
                },
                {
                    POSTE: IdStation.of('76116001'),
                    DATE: new Date('2024-06-17T00:00:00Z'),
                    RR: PositiveFloat.of(2.2),
                    DRR: PositiveInteger.of(1),
                    TN: -3.3,
                    HTN: Time.of('1230'),
                    TX: -3.3,
                    HTX: Time.of('1230'),
                    TM: -3.3,
                    TMNX: -3.3,
                    TNSOL: -3.3,
                    TN50: -3.3,
                    DG: PositiveInteger.of(1),
                    TAMPLI: PositiveFloat.of(1.1),
                    TNTXM: -3.3,
                    PMERM: PositiveFloat.of(2.2),
                    PMERMIN: PositiveFloat.of(2.2),
                    FFM: PositiveFloat.of(1.1),
                    FXI: PositiveFloat.of(1.1),
                    DXI: WindDirection.of(PositiveInteger.of(360)),
                    HXI: Time.of('1230'),
                    FXY: PositiveFloat.of(1.1),
                    DXY: WindDirection.of(PositiveInteger.of(360)),
                    HXY: Time.of('1230'),
                    FF2M: PositiveFloat.of(1.1),
                    FXI2: PositiveFloat.of(1.1),
                    DXI2: WindDirection.of(PositiveInteger.of(360)),
                    HXI2: Time.of('1230'),
                    FXI3S: PositiveFloat.of(1.1),
                    DXI3S: WindDirection.of(PositiveInteger.of(360)),
                    HXI3S: Time.of('1230'),
                    UN: HumiditeRelative.of(100),
                    HUN: Time.of('1230'),
                    UX: HumiditeRelative.of(100),
                    HUX: Time.of('1230'),
                    DHUMI40: PositiveInteger.of(1),
                    DHUMI80: PositiveInteger.of(1),
                    TSVM: PositiveFloat.of(2.2),
                    DHUMEC: PositiveInteger.of(1),
                    UM: HumiditeRelative.of(100),
                    INST: PositiveInteger.of(1),
                    GLOT: PositiveInteger.of(1),
                    DIFT: PositiveInteger.of(1),
                    DIRT: PositiveInteger.of(1),
                    SIGMA: RelativePercentage.of(100),
                    INFRART: PositiveInteger.of(1),
                    UV_INDICEX: UVIndex.of(PositiveInteger.of(12)),
                    NB300: Octa.of(PositiveInteger.of(8)),
                    BA300: PositiveInteger.of(1),
                    NEIG: true,
                    BROU: true,
                    ORAG: true,
                    GRESIL: true,
                    GRELE: true,
                    ROSEE: true,
                    VERGLAS: true,
                    SOLNEIGE: true,
                    GELEE: true,
                    FUMEE: true,
                    BRUME: true,
                    ECLAIR: true,
                    ETPMON: PositiveFloat.of(2.2),
                    ETPGRILLE: PositiveFloat.of(2.2),
                    UV: UVIndex.of(PositiveInteger.of(12)),
                    TMERMAX: -3.3,
                    TMERMIN: -3.3,
                    HNEIGEF: PositiveInteger.of(1),
                    NEIGETOTX: PositiveInteger.of(1),
                    NEIGETOT06: PositiveInteger.of(1),
                },
                {
                    POSTE: IdStation.of('76116001'),
                    DATE: new Date('2024-06-18T00:00:00Z'),
                    RR: PositiveFloat.of(null),
                    DRR: PositiveInteger.of(null),
                    TN: null,
                    HTN: Time.of(''),
                    TX: null,
                    HTX: Time.of(''),
                    TM: null,
                    TMNX: null,
                    TNSOL: null,
                    TN50: null,
                    DG: PositiveInteger.of(null),
                    TAMPLI: PositiveFloat.of(null),
                    TNTXM: null,
                    PMERM: PositiveFloat.of(null),
                    PMERMIN: PositiveFloat.of(null),
                    FFM: PositiveFloat.of(null),
                    FXI: PositiveFloat.of(null),
                    DXI: WindDirection.of(PositiveInteger.of(null)),
                    HXI: Time.of(''),
                    FXY: PositiveFloat.of(null),
                    DXY: WindDirection.of(PositiveInteger.of(null)),
                    HXY: Time.of(''),
                    FF2M: PositiveFloat.of(null),
                    FXI2: PositiveFloat.of(null),
                    DXI2: WindDirection.of(PositiveInteger.of(null)),
                    HXI2: Time.of(''),
                    FXI3S: PositiveFloat.of(null),
                    DXI3S: WindDirection.of(PositiveInteger.of(null)),
                    HXI3S: Time.of(''),
                    UN: HumiditeRelative.of(null),
                    HUN: Time.of(''),
                    UX: HumiditeRelative.of(null),
                    HUX: Time.of(''),
                    DHUMI40: PositiveInteger.of(null),
                    DHUMI80: PositiveInteger.of(null),
                    TSVM: PositiveFloat.of(null),
                    DHUMEC: PositiveInteger.of(null),
                    UM: HumiditeRelative.of(null),
                    INST: PositiveInteger.of(null),
                    GLOT: PositiveInteger.of(null),
                    DIFT: PositiveInteger.of(null),
                    DIRT: PositiveInteger.of(null),
                    SIGMA: RelativePercentage.of(null),
                    INFRART: PositiveInteger.of(null),
                    UV_INDICEX: UVIndex.of(PositiveInteger.of(null)),
                    NB300: Octa.of(PositiveInteger.of(null)),
                    BA300: PositiveInteger.of(null),
                    NEIG: null,
                    BROU: null,
                    ORAG: null,
                    GRESIL: null,
                    GRELE: null,
                    ROSEE: null,
                    VERGLAS: null,
                    SOLNEIGE: null,
                    GELEE: null,
                    FUMEE: null,
                    BRUME: null,
                    ECLAIR: null,
                    ETPMON: PositiveFloat.of(null),
                    ETPGRILLE: PositiveFloat.of(null),
                    UV: UVIndex.of(PositiveInteger.of(null)),
                    TMERMAX: null,
                    TMERMIN: null,
                    HNEIGEF: PositiveInteger.of(null),
                    NEIGETOTX: PositiveInteger.of(null),
                    NEIGETOT06: PositiveInteger.of(null),
                },
            ]);
        });
    });
});