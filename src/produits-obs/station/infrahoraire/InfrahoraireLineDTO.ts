export interface InfrahoraireLineDTO {
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
    // NOT IN THE DOCUMENTATION !!!!!!!!!
    td: number | null;
    // u,hourly relative humidity at 2 meters,INTEGER,percent
    u: number | null;
    // dd,mean wind direction at 10 meters above the ground in degrees,INTEGER,deg (direction)
    dd: number | null;
    // ff,mean wind speed at 10 meters above the ground in m/s,REAL,m/s
    ff: number | null;
    // dxi10,10 minutes mean wind gust direction at 10 meters above the ground in degrees,INTEGER,deg (direction)
    dxi10: number | null;
    // fxi10,10 minutes mean wind gust speed at 10 meters above the ground in m/s,REAL,m/s
    fxi10: number | null;
    // rr_per,all precipitation over the previous 6 minutes in mm,REAL,mm
    rr_per: number | null;
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
    // ray_glo01,global radiation over the previous 6 minutes in J/m2,REAL,J/m2
    ray_glo01: number | null;
    // pres,station pressure in Pa,REAL,Pa
    pres: number | null;
    // pmer,sea level pressure in Pa,REAL,Pa
    pmer: number | null;
}
