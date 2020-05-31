# ODLUCIO SAM DA DEFINISEM, U DESNOM DONJEM COSKU, DVE IKONICE, KOJE BI ISTO NESTJALE ZA SLUCAJ KADA SE SCROLL-UJE DOWN 
 
ILI SE JOS RAZMISLAM DA LI DA IMAM STRELICU ZA UVLACENJE I IZVLACENJE TABLE-A OF HEADERS SA DESNE STRANE

IMACU DVE STRELICE

- DAKLE JEDNA STRELICA SA IZVLACENJE TABLE-A OF HEADERS I ZA UVLACENJE (TOGGLE-OVANJE) 

- DRUGA ZA SCROLLING TO TOP

*KORISTICU OPET OCTICONS NARAVNO*

JEDINO IMAM PROBLEM KAKO DA NAZOVEM OVU KOMPONENTU

DAO SAM JOJ OVAKVO IME

`packages/gatsby-theme-raedal/src/components/jumper-h.tsx`

NECU PRETERANO KOMENTARISTI VEC CU SE BACITI NA DEVELOPING, TE KOMPONENTE

##  MEDJUTIM UVIDEO SAM DA BI JUMPING FROM HEADER TO HEADER PRITISKOM NA DVA DUGMETA BILO NEINTUITIVNO; I ZATO CU KORISTITI INTERSECTION OBSERVER-A

OVO KAZEM JER MOZDA BI KORISNIK SCROLL-OVAO DOWN SWIPING-OM EKRANA I POMISLIO BI DA CE MU PRITISAK GORNJEG ARROW-A BITI NESTO STO CE GA VRATITI UP, ALI TO NECE BITI TAKO

ALI IMAM IDEJU U KOJOJ BI UCESTVOVALA UPOTREBA INTERSECTION OBSERVER-A

***

MORAM DA PREGLEDAM STA CU TO INTERSECT-OVATI

- IMAM **article** (KOJI IMA ID **`#my-article`** )

- U ARTICLI SU NESTED **div**-S, *KOJI IMAJU KLASU*

U POMENUTIM DIV-OVIMA IMAM `h2` ELEMENTE (TO SU NAIME ONI MOJI h2 NASLOVI)

DIV-OVI KOJE SAM POMENUO IAMJU KLASU

**`.heading-above`**

***

DOBRO, SADA KADA IMAM INFORMACIJE, KOJE SAM POMENUO IZNAD, MOGU DA SE POZABAVIM INTERSECTION OBSERVEROM

STVAR KOJA MI JE DOSTUPNA U KOMPONENTI `packages/gatsby-theme-raedal/src/components/jumper-h.tsx`

- headings NIZ (I U NJEMU SU TI HEADINGSI, PO REDOSLEDU U KOJEM SU LAYED OUT NA PAGE-U, DAKLE DOSTUPAN TI JE ODGOVARAJUCI REDOSLED)

## STA BIH MOGAO URADITI SA SVIM TIM STVARIMA KOJE ZANAM, KAKO BI NAPRAVIO DA SE KLIKOM NA GORNJI ARROW PREDJE NA HEADER ABOVE, ILI NA DONJI ARROW PREDJE NA HEADER BELLOW

PRVO DA VIDIM STA DA RADIM U REACT-U SA REF-OVIMA, JER JASNO JE DA CE MI TREBATI UPRAVO REF ARTICLE ELEMENTA

DILEMA JE DA LI DA KORISTIM querySelector, ILI DA UPOTREBIM REF

**RANIJE U JEDNOM PRIMERU SI SMEO DA KORISTIS getElementByTagName ZA NESTO JER JE TO NESTO BILO MOUNTED IZVAN TVOGG APP-A (ZABORAVIO SAM STA JE TO BILO)**

***

TREBA DA SE PODSETIS REF FORWARDING-A, JER SAM UVIDEO DA SAM TO TOTALNO POGRESNO SHVATIO

**REF FORWARDING JE NACIN DA PARENT KOMPONENTA DOBIJE REFERENCU, NEKOG SVOG CHILD-A, ODNONO NEKOG SVOG DOM ELEMENTA, SVOJE CHILD KOMPONENTE** (MISLIM DA OVO NE MORA DA ZNACI DA SE MORAJU KORISTITI SAMO ELEMENTI, ALI MISLIM DA SHVATAS POENTU)

STO SE TIC PARENT REF-OVA **`PA NJIH MOZES NESMETANO DA PROSLEDJUJES DECI, KAO PROPSE`**

***

- article JE NESTED U MAIN-U (KASNIJE SAM SAZNAO DA IMAM DODATNI PROBLEM JER SU NEKI ELEMENTI NESTED U MAIN KAO CHILDREN, UKLJUCUJUCI Article KOMPONENTU)

- A TAKODJE JUMPER KOMPONENTU ZELIM DA NEST-UJEM U MAIN

**A JA ZELIM DA IMAM REFERENCU article-A U main ELEMENTU, STO CU POSTICI REF FORWARDING-OM**

**A NA KRAJU ZELI MDA IMAM REFERENCU article-A U JUMPER KOMPONENTI. STO CU POSTICI OBICNIM PROSLEDJIVANJEM REFERENCE, KAO PROP-A**

**`NISAM UVIDEO DA JE USTVARI ARTICLE NESTED U MAIN, KAO CHILDREN A STIM NE MOGU MNOGO DA URADIM`**

MORACU DA IMA MDVOSTRUKI FORWARDING REF-OVAO, OVAKO

Layout <== Main <== Article <-- article REFERENCA

PA ONDA KROZ PROPSE PROSLEDJUJEM OVAKO

article REFERENCA --> Main --> JUMPER KOMPONENTA

**OVO ZNACI DA CU Article KOMPONENTU MORATI WRAPPOVATI U React.forwardRef**

VIDI KAKO SAM TO URADIO

OSTALO JE DAKLE DA SE U LAYOUTU UZME TAJ REF I PROSLEDI DOWN

STO ZNACI DA CES MORATI REDEFINISATI PROPS TYPE-OVE ZA Main PA ONDA I ZA JUMPER KOMPONENTU

TYPE-OVACES PROP KROZ KOJI PROSLEDJUJES RED SA OVIM

```typescript
React.RefObject<HTMLElement>
```

**U SUSTINI SVE SAM USPESNO URADIO**

# :one: IMAM REFERENCU ARTICLE-A U KOMPONENTI `packages/gatsby-theme-raedal/src/components/jumper-h.tsx` I SADA MOGU DA PROBAM DA DEFINISEM POMENUTE DUGMICE; ALI ZASTO JA NE BI TU MOGUCNOST JUMPINGA IMAO I U TABLEU OF HEADERS, JER AKO BOLJE RAZMISLIS, ZARO NE BIH DEFINISAO DA SE HEADER HIGHLIGHT-UJE U ODNOSU NA TRENUTNI SCROLL, A ISTO TAK ODA SE HEADER HIGHLIGHT-UJE, PRITISKOM NA TAJ JUMPER ARROW, STO CE NARAVNO TRIGGEROVATI DA SE HEADER SCROLL-UJE INTO VIEW, I TO SADA CE SE DOGODITI SMOOTHLY, JER SAM, JOS U PROSLOM BRANCH-U USPEO DA DEBUGG-UJEM ONAJ SMOOTH SCROLLING

ALI HAJDE PRVO DA DEFINISEM TAJ JUMPING FROM HEADER TO HEADER INSIDE `packages/gatsby-theme-raedal/src/components/jumper-h.tsx`, PA CU ONDA VIDETI KAKO DA REUSE-UJEM LOGIKU, KAKO ZNAM

# :two: USPESNO SAM DEFINISAO `INTERSECTION OBSERVER-A`, ALI TREBA NOTE-OVATI, NEKOLIKO VAZNIH STVARI, KOJE SE TICU ROOT ELEMENTA, ALI, MALO TREBAM DA SE PODSETIM INTERSECRION OBSERVER API-A

DA TI KAZEM DA ZADAVANJE *`document.documentElement`*-A, *KAO ROOT-A **NECE FUNKCIONISATI***, VEC 

**`MORAM DA ZADAM DA VIEWPORT BUDE ROOT`**, A TAKAV JE API DA TO POSTIZEM PROSLEDJUJUCI `null` KAO ROOT ELEMENT

```ts
// JA CU IMATI VISE OBSERVER-A
  // A ZASTO IH OVDE DEFINISEM ?
  // DA BIH MOUGAO DA OBAVIM      UNOBSERVING
  // ODNONO SKIDANJE OBSERVERA
  // STO CU DEFINISATI KADA SE DOGODI UNMOUNTING KOMPONENTE
  const interObservers = useRef<IntersectionObserver[]>([]); // ZA POCETAK JE OVO PRAZAN NIZ
  //                                                              NE MORAM OVO DA STAVLJAM KAO
  //                                                              DEPAENDANCY ZA useEffect

  useEffect(() => {
    // AKO NEMA NIJEDNOG HEDING DIV-A NE TREBAM NISTA I DA DEFINISEM
    if (articleReference.current && headings.length) {
      // UZEO SAM SVE    ELEMENTE KOJI IMAJU NESTED     h2    (U body-JU)
      // MISLIM NA BODY PARSED BY     MDXRenderer
      const headingDivs = articleReference.current.querySelectorAll(
        "div.heading-above"
      );

      /*
      console.log(headings);      // HEADINGS SU SVI DIV-OVI KOJI SU MI DOSTUPNI
                                  //   IZ CONTEXT-OVOG STATE-A
      console.log(relativeLink);  // TAKODJE I OVO SAM RANIJE PROSLEDIO KROZ CONTEXT    
      */
      //     MADA JA SAM SADA USTVARI GORE SA QUERY SELECTOROM, PRONASAO SVE
      // div -OVE U KOJIMA SU  h2 ELEMENTI


      // OPTIONS CE BITI ISTE ZA SVAKOG OD OBSERVER-A

      const options = {
        root: null, //        document.documentElement   SAM PRVOG STAVIO OVDE ALI TO
        //                                                NIJE FUNKCIONISALU
        //                    U SUSTINI     null      SE ODNOSI NA   VIEWPORT
        rootMargin: "0px",
        threshold: 1.0,
      };

      // IMACU VISE OBSERVER-A
      // CILJ JE SVAKOM DA OBSERV-UJU                 INTERSECTION
      //                                                   ROOT-A (VIEWPORT-A)
      //                                                      I    JEDNOG h2 HEADING DIV-A

      // ESLINT MI SAVETUJE DA UMESTO     for of   PETLJE KORISTIM
      //  forEach

      headings.forEach((headingDiv) => {
        interObservers.current.push(
          new IntersectionObserver((entries, observer) => {
            console.log({ entries, observer });
          }, options)
        );
      });

      // OVDE KACIM OBSERVER-A
      for (let i = 0; i < headings.length; i += 1) {
        interObservers.current[i].observe(headingDivs[i]);
      }
    }
  }, [articleReference]);
```

## STA CES PRIMETITI U VEZI CALLBACK-OVA, KOJI SE IZVRSAVAJU ZA SVAKI OD ELEMENATA KOJI SU OBSERVED U ODNSU NA POMENUTI VIEWPORT ROOT ?






******************************************
******************************************

# :seven: ISTO TAKO 'Fira Code' FONT SE NE UCITAVA NA MOZILI, ALI PRIMETIO SAM DA JE TO SLUCAJ SA MNOGIM FONTOVIMA

ZATO CU SE U SLEDECIM BRANCH-EVIMA POZABAVITI I DEFINISANJEM BACKUP FONT-A ZA FIREFOX

# :eight: DOBIO SAM IDEJU DA ON HOVER. PREKO STRELICA PRIKAZUJEM TOOLTIP, KOJU CE USTVARI RECI O KOJEM JE TUTORIJALU REC

ODNOSNO DA PRIKAZE SAMO NASLOV

STO ZA MOBILNE UREDJAJE I NEMA NEKI EFEKAT

# `KORISTI DUGMAD ZA SHARING NA SOCIJALNIM MREZAMA` (MISLIM DA TO MOZE KORISTTI)

POGLEDAJ OVU STRANICU, JER SU NA NJOJ PREDSTAVLJENI BAS TA DUGMAD ZA SHARING SVACEGA

<https://alligator.io/typescript/>