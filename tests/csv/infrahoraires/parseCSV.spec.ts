import { InfrahoraireLine, parseCSV } from '@/csv/infrahoraires/parseCSV.js';
import { PositiveFloat } from '@/data/value-objects/PositiveFloat.js';
import { IdStation } from '@/id-station/IdStation.js';
import { describe, expect, it } from 'vitest';

describe('parseCSV', () => {
    describe('parseCSV', () => {
        it('should parse the CSV', async () => {
            const csvLines = `POSTE;DATE;RR6
76116001;202406151200;0,0
76116001;202406151206;1,1
76116001;202406151212;
`;
            const infrahoraireLines = parseCSV(csvLines);
            expect(infrahoraireLines.ok).toEqual<InfrahoraireLine[]>([
                {
                    POSTE: IdStation.of('76116001'),
                    DATE: new Date('2024-06-15T12:00:00Z'),
                    RR6: PositiveFloat.of(0.0),
                },
                {
                    POSTE: IdStation.of('76116001'),
                    DATE: new Date('2024-06-15T12:06:00Z'),
                    RR6: PositiveFloat.of(1.1),
                },
                {
                    POSTE: IdStation.of('76116001'),
                    DATE: new Date('2024-06-15T12:12:00Z'),
                    RR6: PositiveFloat.of(null),
                },
            ]);
        });
    });
});
