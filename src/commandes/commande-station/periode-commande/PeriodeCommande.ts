import { DateCommande } from '@/commandes/commande-station/periode-commande/DateCommande.js';
import { toSimpleISO } from '@/lib/date/toSimpleISO.js';

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

    static from(periode: { debut: Date; fin: Date }): PeriodeCommande {
        return PeriodeCommande.of({
            debut: toSimpleISO(periode.debut),
            fin: toSimpleISO(periode.fin),
        });
    }

    value(): { debut: string; fin: string } {
        return { debut: this.debut.value(), fin: this.fin.value() };
    }

    toDate(): { debut: Date; fin: Date } {
        return { debut: this.debut.toDate(), fin: this.fin.toDate() };
    }
}
