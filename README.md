# DAKEL SADA SE MOGU POSVETITI DEFINISANJEM SVEGA STO TREBA DA SE NALAZI U GROUP PAGE-U

ISTO TAKO POSVETICU SE STILIZOVANJEM

## ONO STO MOZES DA PRIMETIS NA NOVIM PAGE-OVIMA, JESTE DA SE I DALJE APLICIRAJU ONA STILIZOVANJA PROVIDED BY `theme-ui`

STILIZOVANJE MI JE UVEK NA POSLEDNJEM MESTU, PA CU TO TEK VIDETI NA KRAJU, A I MORAM SE DOSTA BOLJE UPOZNATI SA theme-ui OM

JER KAK OVIDIM NISAM UOPSTE ISKORISTIO NJEGOV POTENCIJAL

JER SAM SAMO KORISTIO css TEMPLATE FROM EMOTION ILI PONEKAD sx ATRIBUT

A NISAM NIKAK OGOTOVO KORISTIO VARIANTS

USTVARI TI MOZES DA URADIS NESTO STO SI MOZDA ZABORAVIO

**TI IMAS KREIRANU TEMU** (_DODUSE KORISTIS PRESET, KOJI SI TWEAK-OVAO, DIREKTNO, U SVOM PRETHODNO CSS, STO MOZDA I NIJE DOBRO_)

TAKO DA BAS NISI DOBRO ISKORISTIO THEME-UI

ALI TVOJA TEMA JE OVDE

**`packages/gatsby-theme-raedal/src/gatsby-plugin-theme-ui/index.ts`**

MEDJUTIM, KADA BUDES PUBLISH-OVAO BLOG, MORACES PRE TOGA DA **`TAKORECI, LIFT-UJES TVOJ STYLING UP TO THEME UI, KAKO BI TI SVE BILO MALO VISE COMPOSABLE`**

ALI ZA SADA, SAMO CES U VESTI TEMU U

- `packages/gatsby-theme-raedal/src/components/group-page-components/group-page.tsx` (IPAK NISAM OVDE UVEZAO TEMU; ODLUCIO SAM IPAK DA ISTO NAPRAVIM NOVI LAYOUT, U KOJI CU UVOZITI UPRAVO `group-page` KOMPONENTU **I KROZ LAYOUT CU OBEZBEDITI TEMU**)

I TAMO CES PROVIDE-OVATI TEMU, KROZ `ThemeProvider` KAO STO SI TO RADIO I U Layout KOMPONENTI ZA BLOG POST

U `packages/gatsby-theme-raedal/src/components/group-page-components/group-page.tsx` CES UVESTI LAYOUT

TI CES USTVARI SADA NAPRAVITI LAYOUT KOMPONENTU SAMO ZA GROUP PAGE, I TAMO CES PROVIDE-OVATI TEMU, I DALJE CES U TAJ LAYOUT PRAVITI COMPOSING

# PRVO STA CU DA URADIM JESTE DOBAR TYPING (TYPESCRIPT) ZA PODACIMA, KOJI KROZ PROPSE STIZU U `group-page-template`

NARAVNO **`data`** PROP JE SVE ONO STO JE QUERIED ZA JEDAN PAGE

A, U **pageContext** PROP-U NALAZI SE SAMO ONO STO JE BILA QUERY VARIJABLA

JA SAM USTVARI STAMPAO, ODNOSNO RENDER-OVAO, SVE PROPSE TAK ODA SAM VIDE STA TU SVE IMA DODATNO, PORED data PROPA I pageContext PROPA

ALI SUMNJAM DA CU BILO STA DODATNO KORISTITI

ALI ONO STO BIH MOGAO KORISTITI (AKO ZATREBA) JESTE

**location** PROP

KAKVE SAM TAMO INFORMACIJE ZASNAO: PA RECIMO TAJ PROP IMA SLEDECE PROPERTIJE

```JSON
"location": {
    "pathname": "/graphql",
    "search": "",
    "hash": "",
    "href": "http://localhost:8000/graphql",
    "origin": "http://localhost:8000",
    "protocol": "http:",
    "host": "localhost:8000",
    "hostname": "localhost",
    "port": "8000",
    "state": null,
    "key": "initial"
  },
// PREDPOSTAVLJAM DA CE OVI PODACI BITNI ZNATNO DRUGACIJA, KADA BUDEM
// BLOG HOST-OVAO NA NETLIFY-U
```

VIDIS DA TI SAMI GRAPHQL VEC PRUZA DOSTA INFORMACIJA

## USTVARI OSTAVLJAM OVDE CEO OBJEKAT DA GA IMAM KAO REFERENCU, STA SVE TREBAM DEFINISATI

```json
{
  "path": "/graphql",
  "location": {
    "pathname": "/graphql",
    "search": "",
    "hash": "",
    "href": "http://localhost:8000/graphql",
    "origin": "http://localhost:8000",
    "protocol": "http:",
    "host": "localhost:8000",
    "hostname": "localhost",
    "port": "8000",
    "state": null,
    "key": "initial"
  },
  "pageResources": {
    "json": {
      "data": {
        "groupPage": {
          "id": "c0f3315c-74ab-5f3f-8922-42b041b47a0a",
          "name": "graphql",
          "path": "/graphql",
          "groupColor": "#e04681",
          "updated": "2 days ago",
          "blogPostPages": [
            {
              "title": "Neki title",
              "path": "/graphql/client side/intro",
              "updated": "2 days ago",
              "frontMatter": {
                "description": "neki description",
                "themeColor": "blanchedalmond"
              }
            },
            {
              "title": "We like using Apollo Client",
              "path": "/graphql/client side/apollo client",
              "updated": "2 days ago",
              "frontMatter": {
                "description": "Apollo client provides it's own react hooks",
                "themeColor": "pink"
              }
            }
          ],
          "allBlogKeywords": [
            {
              "keyword": "backend",
              "path": "/backend"
            },
            {
              "keyword": "graphql",
              "path": "/graphql"
            }
          ]
        }
      },
      "pageContext": {
        "id": "c0f3315c-74ab-5f3f-8922-42b041b47a0a"
      }
    },
    "page": {
      "componentChunkName": "component---packages-gatsby-theme-raedal-src-templates-group-page-template-tsx",
      "path": "/graphql",
      "webpackCompilationHash": ""
    }
  },
  "uri": "/graphql",
  "data": {
    "groupPage": {
      "id": "c0f3315c-74ab-5f3f-8922-42b041b47a0a",
      "name": "graphql",
      "path": "/graphql",
      "groupColor": "#e04681",
      "updated": "2 days ago",
      "blogPostPages": [
        {
          "title": "Neki title",
          "path": "/graphql/client side/intro",
          "updated": "2 days ago",
          "frontMatter": {
            "description": "neki description",
            "themeColor": "blanchedalmond"
          }
        },
        {
          "title": "We like using Apollo Client",
          "path": "/graphql/client side/apollo client",
          "updated": "2 days ago",
          "frontMatter": {
            "description": "Apollo client provides it's own react hooks",
            "themeColor": "pink"
          }
        }
      ],
      "allBlogKeywords": [
        {
          "keyword": "backend",
          "path": "/backend"
        },
        {
          "keyword": "graphql",
          "path": "/graphql"
        }
      ]
    }
  },
  "pageContext": {
    "id": "c0f3315c-74ab-5f3f-8922-42b041b47a0a"
  },
  "pathContext": {
    "id": "c0f3315c-74ab-5f3f-8922-42b041b47a0a"
  }
}
```

# AKO BUDE BILO POTREBE DA PROSIRIS KEORISCENJE PROPSA, ODNOSNO AKO ZELIS DA KORISTIS MNOGO VISE OD OVIH GORNJIH PROPSA (ZA SADA TI CES KORISTITI VELIKI DEO, ALI NE SVE) UVEK MOZES DA IH POGLEDAS GORE ILI DA IH PONOVO RENDER-UJES, I TAKO ONDA MOZES DA PROSIRIS SVOJE TYPESCRIPT INTERFACE-OVE, KAKO BI KORISTIO VISE PROPSA

# STO SE TICE CONTEXT API, NAJBOLJE JE KREIRATI JEDAN CONTEXT, KOJI CE BITI WRAPPED AROUND SLEDECE KOMPONENTE

- `packages/gatsby-theme-raedal/src/components/group-page-components/group-page.tsx`

DA LI DA KORISTIM REDUCER-A (PA VEROVATNO CE TREBATI)

# MOZDA BIH TREBAO DA OVDE UPOTREBIS MAL OVISE 'SKOLSKU UPOTREBU' HOC (HIGHER ORDER KOMPONENTI); USTVARI NIJE REC O HOC-U, VEC O **`CUSTOM HOOK-OVIMA`**

---

**USTVARI POSTO SADA KORISTIM HOOKS, NECU KORISTITI HOC PRINCIP VEC NESTO SLICNO NJEMU A STA SE ZOVE** `CUSTOM HOOKS`

<https://reactjs.org/docs/hooks-custom.html>

ALI BOJIM SE ONOG ADDITIONAL RENDER-A, KOJEG SAM IMAO JEDNOM PRILIKOM (JEDNOM PRILIKOM SAM IMAO UNMOUNTING, ZA KOJI NISAM BIO SIGURAN ZASTO SE DOGODIO)

MEDJUTIM AKO POGLEDAM KAKVO IMAM STANJE SA MOJIM DO SADASNJIM KOMPONENTAMA, ZNAM DA ONE NISU VISE REUSABLE, JER SAM U NJIH VEC EMBED-OVAO, KORISCENJE CONTEXT-A

NISTA STARO NE MOGU POPRAVLJATI, VEC CU NASTAVITI DALJE, ALI NAJBOLJE BI BILO DA SVE STO JE U: `packages/gatsby-theme-raedal/src/components/group-page-components` FOLDERU USTVARI KORISTI, NAJBOLJE PRAKSE

---

ALI MISLIM DA CU MOCI USPESNO DA KORISTIM CUSTOM HOOKS; NAIME, ZASTO NE BIH PROBAO

# ALI NACIN KOJEG VOLIM I KOJEG SE DERZIM JESTE OVAKAV

- OBEZBEDITI REDUCER-A I OBEZBEDITI CONTEXT

- KROZ CONTEST PROSLEDITI (KORISCENJEM PROVIDER-A) REDUCER STATE, I DISPATCH FUNKCIJU

- ALI TAKODJE KROZ CONTEXT PROVIDER-A **_OBEZBEDITI I SVE PODATKE, KOJI SU PROIZISLI IZ GRAPHQL QUERY-JA_**

# TYPESCRIPT I CUSTOM HOOKS

MISLIM DA NECU IMATI VELIKIH PROBLEMA SA TIM

# GROUP PAGE TREBA DA IMA HEADER BEZ PRASETA

# POSTO SAM DEFINISAO CONTEXT I REDUCER RELATED STUFF, MORAM DA NAPRAVIM CUSTOM HOOKS, KOJE CE KORISTITI STATE, STATE PROVIDER KOMPONENTE I OSTALO
