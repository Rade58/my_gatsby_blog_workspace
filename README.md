# SCRIPTOVI

---

ps.

U SUSTINI DA AKO ZELIS DA KORISTIS **`GRAPHQL PLAYGROUND`**, TI MOZES DO DEFINISATI SA ENVIROMENT VARIJABLOM

---

## EVO STA SAM DODAO

- `cat sites/blog/package.json`

```json
"scripts": {
    "dev": "gatsby develop",
    "play": "GATSBY_GRAPHQL_IDE=playground gatsby develop",
    "clean": "gatsby clean",
    "prod": "gatsby build",
    "serve": "gatsby serve"
  }
```

# MISLIM DA `gatsby serve` SLUZI DA SE TESTIRA ONO STO JE SAGRADJENO U `public` FOLDERU (PO DEFOLTU JE SERVED NA localhost-U 9000)

[VISE O NJEMU](https://www.gatsbyjs.org/docs/gatsby-cli/#serve)

## EXECUTING SCRIPTA SA `yarn workspace blog` <ime script-a>

## IAKO MOZDA NEMA VELIKE VEZE SA OVO MTEMOM DODAO SAM DA SE MOZE KORISTITI slug IZ FRONTMATTER-A, KAO PATH, USTVARI AKO JE OBEZBEDJEN ON CE SE UVEK KORISTITI KAO PATH
