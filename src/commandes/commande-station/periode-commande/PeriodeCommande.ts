import { DateCommande } from '@/commandes/commande-station/periode-commande/DateCommande.js';

export class InvalidPeriodeCommandeError extends Error {}

/**
 * `fin` is inclusive
 */
export class PeriodeCommande {
    private readonly debut: DateCommande;
    private readonly fin: DateCommande;

    private constructor({ debut, fin }: { debut: DateCommande; fin: DateCommande }) {
        this.debut = debut;
        this.fin = fin;
    }

    static of(periode: { debut: string; fin: string }): PeriodeCommande {
        const debut = DateCommande.of(periode.debut);
        const fin = DateCommande.of(periode.fin);
        if (new Date(fin.value()).getTime() < new Date(debut.value()).getTime()) {
            throw new InvalidPeriodeCommandeError();
        }
        return new PeriodeCommande({ debut, fin });
    }

    value(): { debut: string; fin: string } {
        return { debut: this.debut.value(), fin: this.fin.value() };
    }
}
