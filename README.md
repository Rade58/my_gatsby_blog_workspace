# ZELIM DA PODESIM I KEYWORDS ZA GROUP PAGE, ZA SLUCAJ MOBILE EKRANA, I MISLIM DA CU OPET KORISTITI KEBAB U HEADER-U

TAJ KEBAB CE, U HEADER-U JEDINO BITI PRIKAZAN ZA SMALL SCREENS

MOZDA MOZES REUSE-OVATI KEBAB SA KOJI SI KORISTIO U BLOG POST LAYOUT-U

NE MOGI GA REUSE-OVATI JER SAM TAMO DISPATCH-OVAO ZA TAMOSNJEG REDUCER-A

ALI MOGU NAPRAVITI SVE ISTO I DODATI TO U GROUP PAGE, JER I U GROUP PAGE-U JA KORISTIM I CONTEXT I REDUCER-A

## ALI MISLIM DA CU OPET MORATI PISATI RESOLVERE I PROSITIVATI TYPE-OVE, JER NISAM DEFINISAO DA SE ICONS DISPLAY-UJU ZA GROUP PAGE (**MOGU NAPRAVITI, ISTI STATIC QUERY, KOJEG SAM KORISTIO ZA BLOG POST PAGE**)

`packages/gatsby-theme-raedal/src/static_query_components/gr-table-of-keywords.tsx`

DAKLE KOSRISTIO SAM STATIC QUERY (NE ZABORAVI DA KAD PISES QUERY DA ON MORA IMATI RAZLICITO IME OD NEKOG POSTOJECEG STATIC QUERY-JA) (NAPRAVI OSAM TU GRESKU ALI JE DOBRO DA ME JE GATSBY OBAVESTIO DA SAM TO URADIO)

KOMPONENTE KOJE SAM JOS NAPRAVIO I UPOTREBIO JESU

`packages/gatsby-theme-raedal/src/components/group-page-components/keyword-modal-gr.tsx`

`packages/gatsby-theme-raedal/src/components/group-page-components/kebab-gr.tsx`

## NAPISACU MEDIA QUERY DA SE KEBAB NE PRIKAZUJE ZA SIRINE VECE OD `918px`

TO NARANO MOGU DEFINISATI ILI U HEADER-U ILI U SAMOJ KEBAB KOMPONENTI

MISLIM DA JE BOLJE DA TO URADIM U KEBAB KOMPONENTI

## TREBAM NAPISATI I MEDIA QUERY KOJI CE DEFINISATI DA SE KEYWORDSI NE PRIKAZUJU NA SIRINAMA MANJIM OD `918px`

URADIO SAM I TO

## TREBAO BI DA POZICIONIRAM NEKEKO I COMERCIALS KOMPONENTU

GDE BI BILO DOBRO DA SE POKAZUJE REKLAMAON SMALLER SCREEN