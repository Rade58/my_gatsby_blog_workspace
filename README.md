# DAKLE U OVOM BRANCHU CU ODRADITI MNOGE STVARI

***

***

digresija: **`useLayoutEffect`** FAJL: (`packages/gatsby-theme-raedal/src/components/pig.tsx`)

`IMAO SAM PROBLEM, SA POMENUTIM HOOK-OM`

ONO STO SAM U TOM HOOK-U RADIO JESTE CITANJE

- `document.body.scrollHeight`

- `window.innerHeight`

ALI TO SAM RADIO U, POMNUTOM HOOK-U

PROMENA STATE-A NIJE BILA OK, I NE ZNAM ZASTO, ALI OCIGLEDNO U *useLayoutEffect* SE BAS VREDNOSTI DOM-A, I NE OCITAVAJU KAKO TREBA (**`MORACU DA NAUCIM, OVAJ HOOK BOLJE I KADA DA GA KORISTIM`**)

`RESIO SAM OVO TAKO STO SAM KORISTIO` **`useEffect`**

OVO SAM OSTAVIO KAO NAPOMENU, JER U BUDUCNOSTI UVEK TREBAM DA KORISTIM `useEffect`, I TO TREBA DA MI BUDE PRVI IZBOR

***

***

# :one: MISLIM DA CU DA DEFINISEM POTPUNO NEPRIKAZIVANJE STRELICA NA MOBILE EKRANU

NEKA STRELICE NA MOBILNOM UREDJAJU BUDU DEO HEADERA, KOJEG CU U NOVOM BRANCH-U VRATITI SAMO ZA MOBILNE UREDJAJE

ON CE BITI MINIMALISTIC

PRIKAZIVACE SE SAMO ON PULL UP

IMACE U COSKOVIMA RIGHT, ODNOSNO LEFT ARROW

`U NJEMU CE KASNIJE BITI DODAT ALGOLIA SEARCH NARAVNO` (KADA GA INTRODUCE-UJEM ZA MOJ PROJEKAT)

***

EVO KAKO SAM USTVARI RESIO SAKRIVANJE HEADER

`packages/gatsby-theme-raedal/src/components/header.tsx`

```css
/* kada scroll-ujem down element treba da se digne above */
&.pull-up {
  top: -56px;
}
/* u suprotnom se spusta (ODNOSNO VRACA U POCETNI POLOZAJ) */
&.pull-down {
  top: 0;
}

/* !== === !== === A OVO JE ONO STA SAM DODAO === !== === !== */

/* SAMO MENJAM VEREDNOSTI ZA KLASE AKO JE REC O MANJEM EKRANU */

@media screen and (min-width: 918px) {
  &.pull-down {
    top: -56px;
  }
  &.pull-up {
    top: -56px;
  }
}
```

**JA USTVARI NISAM SAKRIO HEADER (NISAM KORISTIO `dispaly` PROPERTI NIGDE)**

**VEC SAM NAPRAVIO MEDIA QUERY-JE, KOJIMA SAM MODIFIKOVAO PULL UP I PULL DOWN KLASE, DA USTVARI OBE PULL-UJU UP HEADER**

***

A STO SE TICE PIG ANIMATION-A

MISLIM DA JE PIG ANIMATION TOO MUCH ZA MOBILE DEVICE

***

ZATO PIG ANIMATION NECE BITI DISPLAYED ZA SIRINE IKRANA MANJE OD `918px` (NECE BITI PRIKAZANA NI TRAKA PO KOJOJ SE SVINJA KRECE)

***

TAKODJE SAM HANDLE-OVAO DA SE RESIZER ELEMENT, KOJI JE DEO SCROLL INDICATOR KOMPONENTE, UVEK PRIKAZUJE

STO SAM URADIO NA SLICAN NACIN KAO GORE

# :two: ZELIM DA U HEADER-U, PRIKAZEM STRELICE ZA NEXT, ODNONO PREVIOUS BLOG POST

NE MOGU DA SE ODLUCIM, DA LI DA REUSE-UJEM, KOMPONENTE, KOJE VEC IMAM ILI DA KREIRAM NOVE

# :three: ISTO TAKO 'Fira Code' FONT SE NE UCITAVA NA MOZILI, ALI PRIMETIO SAM DA JE TO SLUCAJ SA MNOGIM FONTOVIMA

ZATO CU SE U SLEDECIM BRANCH-EVIMA POZABAVITI I DEFINISANJEM BACKUP FONT-A ZA FIREFOX

