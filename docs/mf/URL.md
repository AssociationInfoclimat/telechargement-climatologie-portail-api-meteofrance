# URL

Prenons l'exemple des données quotidiennes avec XX comme numéro de département:

- QUOT_departement_XX_periode_1852-1949_autres-parametres
- QUOT_departement_XX_periode_1950-2022_autres-parametres
- QUOT_departement_XX_periode_2023-2024_autres-parametres

Pour l'année 2025, les 2 dernières lignes évolueront vers

- QUOT_departement_XX_periode_1950-2023_autres-parametres
- QUOT_departement_XX_periode_2024-2025_autres-parametres

## Template

    https://object.files.data.gouv.fr/meteofrance/data/synchro_ftp/BASE/{FREQ_1}/{FREQ_2}_{DD}_{A-PRE}-{A_DEBUT}-{A_FIN}_{PARAM}.csv.gz

- FREQ_1 / FREQ_2: MIN/MN, HOR/H, QUOT/Q, MENS/MENSQ, DECAD/DECADQ, DECADAGRO/DECADAGRO
- DD: 01, 02, 03, ...
- A_PRE - A_DEBUT - A_FIN:
  - MIN : 2000-2009, 2010-2019, previous-2020-{Y-2}, latest-{Y-1}-{Y}
  - HOR : 1770-1779, 1780-1789, ..., previous-2020-{Y-2}, latest-{Y-1}-{Y}
  - Autres : ????-1949, previous-1950-{Y-2}, latest-{Y-1}-{Y}
- PARAM: QUOT ONLY !: RR-T-Vent, autres-parametres

## Liste

    https://www.data.gouv.fr/api/2/datasets/{DATASET_ID}/resources/?page=1&page_size=999999

- MIN/MN : `6569ad61106d1679c93cdf77`
- HOR/H : `6569b4473bedf2e7abad3b72`
- QUOT/Q : `6569b51ae64326786e4e8e1a`
- MENS/MENSQ : `6569b3d7d193b4daf2b43edc`
- DECAD/DECADQ : `6569b4a48a4161faec6b2779`
- DECADAGRO/DECADAGRO : `6569af36ba0c3d2f9d4bf98c`
