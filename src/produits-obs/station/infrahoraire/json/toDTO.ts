import { InfrahoraireLineDTO } from '@/produits-obs/station/infrahoraire/InfrahoraireLineDTO.js';
import { InfrahoraireLine } from '@/produits-obs/station/infrahoraire/json/InfrahoraireLine.js';

export function toDTO(line: InfrahoraireLine): InfrahoraireLineDTO {
    return {
        geo_id_insee: line.geo_id_insee.value(),
        lat: line.lat,
        lon: line.lon,
        reference_time: line.reference_time,
        insert_time: line.insert_time,
        validity_time: line.validity_time,
        t: line.t,
        td: line.td,
        u: line.u.value(),
        dd: line.dd.value(),
        ff: line.ff.value(),
        dxi10: line.dxi10.value(),
        fxi10: line.fxi10.value(),
        rr_per: line.rr_per.value(),
        t_10: line.t_10,
        t_20: line.t_20,
        t_50: line.t_50,
        t_100: line.t_100,
        vv: line.vv.value(),
        etat_sol: line.etat_sol.value(),
        sss: line.sss.value(),
        n: line.n.value(),
        insolh: line.insolh.value(),
        ray_glo01: line.ray_glo01.value(),
        pres: line.pres.value(),
        pmer: line.pmer.value(),
    };
}
