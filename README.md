# DEVELOP-UJ KOMPONENTU, KOJOM CES PRIKAZIVATI BILO KOJI IMAGE, JER ON OSTA TI ZELIS JESTE DA TI SVAKI IMAGE BUDE TRANSFORMISAN SA CLOUDINARY-JEM 

**DAKLE KORISTIM GATSBY IMAGE I KORISTIM CLOUDINARY**

PODSETI SE OVOGA:

<https://github.com/Rade58/intermediate-gatsby/tree/4_5_USING_THEMES_images_n_clodinary#sada-mozes-da-u-nekoj-komponenti-napravis-static-query-i-da-pull-ujes-in-image>

JEDINO ME MUCI KAKO DA NAPRAVIM NESTO KAO PARALAX

E ZATO NE MORAS KORISTI gatsby-image VEC MOZES KORISTITI `gatsby-background-image`

<https://www.gatsbyjs.org/packages/gatsby-background-image/>

# INSTALIRAJ GATSBY BACKGROUND IMAGE, I MOZDA CU BAS OVAJ ELEMENT KORISTITI ZA SVE SLIKE KOJE BI BILE NA JEDNOM BLOG POST PAGE-U

- `yarn workspace gatsby-theme-raedal add gatsby-background-image`

# KAKO BI IZGLEDALA STRATEGIJA PO KOJOJ CU DEFINISATI ADDING CLOUD IMAGE-A DO SINGLE BLOG POST PAGE-A

- PA FRONTMATTER, SVAKOG PAGE-A TREBA DA IMA JOS JEDAN FIELD, CIJA CE VREDNOST ODGOVARATI TRENUTNOM POSTU, **MOZDA TO MOZE BITI SKRACENICA NASLOVA**

**cloudImagesArrayName**

- KADA UBACUJEM SLIKE U `sites/blog/cloud-images`, ONDA IH IMENUJEM SA POMENUTOM VREDNOSCU `cloudImagesArrayName` FRONTMATTER PROPERTIJA 

- U ODNOSU UPRAVO NA TAJ FRONTMATTER PROPERTI, MOGU NAPRAVITI FIELD PRI KREIRANJU NODE-OVA

**I NE ZABORAVI DA DEFINISES FIELD U TYPE DEFINITIONSIM-A, A ON MOZE BITI TYPED KAO NIZ PODATKA KOJI ODGOVARAJU TYPE-U KOKI IZBACUJE QUERY CLOUDINARY-JA**

***
***

ZATO TI JE NEOPHODNO NA SE U GRAPHIQL-U UPOZNAS SA TYPE-OVIMA CLOUDINARY-JA, TAKO STO CES SE MALO POIGRATI SA CLOUDINARY QUERY-JIMA (**UNCOMMENT-UJ CODE IZ gatsby-config FAJLA, CODE KOJI SE TICE CLODINARY-JA**)

ZA OVO BI TI BILO DOBRO DA PROSLEDIS NEKOLIKO SLIKA, U `sites/blog/cloud-images`, KOJI BI ODGOVARALI ZA `cloudImagesArrayName` NEKOG MDX BLOG PAGE-A, I BILI BI NUMERISANI IMAGE-OVI 

TAKO CES SE UPOZNATI SA RETURNED TYPE-OVIMA RESOLVER-A

**OVO TI JE VAZNO JER MORACES ZADAVATI TACNE ARGUMENTE KADA BUDES QUERY-EOVAO FIELD**

U OVOM SLUCAJU TI NECE TREBATI DIREKTIVE, I NECES MORATI DEFINISATI NIKAKVE DIREKTIVE, ILI KAKO SE VEC ZOVU U GATSBY NODE API-U

ps. KADA QUERY-UJE ZA SLIKAM DOBIJA URL-OVE, KOJE MOZES PROSLEDITI U ADRESS BAR DA VIDIS DA LI CE SE RENDR-OVATI SLIKA

***
***

- A ONDA MOGU I NAPRAVITI RESOLVER-A ZA FIELD NA `BlogPostPage` TYPE-U

**U RESOLVER-U BI QUERY-EOVAO ASSET-OVE CLOUDINARY-JA PREMA VREDNOSTI, KOJA JE IZVORNO POTEKLA OD `cloudImagesArrayName` PROPERTIJA FRONTMATTER-A**

***

KADA BI SVE OVO USPESNO DEFINISAO KAO STO SAM REKAO, MOGAO BI I DA QUERY-UJEM ZA NOVIM FIELD-OM, PRILIKOM KREIRANJA PAGE-A

***

# :one: NAPRAVIO SAM OVAKAV QUERY U GRAPHI-JU

***

MOZES [OVDE](https://github.com/Rade58/intermediate-gatsby/tree/4_5_USING_THEMES_images_n_clodinary) DA SE PODSETIS KAKO TO IDE

***


```php
query CloudImages {
	allFile(filter: {name: {regex: "/graphql_interfaces/"}}){  # OVO JE DEO IMENA IMAGE FAJLOVA ZA JEDAN PAGE (KORISTIM REGEXP)
			nodes {
        childCloudinaryAsset {
          fluid {

            # DA TI NAPOMENEM DA TI OVA JFRAGMENT NIJE DOSTUPAN U GRAPHI-JU ALI BICE
            # TI DOSTUPAN U CODEBASE-U

            ...CloudinaryAssetFluid

            # TAKO DA SAM JA UMESTO OVOGA KORISTIO POJEDINACNE FIELD-OVE

          }
        }
      }
  }
}
```


I EVO STA SAM QUERY-OVAO KAO FLUIDN-U VREDNOST

PRIKAZACU TI SAMO JEDAN NODE. JER CE OVO BITI EKSTENZIVNO

```json
{
  "childCloudinaryAsset": {
    "fluid": {
      "aspectRatio": 1.5,
      "base64": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAMAAACtdX32AAABFGlDQ1BpY20AAHicY2Bg4slJzi1mEmBgyM0rKQpyd1KIiIxSYL/DwMggycDMoMlgmZhcXOAYEODDgBN8uwZUDQSXdUFm4VaHFXClpBYnA+k/QByXXFBUwsDAGANkc5eXFIDYGUC2SFI2mF0DYhcBHQhkTwCx0yHsJWA1EPYOsJqQIGcg+wyQ7ZCOxE5CYkPtBQHmZCMSXU0EKEmtKAHRnhEMDKAwhYgiwgohxiwGxMYMDExLEGL5ixgYLL4CxScgxJJmMjBsb2VgkLiFEFNZwMDA38LAsO18cmlRGdRqKSA+zXiSOZl1Ekc29zcBe9FAaRPFj5oTjCSsJ7mxBpbHvs0uqGLt3DirZk3m/trLh18a/P8PAO6TU5auG/2zAAABTVBMVEXT09PR0dAPCAgUCgsxIh8aERHGxsnV1dPPz88gFBRKNSfMzM/Ly8wlGBc4KCU0JiM4JRw7KyglGRpJODFBLSFWPCs/LyrNzc0YDQw1IRYvHhXRzM8DAQHPz9IkFQxNNyxROitHMSEqGhAsHyDIyMumbgQqHBpSNydXPzBENC4+KyRaSD3Oys+UYgZkWltxWEhmSjkfEAg8KBZFMSZKOjVTPS9dRTW0eQRmV1BeTEG7urtzZFwIBARtTTihawVfV1mJWgZcUVBiSDjCwcWrcwRPPjWWlJdyUT1gRDG4sadXVmJjTj93eYh+fYNrVkV8WEB1TwxBKRpAKR1GLw9lUEVoSBGvdgRwa2pfYXBsXVapqKtURT6AgY5vcoNEQkWPgF+jk3CTfXN2URNVPBJ7a2Z2YVVROhRJSVZtYV6IkaeYaxSZbyK1rZqIZCSfn6DFU9V1AAACBklEQVQozz3OVXPiABSG4ZOQQNy9EEIgIbh7BS/SUqcu677//3LT7kzf22fONwfi8V0UjaC4SLI4K/osGYmghm0blGu4aA3+c0TiSJ9Miyzrh467rk1ZNdOowUU8HokYOK+RvpTm2G83PImTlmU3TLtes+HUjqMGzmoaK0lpTFr9OOJJ0qy7lICnXBOGH9FdnMSa1+Vy+aA8Gh0/PD7d93pWyJRpQml4tWuQYjf6VobR+0ePd4QutwQ2VT+Dklf6iuK5bjQTnUQZRteJydHNnGi289a5eQb73vRnHdW6GYahM3SoCKM/rI7lal7Inqdgf7rd/qphXYam6QxBEAjCADJfHYwVKktlwZt2OtM/wi1NJBI0gugMkwCAu4Oy3FLVkLedzv4V1X3uJ+jX3+hEAmJI7HL0/ZJSVfC80vBCcQbz5z7QSHgINEAsVhnffq4sFuANTy2s1R48TV6W8F6sUk1+qeztQekTi+UKm8HxX+Tl97uG7Iyrh4dQlzBu1lsP+teMvmSQ13kkbF1NjvdOTkDI86JcKGwKOC9yeS6pOi1KUZygHfLhB+ByYsj3m0KaFXmNTzqqoyhKthU0gkF/B3hN1OTZbD3DcA5rYJQTJAUhpQZUc14s7gDGc1pOlnvNNI6l835DXTQES0kF5UnxjTlOzMm5kCVf8tm82m4oriUkR6EWl/8AbvtQDCiguKcAAAAASUVORK5CYII=",
      "sizes": "(max-width: 650px) 100vw, 650px",
      "src": "https://res.cloudinary.com/ajovcloud/image/upload/f_auto,q_auto/v1593821233/raedal-blog/graphql_interfaces_5",
      "srcSet": "https://res.cloudinary.com/ajovcloud/image/upload/w_200,f_auto,q_auto/v1593821233/raedal-blog/graphql_interfaces_5 200w,https://res.cloudinary.com/ajovcloud/image/upload/w_590,f_auto,q_auto/v1593821233/raedal-blog/graphql_interfaces_5 590w,https://res.cloudinary.com/ajovcloud/image/upload/w_650,f_auto,q_auto/v1593821233/raedal-blog/graphql_interfaces_5 650w"
    }
  }
}
```

**JA CU USTVARI PRAVITI RESOLVER SAMO ZA FLUIDN-U VREDNOST**

**MOZDA I NEMA POTREBE PRAVITI RESOLVER, VEC QUERY-OVATI OVO PRI KREIRANJU PAGE-OVA I PROSLEDITI U CONTEXT PAGE**

DA, TAK OCU URADITI

POSTARAJ SE DA UVEK PROSLEDIS DATA, MA BIO TO PRAZAN NIZ

**DAKLE DOSLO JE DO PROMENE PLANA JER CU JA USTVARI PRAVITI QUERY ZA CLOUDINARY ASSET-OVIMA; ONDA KADA PRAVIM QUERY ZA KREIRANJE BLOG POST STRANICA**

ALI I DALJE MORAM HANDLE-OVATI DATA IZ FRONTEND MATTER-A

# :three: ODNOSNO MORAM DEFINISATI DEFAULT, KADA KORISNIK NIJE PROSLEDIO `cloudImagesArrayName` U FRONTMATTER-U

TO SAM [DEFINISAO OVDE](packages/gatsby-theme-raedal/utility/utility-site-metadata.js) ZA POMENUTI PROPERTI FRONTMATTER-A

# :four: TREBAS ZADATI NOVI FIELD NA `BlogPostPage` TYPE-U, I MOZE SE ZVATI ISTO KAO I POMENUTI PROPERTI FRONTMATTER-A

TREBA DA BUDE TYPED KAO `String` NARAVNO

# :five: E SADA TREBAS HANDLE-OVATI KREIRANJE NODE-OVA, ODNONO TREBAS OVAJ FIELD PROSLEDITI PRI POSTOJECEM KREIRANJU BlogPostPage NODE-OVA

# :six: KADA SI TO URADIO MOZES PRI KREIRANJU BLOG POST PAGE-OVA, ODNONO PRE KREIRANJA, DA QUERY-UJES I ZA CLOUDINARY ASSETS

**OVO MOZES POGLEDATI KAKO SAM URADIO**

ISKORISTIO SAM VEC POSTOJECI QUERY, (ODNONO PROMISE KOJI JE TADA NASTAO) ZA ONIM HEADINGSIMA, PA SAM USTVARI U then-OV CALLBACK NACINIO ASYNC FUNKCIJOM, TAK ODA SAM MOGAO KORISTITI await I TAKO DA SAM MOGAO DA NA NAJLAKSI NACIN PROSLEDIM DATA U CONTEXT STRANICE

EVO TI TACNO KAKAV SAM QUERY NAPRAVIO

```js
// OVO JE U OBIMU then-OVOG CALLBACK-A, KOJEG SAM UCINIO async FUNKCIJOM

let cloudinaryAssets;
          // NECU DA RUNN-UJEM QUERY AKO SEARCH PARAMETAR JESTE PRAZAN STRING
if (!cloudImagesArrayName) {
  cloudinaryAssets = { data: { allFile: { nodes: [] } } }; // PRAVIM OVAKVU STRUKTURU, JER CE MI BITI LAKSE DA ISKORITIM VREDNOST
} else {
  cloudinaryAssets = await graphql(
    `
      query CloudImages($reg: String!) {
        allFile(filter: { name: { regex: $reg } }) {
          nodes {
            cloudinary: childCloudinaryAsset {
              fluid {
                aspectRatio
                base64
                sizes
                src
                srcSet
              }
            }
          }
        }
      }
    `,
    // QUERY VARIABLE, KOJA MORA BITI STRING U OBLIKU REGEXP-A
    { reg: `/${cloudImagesArrayName}/` }
  );
}

// === !== ERROR HANDLING === !== ===
if (cloudinaryAssets.errors) {
  reporter.panic(
    "Something went wrong with QUERY FOR CLOUDINARY ASSETS",
    cloudinaryAssets.errors
  );
}
// === !== === !== ===

const cloudinaryArray = cloudinaryAssets.data.allFile.nodes;

if (cloudinaryArray.length) {
  console.log(JSON.stringify(cloudinaryArray, null, 2));
}

```

# :seven: PRI KREIRANJU PAGE, U CONTEXT SAM PROSLEDIO GORNJI NIZ `cloudinaryArray`

DAKLE SADA U CONTEXT-U IMAM PROPERTI KOJI IMA IME cloudinaryArray

SADA BIH MOGAO DA SA FRONTEND CODE-A, DAKLE U BROWSERU STAMPAM OVAJ NIZM, KONKRETNO KADA POSETIM ONAJ PAGE, ZA KOJI SAM DEFINISAO SLIKE


