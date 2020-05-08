# DAKLE ZELIM DA NAPISEM DIREKTIVU, I TO ZA DATE, JER MI SE NE SVIDJA @dateformat ,KOJA KORISTI Moment.js

ODLUCIO SAM DA KORISTIM date-fns DA BIH FORMATIRAO TIME, NA MALO BOLJI NACIN

- `yarn workspace gatsby-theme-raedal add date-fns`

<https://date-fns.org/>

POSTO CES KORISTITI format FUNKCIJU IZ PAKETA

```js
const { format, parseISO } = require("date-fns");

// parseISO CE TI TREBATI, JER INACE IMAS DATE STRING
/ /E PA OVO CE TI POMOCI DA GA PRETVORIS NAZAD U BROJ

```

POGLEDAJ OVO:

<https://date-fns.org/v2.13.0/docs/format>

## I OPET JE GADSBY OLAKSAO PISANJE DIREKTIVE, USTVARI DEFINISE SE FIELD EXTENSION (TAK OSE TO ZOVE U GATSBY SVETU)

A UPUTSTVO KAKO DA TO NAPISEM NALAZI SE OVDE

<https://www.gatsbyjs.org/docs/schema-customization/#creating-custom-extensions>

## JA NECU SADA DAVATI DODATNE KOMENTARE, VEC CU, SVE STA JE POTREBNO DEFINISATI U `packages/gatsby-theme-raedal/gatsby-node.js`

KAO JEDAN TIP, JE SAMO INFORMACIJA DA SE `createFieldExtension` NALAZI NA actions-U U `createSchemeCustomization` HOOK-U

## NARAVNO POSTO CU TU DIREKTIVU ZADAVATI ZA NOVI FIELD, MORACES DA MODIFIKUJES I KREIRANJE NODE-OVA

---

test

---
