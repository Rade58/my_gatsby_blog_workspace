# DAKEL SADA SE MOGU POSVETITI DEFINISANJEM SVEGA STO TREBA DA SE NALAZI U GROUP PAGE-U

ISTO TAKO POSVETICU SE STILIZOVANJEM

## ONO STO MOZES DA PRIMETIS NA NOVIM PAGE-OVIMA, JESTE DA SE I DALJE APLICIRAJU ONA STILIZOVANJA PROVIDED BY `theme-ui`

STILIZOVANJE MI JE UVEK NA POSLEDNJEM MESTU, PA CU TO TEK VIDETI NA KRAJU, A I MORAM SE DOSTA BOLJE UPOZNATI SA theme-ui OM

JER KAK OVIDIM NISAM UOPSTE ISKORISTIO NJEGOV POTENCIJAL

JER SAM SAMO KORISTIO css TEMPLATE FROM EMOTION ILI PONEKAD sx ATRIBUT

A NISAM NIKAK OGOTOVO KORISTIO VARIANTS

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
