# DEVELOPMENT NOTES

---

ps. NEMOJ DA TI SE DESI DA IMAS ISTOIMENE FAJLOVE SA RAZLICITIM EKSTENZIJMA (.js, .jsx, .tsx) (GOMILA PROBLEMA A NEDOVOLJNO DOBRO LINTING PRAVILO DA TI TO OBZANI)

---

# :one: `package.json` TVOJE TEME **NEMA** `"private": true`

## MISLIM DA gatsby , react , react-dom MOZES DA INSTALIRAS KAO PEER DEPENDANCY U TEMI

ALI MISLIM DA JE DOBRO DA IH KAO DEPENDANCIES INSTALIRAS NA SITE LEVELU

- `yarn workspace blog add gatsby react react-dom`

# :two: TYPESCRIPT SUPPORT

[PRATIO SAM OVAJ CLANAK](https://www.lekoarts.de/en/blog/setting-up-a-gatsby-themes-workspace-with-typescript-eslint-and-cypress)

INSTALIRAM PLUGIN U TEMU

- `yarn workspace gatsby-theme-raedal add gatsby-plugin-typescript`

- `touch packages/gatsby-theme-raedal/gatsby-config.js`

- `touch packages/gatsby-theme-raedal/gatsby-config.js`

```js
module.exports = {
  plugins: ["gatsy-plugin-typescript"],
};
```

---

ps. OVO NEMA VEZE SA TYPESCRIPT-OM, ALI NEMOJ DA ZABORAVIS DA NA NIVOU blog-A DEFINISES `gatsby-config.js` I U NJEMU SPECIFICIRAS TVOJU TEMU

---

_STO SE TICE SPECIFICIRANJA DEFAULT LAYOUT-A U `gatsby-config.js` I SPECIFICIRANJA TEMPLATE-OVA U `gatsby-node.js`_ **`OMOGUCENO TI JE DA KORISTIS .tsx KOMPONENTE`** (DAKLE I SA KONFIGURACIJSKE STRANE MOZES KORISTITI TYPESCRIPT)

## STO SE TICE TYPESCRIPT-OVI TYPE DEFINICIJA ZA RAZNE PAKETE INSTALIRAS IH U ROOT

KORISTIS `-W` FLAG PRI INSTALACIJI

- `yarn add -D -W @types/node @types/react @types/react-dom @types/theme-ui`

## TYPE CHECKING CES DEFINISATI TAKO STO CES TYPESCRIPT INSTALIRATI U ROOT-U KAO DEV DEPENDANCY; I TAK OSTO CES DEFINISATI tsconfig.js

- `yarn add -D -W typescript`

- `tsc --init`

STO SE TICE ONOGASTA CE BITI U `tsconfig.json`, NISAM NISTA CUSTOMIZOVAO VEC PREPISAO IZ CLANKA, PA POGLEDAJ O CEM USE RADI

**DODAJ I SCRIPT KOJI CE SE ZVATI** `type-check` **I TO DODAJES U ROOT-U** (NJEGOVA VREDNSOT JE SAMO `"tsc"`)

## PODESAVANJE ESLINT-A I PRETTIER-A

SVE INSTLACIJE OBAVLJAM U ROOT-U

- `yarn add -D -W @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier`

I DODAJEM CONFIG FAJLOVE TO THE ROOT

- `touch .eslintrc.js`

I U NJEGA SAM SVE PREKOPIRAO, PREKOPIRAO JER OVO JE KONFIGURACIJA FROM `airbnb`

**LINTING SCRIPTOVE SAM TAKODJE DODAO U** `package.json` FAJL U ROOT-U

## TAKODJE SAM PODESIO I `.eslintignore` FAJL

JER ZELIM DA SPECIFICIRAM DA ESLINT IGNORISE KONFIGURACIJSKE FAJLOVE, BILO GDE DA SU

# :two: THEME DEPENDANCIES

- `yarn workspace gatsby-theme-raedal add @emotion/core @mdx-js/mdx @mdx-js/react gatsby-plugin-mdx gatsby-plugin-theme-ui gatsby-source-filesystem mdx-utils mkdirp prism-react-renderer react-live theme-ui`

MORAS INSTALIRATI I gatsby DA BI UOPSTE MOGAO BITI KORISCEN gatsby-source-filesystem

ZATO MOZES U TEMI INSTALIRATI KAO PEER DEPENDANCIES I react I react-dom I gatsby

- `yarn workspace gatsby-theme-raedal add gatsby react react-dom --peer`
