import { HoraireLineDTO } from '@/produits-obs/station/horaire/HoraireLineDTO.js';
import { HoraireLine } from '@/produits-obs/station/horaire/json/HoraireLine.js';

export function toDTO(line: HoraireLine): HoraireLineDTO {
    return {
        geo_id_insee: line.geo_id_insee.value(),
        lat: line.lat,
        lon: line.lon,
        reference_time: line.reference_time,
        insert_time: line.insert_time,
        validity_time: line.validity_time,
        t: line.t,
        td: line.td,
        tx: line.tx,
        tn: line.tn,
        u: line.u.value(),
        ux: line.ux.value(),
        un: line.un.value(),
        dd: line.dd.value(),
        ff: line.ff.value(),
        dxy: line.dxy.value(),
        fxy: line.fxy.value(),
        dxi: line.dxi.value(),
        fxi: line.fxi.value(),
        rr1: line.rr1.value(),
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
