# ZELIM DA NAPRAVIM I AUTHOR PAGES

DAKEL STRANICU O KOJOJ CE BITI RECI O AUTORU I NA KOJEM CE MOZDA BITI SLIKA AUTOR-A

OVO ZNACI DA CU I NA BLOG POST PAGE-U JA MORATI DODAVATI IME AUTOR-A (ODNONO LINK)

# BOLJE JE DA NAPRAVIM AUTOR PAGE I TAMO PREDSTAVIM SVE SOCIAL MEDIA ICONS I DA DEFINISEM JOS STVARI, KRATAK TEKST O AUTORU

DOBAR EXAMPLE JE SLEDECI TEKST

<https://alligator.io/author/paul-halliday>

# :one: OPET MORAM KONFUGURIRATI GATSBY

`packages/gatsby-theme-raedal/gatsby-config.js`

JASNO TI JE DA CU OPET KORISTITI NOVI INSTANCU GATSBY-JEVOG FILESYSTEMA

A NA NIVOU SITE-A, `AUTHOR MDX FILES` CE SE STAVLJATI U FOLDER **`authors`**

DAKLE TAKO CU JA DEFINISATI

TAKODJE CU U `packages/gatsby-theme-raedal/gatsby-node.js` U `onPreBootstrap` HOOK-U DEFINISATI KREIRANJE FOLDERA `authors` NA NIVOU SITE-A, TO JE SLUCAJ ONDA KADA ONAJ KOJI PRAVI SITE, NE DODA RUCNO TAJ FOLDER

# :two: `createSchemaCustomization` HOOK, DEFINISANJE SCHEMA-E

PRE TOGA TI MOZES DA KRIRAS MD FAJLA, U KOJEM CES SPECIFICIRATI SVE STA MISLIS DA TREBA DA OD FIELD-OVA IMA TVOJ NOVI TYPE

SAMO CU RECI DA CE SE NOVI TYPE ZVATI **`AuthorPage`**

## POSTO SAM ODLUCIO DA FRONTMATTER AUTHOR PAGE-A IMA ID INSTALIRACU PAKET `nanoid`

- `yarn workspace gatsby-theme-raedal add nanoid`

A PRE BILO CEGA NAPRAVICU TYPESCRIPT FILE, KOJI CU RUNN-OVATI

PA CU NAPRAVITI SCRIPT U SITE-OVOM `package.json`-U

U SUSTINA KADA ODLUCIS DA KREIRAS KORISNIKA RUNN-UJ

- `yarn workspace blog newauthor`

I TO CE TI OBEZBEDITI ID KOJI CES STAVITI NA AUTH

**ZASTO SAM POMENUTO URADIO**

PA STA AKO MOJ BLOG POSRASTE I PRIVUCE NEKE NOVE AUTORE, OVO MI DODJE KAO FUTURE PROOFING, AKO NA PRIMER BUDEM ZELEO DA DEFINISEM NEKI FORMULAR ZA AUTORE, JESTE DA SU TO MOZDA SAMO LEPE ZELJE ALI UREDU JE

## DAKLE SADA MOGU NASTAVITI SA DEFINISANJEM SCHEMA CUSTOMIZATIONA I TYPE-A `AuthorPage`

STO SE TICE FIELD-OVA, JEDINO SLEDECI FIELD-OVI MORAJU BITI NON NULL

- `authorID`

- `name`

OSTALI FIELD-OVI SMEJU BITI NULL

**A TI OSTALI FIELD-OVI SE ONDOSE NA URL-OVE PROFILA NA SOCIJALNIM MREZMA**

DAKLE gthub, twitter, instagram (MOZDA LINKEDIN, MOZDA JOS NESTO DRUGO) 

## ZA FIELD-OVE KOJI SE ODNOSE NA SLIKU AUTOR-A DEFINISACU RESOLVER-A

MEDJUTIM TO CE MORATI SACEKATI, JER PRVO MORAM DODATI DOSTA STVARI U SCHEMA-U 

**PORED RESOLVER-A, JA MORAM DA KREIRAM SPECIJALNI TIP KOJI TREBA DA PREDSTAVLJA SOCIAL MEDIA**

U SUSTINI VRACAM SE U CONFIG FAJL DA TAMO ZADAM JOS NEKOLIKO UPOTREBA FILESYSTEM-A

ZA PROFILNE SLIKE AUTORA

ZA SOCIJALNE IKONE

POGLEDAJ <sites/blog/____FOLDERS.md> DA VIDIS KAKVE SAM SVE FOLDERE 'IMPLEMENTIRAO'

# ONDA MOGU DA SE POSVETIM SCHEMA-I

DODACU DOSTA FIELD-OVA ZA NOVI `AuthorPage` TYPE, KOJI IMPLANTIRA Node

DODACU NOVI TYPE `SocialMedia` SA KOJIM CU TYPE-OVATI JEDAN FIELD NA AuthorPage

*ISTO TAKO ZA POSTOJECI TYPE* `BlogPostPage` ZADAJEM FIELD **`author`** I TYPE-UJEM GA SA **AuthorPage**

JASNO TI JE ZASTO SAM TO URADIO

# DA BIH MOGAO DA LEPO DEVELOP-UJEM OSTAVICU NEKOLIKO SOCIAL MEDIA SVG-JEVA U `sites/blog/social-icons`; I NE ZABORAVI DA ONI MORAJU BITI LOWERCASE I MORAJU DA IMAJU ISTA IMENA KAO SOCIAL NETWORKS

ISTO TAKO MEDJU NJIMA TREBA DA BUDE SVG SA IMENOM: `author_placeholder.svg`

STO SE TICE SVG-JEVA SOCIJALNIH IKONA, SKINUO SAM IH ODAVDE

<https://www.s-ings.com/typicons/>

ALI OSTAVLJAM TI I OVU SJAJNU STRANICU KOJA PISE O SVIM ICON RESURSIMA

<https://1stwebdesigner.com/best-free-icon-fonts-web-design/>

DOBRO I TO SAM URADIO

# DA SADA DEFINISEM KREIRANJE 'AuthorPage' NODE-OVA

MOZES DA ZADAS JEDAN AUTHOR MDX

CISTO DA KASNIJE PROVERIS QUERY

DAKLE U FOLDER `authors` NA SITE NIVOU NARAVNO, KOJI BI VEC TREBAL ODA BUDE KREIRAN AKO SI RANIJE POKRETAO DEV SCRIPT; `STAVI JEDAM MDX FAJL`

NARAVNO GENERISI NANOID JER TO JE NAJVAZNIJE

I MOZES DA ZADAS NEKE FIELD-OVE KOJE ZELIS

OVO SU TI NAJVAZNIJI FIELD-OVI, KOJE MOZES DA ZADAS

```php
authorID (ZADAJES ONAJ NANOID KOJI SI GENERISAO)
name
lang
about

github
twitter
instagram

personalWebsite  # OVO JOS NEMAM
```

IMA JOS FIELD-OVA ALI KOMPLETAN OBRAZAC MOZES NACI OVDE:

- `sites/blog/__frontmatter-obrazci/IZGLED/author page.md`

## NE ZABORAVI DA SVAKOM BLOG POST PAGE-U DODAS I `author` FIELD SA ONIM NANOID IDJ-JEM KOJEG SI GENERISAO

TO SAM URADIO

# E SADA NAPOKON MOGU DA SE POSVETIM KREIRANJU AUTHOR PAGE NODE-OVA

DAKLE ZA NEKE FIELD-OVE KORISTICE SE UNCHANGED ONA VREDNOST IZ FRONTMATTER-A

ALI IPAK VECINU CU MORATI DA TRANSFORMISEM KORISCENJEM RESOLVERA, STO CU URADITI CIM DEFINISEM KREIRANJE NODE-OVA

A MORACES DA DEFINISES I `author` RESOLVER ZA `BlogPostPage` (**JER ZELIS DA PREKO TOG FIELD-A QUERY-UJES AUTOR-A**)

A NE ZABORAVI DA MORAS DODATI I `author` FIELD, PRI KREIRANJU `BlogPostPage`-A **NODE**-OVA

## POSTO SAM URADIO DAOSTA STVARI, MOZDA BIH MOGAO DA POKRENEM DEV SCRIPT I DA, POKUSAM DA U Graphiql-U, QUERY-UJEM ZA AuthorPage NODE-OVIMA, ILI JEDNIM NODE-OM KOJI BI TREBAO DA BUDE TU

PROSAO JE QUERY, A SADA BI DA POKUSAM DA NAPRAVIM RESOLVER-E

RESOLVERE TREBA DA PRAVIM PRVO ZA FIELD-OVE NA **`AuthorPage`**, A TO SU

- authorImage
- authorPlaceholderSvg

ZATIM RESOLVERA TREBA DA PRAVIM ZA FIELD NA **`SocialMedia`** TYPE-U, A TO JE

- icon

ZATIM RESOLVER-A TREBA DA PRAVIM ZA FIELD NA **BlogPostPage** TYPE-U, A TO JE

- author

