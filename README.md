# SADA CU DA ODRADIM NEKA STILIZOVANJA, SA POSEBNIM AKCENTOM NA SHADOWS, JER MORAM UCINITI DA ONE IZGLEDAJU BOLJE

MOZES SADA COMMENT-OVATI OUT CODE VEZAN ZA CLOUDINARY (FAJL `packages/gatsby-theme-raedal/gatsby-config.js`), DA IMAS BRZI BUILD

***

ALI NISTA TI NE PREOSTAJE, SEM DA COMMENT-UJES OUT CODE U GATSBY NODE FAJLU, JER OCIGLEDNO, NE SMES IMATI LOS QUERY

KADA TO KAZEM NE MISLIM NA data.errors JER TO MOZES HANDLE-OVATI

**NA PRIMER NISAM MOGA OHANDLE-OVATI PRAVLJENJE QUERY-J ZA CLOUDINARY QUERY-JEM, ONDA KADA CLOUDINARY NIJE PRISUTAN**

TAKO DA TAJ DEO CODE BI TREBALO DA UCINIM STO JE MOGUCE UCAURENIJIM PA DA GA LAKSE PALIM I GASIM PO POTREBI

USPEO SAM I SAMO JE POTREBNO **ODCOMMENT**-OVATI SLEDECU USLOVNU IZJAVU U `packages/gatsby-theme-raedal/gatsby-node.js`

```js
// OVO SE NALAZI U createPages HOOK-U

/* if (!cloudImagesArrayName) {
  cloudinaryAssets = { data: { allFile: { nodes: [] } } }; // PRAVIM OVAKVU STRUKTURU, JER CE MI BITI LAKSE DA ISKORITIM VREDNOST
} else {
  cloudinaryAssets = await graphql(
    `
      query CloudImages($reg: String!) {
        allFile(filter: { name: { regex: $reg } }) {
          nodes {
            cloudinary: childCloudinaryAsset {
              fluid(maxWidth: 1880) {
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
 */

```

**I NAJVECA STVAR JE DA DEINSTALIRAS TRANSFORMER-A**

- `yarn workspace gatsby-theme-raedal remove gatsby-transformer-cloudinary`

***

SADA MZOES DA SE VRATIS DEVELOPMENTU BEZ CLOUDINARY-JA
