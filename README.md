# NECE VISE BLOGPOSTS KREIRANJA, KREIRATI GROUP PAGES, JER CU IPAK ZADATI DA GROUP PAGES IMAJU SVOJE CORRESPONDING MDX-ES

OVO SLEDECE SAM REAKO U PREDHODNOM BRANCHU ALI TU JE IMALO DA SE AZE JOS STVARI, TAK ODA OVO DOLE MOZES DA BRZO PROCITAS

**ALI KONKRETNO NAKON SLEDEDCEG BLOKA TEKSTA, JA CU USTVARI IZNETI MOJU STRATEGIJU**

***

***

***

***

DIGRESIJA: (KOJOM CU SE POZABAVITI U SLEDECEM BRANCH-U)

ZASTO SE MENI GROUP PAGES NE KREIRAJU NAKON SLEDECEG BUILDA, VEC MORAM DA CISTIM CACHE

PA ZATO STO IMAM NON PAGE KOMPONENTE

I MISLIM DA JE OVO PROBLEM CACHE-A

**ODNONO SVE BLOG PSOYT PAGES SU IZVEDENE OD MDX-A**

**A MOJE GROUP PAGES NEMAJU APPROPRIATE PAGES**

**MOZDA BI TI OVO TREBAO BITI ZDATAK**

**DA IPAK DEFINISES DA I SVAKI GROUP PAGE IMA SVOJ**

**`CORRESPONDING MDX FAJL`**

`MEDJUTIM MISLIM DA MI JE KASNO DA OVAKO NESTO NAPRAVIM, I DA J EBOLJE DA UVEK KORISTIM clean PRI SVAKOM NOVOM BUILD-U` (**NIJE KASNO, JER CU TO URADITI U SLEDECEM BRANCH-U**)

- `yarn workspace blog clean`

PA ONDA

- `yarn workspace blog dev`

I TO PRI SVAKOM ALTERINGUM GATSBY NODE FAJLA ILI DODAVANJA NOVOG POSTA

**ALI IPAK MISLIM DA OVO NIJE DOBRO JER CE OVO SIGURNO NESTO NASTETI USER-U**

PREDPOSTAVLJAM DA CE SE CACHE IZBRISATI DA BI SE KREIRAO NOVI I TO CE SIGURNO VEROVATNO IZAZVATI NEKI REFETCHING KOD USER-A

***

***

***

***

## TREBALO BI OPET POCETI OD CONFIG-A

RECI CU TI TACNO STA SAM URADIO U

`packages/gatsby-theme-raedal/gatsby-config.js`

I STA SAM URADIO U FAJLU

`packages/gatsby-theme-raedal/utility/utility-options.js`

I DACU OBILNE KOMENTARE, JER SAM KONACNO SHVATIO NEKE STVARI

# :one: PRVO STA CU URADITI JESTE DEFINISATI IZ KOJEG FOLDERA LOAD-UJEM GROUP PAGES

- `code packages/gatsby-theme-raedal/utility/utility-options.js`

NEKA SE FOLDER (GOVORIM O FOLDER-U NA NIVOU SITE-A) ZOVE

**`grouppages`**

POGLEDAJ FAJL DA VIDIS KAKO SAM TO DEFINISAO

# :two: SADA KAO STO SAM I ZA BLOG POST MDX-OVE DEFINISAO, DA IH LOAD-UJE GATSBY SOURCE FILESYSTEM, TAKO DEFINISEM I U SLUCAJU GROUP STRANICA

- `code packages/gatsby-theme-raedal/gatsby-config.js`

POGLEDAJ POMENUTI FAJL DA VIDIS STA SAM URADIO

# :three: SADA IDEM U `packages/gatsby-theme-raedal/gatsby-node.js`, GDE CU DA USTVARI REDEFINISEM KRIRANJE GROUP PAGE-OVA

MISLIM DA MI APPROACH TREBA BITI SLEDECI PRI KREIRANJU NODE-OVA (U `onCreateNode` HOOK-U)

UPOREDJIVANJE 

- **`name`** SA GROUP NODE-A KOJEG JE LOAD-OVAO FILESYSTEM (ODNOSNO GATSBY PLUGIN MDX, JER ON PRVI MANIPULISE SA NODE-OM KOJI JE KREIRAO FILESYSTEM)

SA

- **`group`** SA BLOG POST NODE-A KOJEG JE LOAD-OVAO FILESYSTEM (ODNOSNO GATSBY PLUGIN MDX, JER ON PRVI MANIPULISE SA NODE-OM KOJI JE KREIRAO FILESYSTEM)

# OBJASNJAVACU GATSBY-JEV HOOK AFTER HOOK, KAKO BI OBZNANIO STA SAM, DODAO U KOJI HOOK


***
***

U `packages/gatsby-theme-raedal/gatsby-node.js` KRECEM SA FRESH KOMENTARIMA I UKLONICU STARE, KAKO BI MI BILO LAKSE DA ZNAM STA SAM, I STA SAM KADA URADIO

***
***

## `onPreBootstrap`

DAKLE POTREBNO JE DEFINISATI DA SE KREIRA FOLDER NA SITE NIVOU, AKO NIJE PREDHODNO KREIRAN 

KADA TO URADIS PROVERI

SAVETUJEM TI SADA DA NAPRAVIS BUILD I VIDIS DA LI CE **`grouppages`** FOLDER BITI KREIRAN NA NIVOU SITE-A

I ZAISTA, NAKON BUILD-A FOLDER JE KREIRAN

## VEC SAM SPOMENUO STA CU RADITI NA NIVOU `onCreateNode` HOOK-A, A TAKODJE CU OSTAVITI I OBILNE KOMENATARE PA CES MOCI VIDETI STA SAM URADIO

IMA MNOGO TOGA STA SE TREBA URADITI I ZATO SAM OSTAVIO OBILNE KOMENTARE

**MEDJUTIM, NAJBOLJE TI JE DA KRENES OD TOGA DA STAVIS NEKE MDX FAJLOVE U NOVOKREIRANI** `grouppages` FOLDER I DA ONDA U OBIMU POMENUTOG HOOK-A PRVO STAMPAS OVO

```js
if(getNode(node.parent).sourceInstanceName === "group-pages-raedal"){
  // PROVERAVAM DA L ICE SE POJAVITI ONAJ NAME KOJI SAM ZADAO
  // U CONFIGURACIJSKOM FAJLU GATSBY-JA
  console.log(
    getNode(node.parent).sourceInstanceName
  )
}
```

ALI PE TOGA DODAJ NEKI MDX U

`sites/blog/grouppages`

ISTO TAKO OVO BI BIO FRONTMATTER TIH FAJLOVA (ODNOSNO OVO BI BIO PRIMER ZA GRAPHQL PAGE)

```mdx
---
group: GraphQL
groupColor: "#e04681"
keywordTextColor: "#fff"
keywordBorderColor: "#0a0a0e"
---

```

KREIRAO SAM TRI OVAKVE STRANICE SVAK NAMENJENA NECEMU: typecript-u, graphql-u, javascript-u

**I ZAISTA TOKOM BUILD-A NODE-OVA ZBOG ONOGA STO SAM DEFINISAO, TRI PUTA SE STAMPALO** `"group-pages-raedal"`

A SADA POVECAJ BROJ TIH MDX-OVA ZA SVE BLOG PSOTOVE KOJE IMAS KOJIMA BI CORRESPONDING GRUPA PRIPADALA, NEMOJ DA OSTAVIS NISTA UNUSED (ZBOG LAKSEG DEVELOPMENT-A, DA BI LAKSE REDEFINISASAO SVE STA TREBAS)

## DAKLE OVIM PRINCIPOM JA CU IMATI 