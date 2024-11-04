import { InMemoryInfrahoraireRepository } from '@/produits-obs/station/infrahoraire/db/adapters/InfrahoraireRepository.in-memory.js';
import { InfrahoraireLineDTO } from '@/produits-obs/station/infrahoraire/InfrahoraireLineDTO.js';
import { describe, expect, it } from 'vitest';

describe('InMemoryInfrahoraireRepository', () => {
    describe('upsertMany', () => {
        it('should upsert horaire data', async () => {
            const dataToInsert: InfrahoraireLineDTO[] = [
                {
                    lat: 49.3895,
                    lon: 1.178333,
                    geo_id_insee: '76116001',
                    reference_time: new Date('2024-10-16T12:12:05Z'),
                    insert_time: new Date('2024-10-16T12:09:26Z'),
                    validity_time: new Date('2024-10-16T12:06:00Z'),
                    t: 22.8,
                    td: 15.9,
                    u: 65,
                    dd: 160,
                    ff: 7.5,
                    dxi10: 160,
                    fxi10: 11.1,
                    rr_per: 0.0,
                    t_10: 13.8,
                    t_20: 13.8,
                    t_50: 13.6,
                    t_100: 14,
                    vv: 31510,
                    etat_sol: null,
                    sss: 0.0,
                    n: null,
                    insolh: 5.0,
                    ray_glo01: 166300.0,
                    pres: 985.8,
                    pmer: 1003.7,
                },
            ];
            const repository = new InMemoryInfrahoraireRepository();
            await repository.upsertMany(dataToInsert);
            await repository.upsertMany(dataToInsert);

            const insertedStations = await repository.selectAll();
            expect(insertedStations).toEqual(dataToInsert);
        });
    });
});