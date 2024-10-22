export interface HoraireLineDTO {
    // Mnémotechnique,Descriptif,Type,Unité / Format
    // geo_id_insee,ID of the point as defined by the INSEE number,TEXT,ddnnnpp (dd = department number, nnn = number of the municipality (ddnnn = Insee code), pp = accuracy on site)
    geo_id_insee: string;
    // lat,latitude in degrees,REAL,deg (plane angle)
    lat: number;
    // lon,longitude in degrees,REAL,deg (plane angle)
    lon: number;
    // reference_time,date and time of the production of the data in UTC,TEXT,iso8601/utc
    reference_time: Date;
    // insert_time,date and time of data-base insertion of the data in UTC,TEXT,iso8601/utc
    insert_time: Date;
    // validity_time,date and time of validity of the data in UTC,TEXT,iso8601/utc
    validity_time: Date;
    // t,air temperature at 2 meters above the ground in Kelvin degrees,REAL,K
    t: number | null;
    // td,air temperature of dew point at 2 meters above the ground in Kelvin degrees,REAL,K
    td: number | null;
    // tx,hourly maximum of air temperature at 2 meters above the ground in Kelvin degrees,REAL,K
    tx: number | null;
    // tn,hourly minimum of air temperature at 2 meters above the ground in Kelvin degrees,REAL,K
    tn: number | null;
    // u,hourly relative humidity at 2 meters,INTEGER,percent
    u: number | null;
    // ux,hourly maximum relative humidity at 2 meters,INTEGER,percent
    ux: number | null;
    // un,hourly minimum relative humidity at 2 meters,INTEGER,percent
    un: number | null;
    // dd,mean wind direction at 10 meters above the ground in degrees,INTEGER,deg (direction)
    dd: number | null;
    // ff,mean wind speed at 10 meters above the ground in m/s,REAL,m/s
    ff: number | null;
    // dxy,hourly mean wind gust direction at 10 meters above the ground in degrees,INTEGER,deg (direction)
    dxy: number | null;
    // fxy,hourly mean wind gust speed at 10 meters above the ground over the previous 1H in m/s,REAL,m/s
    fxy: number | null;
    // dxi,hourly instant wind gust direction at 10 meters above the ground in degrees,INTEGER,deg (direction)
    dxi: number | null;
    // fxi,hourly instant wind gust speed at 10 meters above the ground over the previous 1H in m/s,REAL,m/s
    fxi: number | null;
    // rr1,all precipitation over the previous 1H in mm,REAL,mm
    rr1: number | null;
    // t_10,temperature at 10 centimeters below the ground in Kelvin degrees,REAL,K
    t_10: number | null;
    // t_20,temperature at 20 centimeters below the ground in Kelvin degrees,REAL,K
    t_20: number | null;
    // t_50,temperature at 50 centimeters below the ground in Kelvin degrees,REAL,K
    t_50: number | null;
    // t_100,temperature at 1 meter below the ground in Kelvin degrees,REAL,K
    t_100: number | null;
    // vv,horizontal visibility in meters,INTEGER,m
    vv: number | null;
    // etat_sol,ground state code,INTEGER,
    etat_sol: number | null;
    // sss,total depth of snow cover in meters,REAL,m
    sss: number | null;
    // n,total nebulosity in octas,INTEGER,percent
    n: number | null;
    // insolh,sunshine duration over the previous 1H,REAL,mn
    insolh: number | null;
    // ray_glo01,hourly global radiation in J/m2,REAL,J/m2
    ray_glo01: number | null;
    // pres,station pressure in Pa,REAL,Pa
    pres: number | null;
    // pmer,sea level pressure in Pa,REAL,Pa
    pmer: number | null;
}
