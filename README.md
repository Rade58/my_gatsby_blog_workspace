# DAKLE ZELIM DA IMAM MOGUCNOST DA NA JEDNOM BLOG POST PAGE-U IMAM LEFT AND RIGHT ARROW, KOJE UPIRU DO PREVIOUS, ODNOSNO NEXT BLOG POST PAGE-A IZ GRUPE POSTOVA

**PADA MI NAPAMENT GRUPNA NUMERACIJA POSTOVA, STO BI SE OBAVLJALO U FRONTMATTER-U MDX PAGE-A**

ZASTO BI TO UOPSTE NUMERISAO?

PA MISLIM DA JE TAKO LAKSE RADITI QUERY U RESOLVERU, KOJEG CU NARAVNO, SIGURNO IMATI

`U RESOLVER-U BI RUNN-OVA QUERY, U ODNOSU NA REDNI BROJ TRENUTNOG POST-A`, **`TAK OSTO BI USTVARI QUERY-OVAO DVA NODE-A, PREMA, JEDNOM BROJU KOJI JE ZA JEDAN MANJI OD TRENUTNOG REDNOG BROJA, I DRUGOM BROJU, KOJI JE ZA JEDAN VECI OD TRENUTNOG REDNOG BROJA`**

TRUDICU SE DA U NASTAVKU PO KORACIMA, ODNONO NASLOVIMA, REDNO OBJASNI, STA SAM SVE RADIO

# :one: OPET MORAS DA MENJAS FRONTMATTER, SVAKOG MDX-A, JER CES DODATI, NOVI FIELD, KOJI CE SE ZVATI `ordinalG`

'ordinal' ZNACI REDNI BROJ A 'G' ZNACI DA TO DEFINISEM ZA JEDNU GRUPU

`DAKLE SVAKA GRUPA CE IMATI POST-OVE SA SVOJIM REDNIM BROJEVIMA`, **POCEVSI OD NULE** 

ISTO TAKO NE ZABORAVI DA `PROMENIS` **FRONTMATTER OBRAZCE** (FOLDER `sites/blog/__frontmatter-obrazci/IZGLED`) KOJE SI DEFINISAO, KAKO BI USTVARI ZNAO STA TREBA INACE DA DEFINISES, PRI KREIRANJU, I DEFINISANJU MDX FAJLOVA (MOZDA BI OVO TREBAL ODA BUDE PRVO STA CES DEFINISATI)

I OPET NAPOMINJEM DA TI POMENUTI `ordinalG` BROJ TREBA POCETI OD NULE (NEMEM POSEBAN RAZLOG, CISTO SAM UZEO TAKVU KONVENCIJU)

# :two: ONDA IDEM U `packages/gatsby-theme-raedal/gatsby-node.js` DA PROSIRIM SVE STA TREBA POCEV OD SCHEMA-E, PA DO KREIRANJA RESOLVER-A ZA FIELD, KOJI TREBA DA UZME PATH PREDHODNOG I SLEDECEG POSTA, QUERY-UJUCI U ODNOSU NA GROUP NAME I ordinalG

SCHEMA-U PROSIRUJEM TAKO STO CU

- DODATI `ordinalG` FIELD

- DODATI FIELD, KOJI TREBA DA BUDE OVAKVOG TYPE-A

```php
type PevAndNext {
  prevPagePath: String
  nextPagePath: String
}
```

**FIELD MOZE DA SE ZOVE `prevAndNextPagePath`**

STO ZNACI DA CU KREIRATI POTPUNO NOVI TYPE (I BITNO TI JE DA FIELD-OVI U NJEMU SMEJU BITI null) (JER POSTOJI ONAJ PRVI POST KOJI NEMA PREDHODNIKA I ONAJ POSLEDJNI PUBLISHED POST, KOJI NEMA SLEDBENIKA) 

# :three: PROSLEDJUJEM POMENUTE FIELD-OVE (`ordinalG` I `prevAndNextPagePath`), PRILIKOM KREIRANJA NODE-A

MISLIM NRAVNO NA BlogPostPage NODE-OVE

# :four: KREIRAM RESOLVER-A ZA `prevAndNextPagePath` FIELD NA `BlogPostPage` TYPE-U

I TAMO BI TREBAL ODA NAPRAVIM QUERY-JE, DA UZEMEM PATH PREVIEW AND NEXT PAGE-A

NARAVNO JA CU, PRVO KORISTITI `Graphiql` JER MI JE TAKO LAKSI DEVELOPMENT 

***

CISTO NAPOMINJEM: (KAKO BI TI BILO LAKSE TOKOM DEVELOPMENT-A)

A ONO STO TREBA DA BUDE OUTPUTED IS RESOLVERA JE OVAKAV OBJEKAT:
`{prevPagePath: "nekiPath" || null , nextPagePath: "neki path" || nulll }`

***

# :four: VREDNOSTI KOJE CU KORISTITI, KAO ARGUMENTE PRI PISANJU QUERY-JA U RESOLVER-U

U ODNOSU NA OVE VREDNOSTI CU PRAVITI DVA QUERY-JA U RESOLVER-U

```js

// ZA PREV PAGE

source.groupPage.name

(source.ordinalG - 1)

```

```js

// ZA NEXT PAGE

source.groupPage.name

(source.ordinalG + 1)

```

# :five: PISANJE QUERY-JA U RESOLVER-U ZA `prevAndNextPagePath` FIELD NA `BlogPostPage` TYPE-U

IAKO NECES KORISTITI GRAPHQL FORMAT DA NAPISES QUERY-JE, VEC TO RADIS U JAVASCRIPTU, TI IPAK NAPRAVI I DEVELOPUJ QUERY U Graphiql-U

DAKLE TREBA TI QUERY, KOJI CE IMATI DVA ARGUMENTA

$groupPageName, $

OSTALO TI JE JASNO KAK ODA FORMIRAS

EVO POGLEDAJ KAKAV SAM QUERY NAPRAVIO

```php
query TakePath($ordinalG: Int!, $groupName: String!){
  blogPostPage(groupPage: {name: {eq: $groupName}}, ordinalG: {eq: $ordinalG}){
    path
  }
}
```

ARGUMENTI

```json
{"ordinalG": 2, "groupName": "Typescript"}
```

A KAKO SAM OVAJ QUERY REKREIRAO U JAVASCRIPT-U (I TO DVA PUTA JER QUERY-UJEM ZA DVA NODE-A), POGLEDAJ U `createResolvers` HOOK-U node FAJLU


