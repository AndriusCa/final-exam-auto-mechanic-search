Projektas su React.js, Express.js ir MySQL
Šis projektas naudoja React.js priekiniam puslapiui, Express.js serveryje ir MySQL duomenų bazei.

Prisijungimas admin:
 el.pastas: andrius@andrius.lt 
 slaptazodis: andrius@andrius.lt

Prisijungimas user:
 el.pastas: jonas@jonas.lt
 slaptazodis: jonas@jonas.lt


Pradžia
Sekite šiais žingsniais norint paleisti šį projektą savo kompiuteryje:

Reikiamų programų diegimas

Jei dar neturite Node.js įdiegtą, pirmiausia įdiekite jį nuo Node.js oficialios svetainės.
Įdiekite MySQL iš čia.
Klonavimas

Klonuokite šią saugyklą į savo kompiuterį:

bash
Copy code
git clone [URL_SAUGYKLAI]
Priekinio puslapio priklausomybių diegimas

Pereikite į kliento direktoriją ir įdiekite priklausomybes:

bash
Copy code
cd klientas
npm install
Serverio priklausomybių diegimas

Pereikite į serverio direktoriją ir įdiekite priklausomybes:

bash
Copy code
cd serveris
npm install
Duomenų bazės konfigūracija

Sukurkite duomenų bazę MySQL serveryje.
Konfigūruokite serveris/config/db.js su jūsų duomenų bazės prisijungimo informacija.
Paleiskite serverį

Serverio direktorijoje:

sql
Copy code
npm start
Serveris pagal nutylėjimą turėtų paleistis adresu http://localhost:5000.

Paleiskite klientą

Kliento direktorijoje:

sql
Copy code
npm start
Klientas pagal nutylėjimą turėtų paleistis adresu http://localhost:3000.

Naudojimosi instrukcijos
Atidarykite naršyklėje http://localhost:3000, kad pamatytumėte React.js priekinį puslapį.
Naršyklės konsolėje galite matyti, kaip priekinis puslapis bendrauja su Express.js serveriu ir MySQL duomenų baze.