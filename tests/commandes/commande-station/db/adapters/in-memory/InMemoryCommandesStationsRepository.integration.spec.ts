import { CommandeStation } from '@/commandes/commande-station/CommandeStation.js';
import { InMemoryCommandesStationsRepository } from '@/commandes/commande-station/db/adapters/in-memory/InMemoryCommandesStationsRepository.js';
import { describe, expect, it } from 'vitest';

describe('InMemoryCommandesStationsRepository', () => {
    it('should insert informations stations', async () => {
        const commandeStation: CommandeStation = CommandeStation.of({
            id: '779663620169',
            dateDebPeriode: new Date('2024-06-15T12:00:00Z'),
            dateFinPeriode: new Date('2024-06-15T13:00:00Z'),
            idStation: '76116001',
            status: 'pending',
        });
        const repository = InMemoryCommandesStationsRepository.of([]);
        await repository.insert(commandeStation);
        const insertedInformationsStations = await repository.selectAll();
        expect(insertedInformationsStations).toEqual([commandeStation]);
    });
});
