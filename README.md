# DAKLE `MDXRenderer`, KADA SE DOGODI RERENDER KOMPONENTE USTVARI PRAVI NOVE ELEMENTE

***

A POSTO SAM PROKLJUVIO KASNIJE I POCEO DA KORISTIM `IntersectionObserver` U `packages/gatsby-theme-raedal/src/components/mdx-theme-ui-overrides/heading.tsx` KOMPONENTI, MOZDA SAM MOGAO OVAJ BRANCH DA NAZOVEM DRUGACIJE, ALI NEMA VEZE SVE JE U REDU

***

OVO JE PROBLEM JER `VISE NE POSTOJE ELEMENTI KOJE OBSERVE-UJEM SA INTERSECTION OBSERVER-OM`

**NAIME PRAVE SE NOVI ELEMENTI I INTERSECTION OBSERVER JE USELES, JER ONI HEDING DIV-OVI KOJE OBSERVE-UJEM NISU VISE MOUNTED**

IMAM PAR IDEJA KAKO OVO DA OVERCOME-UJEM

- MOGU DA IPAK KORISTIM DISPATCHING, ALI FROM ARTICLE COMPONENT

NE BIH VISE FORWARD-OVAO REFERENCU ARTICLE-A, ALI BIH ID-JEVE SVIH HEADER-A POSLAO U REDUCER STATE

STO SE TICE RERENDERINGA MDXRenderer-A O TOME BIH VODIO RACUNA STO BIH UVEK ON MOUNTING OPET ACCESS-OVAO NOVIM HEADING DIV-OVIMA, I ONDA OPET USPOSTAVLJAO OBSERVER-A U `useEffect` HOOK-U

# :one: ZA POCETAK UKLANJAM REF FORWARDING IZ ARTICLE-A

I UKLANJAM SVA MESTA GDE SAM KORISTIO TAJ REF, IMA IH NEKOLIKO, A TAKODJE I MORAM DA REDEFINISEM TZPESCRIPT INTERFACE-OVE PROPS, N NEKIM KOMPONENTAMA

# :two: UKLONIO SAM SVU LOGIKU INTERSECTION OBSERVER-A IZ JUMPER KOMPONENTE

CISTO TI SAMO NAPOMINJEM DA JAUMPER KOMPONENTA JESTE I DALJE KOMPONENTA, KOJA IMA TABLE OF HEADINGS

# :three: I PALO MI JE NA PAMET DA JA USTVARI IMAM `packages/gatsby-theme-raedal/src/components/mdx-theme-ui-overrides/heading.tsx`; I MOZDA MOGU ODANDE DA UZMEM NEKU LOGIKU

PA JA MOGU DA UPOTREBIM TAMO INTERSECTION OBSERVER

`JA UPRAVO ODANDE MOGU DISPATCH-OVATI DA LI JE CURRENT HEADING INTERSECTED SA VIEWPORTOM`

# :four: IGRACU SE MALO SA INTERSECTION OBSERVEROM, KOJEG CU DEFINISATI ZA HEADING, PA CU ONDA VIDETI STA BI TREBAL ODA DISPATCH-UJEM

USPESN OSAM GA USPOSTAVIO ON MOUNTING, U POMENUTOJ KOMPONENTI, SADA SAMO DA GA MALO ISPROBAM

CITACU STA MI TO SVE NUDE INFORMACIJE IZ OBIMA OBSERVER-OVOG CALLBACK-A, PA CU VIDETI STA MI JE OD TOGA KORISNO

# :five: PROSIRUJEM REDUCER STATE, KOJI TREBA DA HOLD-UJE ID TRENUTNOG INTERSECTED DIV-A (TO SAM VEC JEDNOM URADIO PA COMMENT-OVAO CODE, SADA CU SAM OTO DA ODCOMMENT-UJEM)


