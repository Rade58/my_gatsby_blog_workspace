# DEVELOPMENT NOTES

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
  plugins: ["gatsby-plugin-typescript"],
};
```

---

ps. OVO NEMA VEZE SA TYPESCRIPT-OM, ALI NEMOJ DA ZABORAVIS DA NA NIVOU blog-A DEFINISES `gatsby-config.js` I U NJEMU SPECIFICIRAS TVOJU TEMU

---

## STO SE TICE TYPESCRIPT-OVI TYPE DEFINICIJA ZA RAZNE PAKETE INSTALIRAS IH U ROOT

KORISTIS `-W` FLAG PRI INSTALACIJI

- `yarn add -D -W @types/node @types/react @types/react-dom`

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
