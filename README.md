# DAKLE U OVOM BRANCHU CU ODRADITI MNOGE STVARI

ONO STO MOZDA NISAM REKAO JESTE DA CU OPET KORISTITI REDUCERA (ZA KEYWORD MODAL KOJI PLANIRAM DA NAPRAVIM)

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

PROBACU PRVO SA POSTOJECIM KOMPONENTMA KOJE IMAM

- `packages/gatsby-theme-raedal/src/components/{left,right}-arrow.tsx`

***

NISU ODGOVARALE, JER SU VEC PREVISE STILIZOVANE, ZATO CU NAPRAVITI NOVE

MORAM SE OPREDELITI U BUDUCNOSTI DA RADIM BOLJI SCALING MOJE APLIKACIJE, ODNONO DA BOLJE REUSE-UJEM STVARI NEGO STO TO SADA RADIM

***

MOZDA JE CAK BOLJE DA DEFINISEM BUTTONS ZA OVU POTREBU (DA BUTTONS BI IZGLEDALI LEPSE NA MOBILE UREDJAJU)

ILI CAK DA KORISTIM ICON FONT ZA HEADER

***

UGLAVNOM NOVE KOMPONENTE SU

- `packages/gatsby-theme-raedal/src/components/left-h-arrow.tsx`

- `packages/gatsby-theme-raedal/src/components/right-h-arrow.tsx`

***

STRELICE CE BITI NESTO VECE U HEADERU NEGO ACROSS REST OF THE PAGE, A PRIMETIO SAM DA EMOJI STRELICE NISU ISTE VELICINE, ZATO SAM ODLUCIO DA KORISTIM ICONS

## MISLIM DA CU KORISTITI OCTICONS ZA REACTS POSTO IMAJU DOBRU OSOBINU, DA NECE DOZVOLITI DA MI BUNDLE BUDE BLOATED SAM OZBOG DVE IKONE 

<https://primer.style/octicons/packages/react>

NA LINKU IMAM KAKO SE ONE USTVARI KORISTE U REACTU

SAMO DA NAPOMENEM DA CU IH INSTALIRATI OVAKO

- `yarn workspace gatsby-theme-raedal add @primer/octicons-react`

U SUSTINI KORISTI KOMPONENTU `Octicon` (DEFAULT IMPORT)

I KORISTI SE FUNKCIJA `getIconByName` KAO NAMED IMPORT

# :three: ZELIM DA SAKRIJEM KEYWORDS I TABLE OF HEADERS ZA MOBILNE URDJAJE

DAKLE ONI SE VISE NECE PRIKAZIVATI ZA SIRINE EKRANA ISPOD `918px`

**UMESTO TOGA DEFINISEM DA OVI ELEMENTI BUDU DEO TOOLTIP-OVA, KOJI CE SE KORISTITI KADA SE PRITISNE NA APROPRIATE ICONS U HEADER-U**

# :four: PLANIRAM SADA STA SVE TREBAM IMATI U HEADER-U

- STRELICE IMAM

- TREBAJU MI SOCIJALNE IKONE (OCTICONS MOGU KORISTITI ZA GITHUB, A ZA TWITTER I INSTAGRAM MORAM PRONACI DOBRE IKONE) (**USTVARI ME NE TREBAJU JER SAM REKAO DA CU USTVARI ISPOD SVAKOG POST-A STAVITI TRI IKONICE (TWITTER, INSTAGRAM I GITHUB)**)

- TREBA MI PLACEHOLDER ZA ALGOLI-U SEARCH

***

- TRI TACKE ZA OTVARANJE KEYWORDS MODAL-A (ZA OVO CU KREIRATI ODVOJENU KOMPONENTU) (I TU CU USTVARI DEFINISATI MODAL) (UZ ANIMACIJU, KOJA BI BILA APPROPRIATE) (RAZMATRAM DA ZA OVO KORISTIM CONTEXT, JER MOGAO BI DA SE U ODNOSU NA SHOWING MODALA, CEO APP FADE-UJE OUT, ODNONO SAMO BIH PROMENIO OPACITY)

**`DAKLE, PROSIRUJEM OPET BLOG POST CONTEXT STATE, ALI U OVOM SLUCAJU CU KORISTITI REDUCERA I DISPATCH`**

PRVO CU SE, UPRAVO TIME POZABAVITI (**IDEM DA KREIRAM NOVI ACTION I HANDLE-UJEM GA U REDUCER-U**) (*NOVI ACTION NEKA SE ZOVE **`KEYWORD_MODAL_TOGGLE`***)

**NAKON TOGA CU DA KREIRAM SAMU MODAL KOMPONENTU, KOJA MOZE BITI NESTED BILO GDE U MOM APP-U, BITNO JE SAMO DA JE UNDER MY BLOG POST STATE PROVIDER** (MOGU JE NESMETANO DEVELOP-OVATI KAO STATICKI ELEMENT KOJI CE PREKRIVATI CEO EKRAN)

***

STO SE TICE TABLE OF HEADERS

*TABLE OF HEADERS MI NEKEKO IZGLEDA KAO VISAK*

# :five: ODLUCIO SAM DA DEFINISEM, TRI PROZIRNE IKONICE U DESNOM DONJEM COSKU, KOJE BI ISTO NESTJALE ZA SLUCAJ KADA SE SCROLL-UJE DOWN

- JEDNA BI BILA DA SE SCROLL-UJE TO THE TOP

- OSTALE DVE BI BILE IKONICE ZA LISTANJE HEADER-A (GDE BIH OPET KORISTIO TARGET) (ZATO MISLIM DA MI JE I OVDE NEOPHODNA POTPUNO NOVA KOMPONENTA) (**RAZMISLJAM DA TO BUDE SLIDING MENU, KOJI CE STALNO BITI TU**)

**`PRITISKOMN A TO DUGME POJAVILE BI SE POMENUTE STRELICE`**

# :four: ISTO TAKO 'Fira Code' FONT SE NE UCITAVA NA MOZILI, ALI PRIMETIO SAM DA JE TO SLUCAJ SA MNOGIM FONTOVIMA

ZATO CU SE U SLEDECIM BRANCH-EVIMA POZABAVITI I DEFINISANJEM BACKUP FONT-A ZA FIREFOX


# :five: DOBIO SAM IDEJU DA ON HOVER. PREKO STRELICA PRIKAZUJEM TOOLTIP, KOJU CE USTVARI RECI O KOJEM JE TUTORIJALU REC

ODNOSNO DA PRIKAZE SAMO NASLOV

STO ZA MOBILNE UREDJAJE I NEMA NEKI EFEKAT
