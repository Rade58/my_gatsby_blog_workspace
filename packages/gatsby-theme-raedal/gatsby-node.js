const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false
//
const withSiteHelmetDefaults = require("./utility/utility-site-metadata"); // HELMET DEFAULTS (ONO STO SE SERVIRA ZA DEFAULT ZA FIELD frontMatter KOJI SAM KREIRAO)
//

const path = require("path");
// SAMO SE KORISTI INSIDE     onPreBootstrap
const fs = require("fs");
const mkdirp = require("mkdirp");

// AKO NE POSTOJI     contentPath    blogposts
// ODNOSNO AKO U SITE FOLDERU NE POSTOJI        blogposts    FOLDER
// KREIRATI GA
exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState(); // PROGRAM IMA INFO O SITE-U, KAO STO
  //                                          JE DIREKTORIJUM   SITE-A
  const { contentPath } = withDefaults(options);
  const dir = path.join(program.directory, contentPath); // DAKEL OVOM SE
  //                                                         APSOLUTNI
  //                                                  DIREKTORIJUM SITE-A

  // AKO NE POSTOJI DIREKTORIJUM KREIRAM GA PO DEFAULTU NA      blogposts

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

// POTREBNO JE DODATI NOVI TYPE
// A TAJ NOVI TYPE TREBA DA IMA FIELD, SA KOJEG CE SE MOCI
// QUERRY-EVATI SVAKI BLOG POST

// NOVI TYPE ISTO TAKO DA IMPLEMENTIRA      Node    TYPE (DA BI SE ZA NJEGA KREIRALI QUERY-JI)

// NEKA SE NOVI TYPE NAZIVA         GroupPage

// (1) NAJAVAZNIJA STVAR KOJU CE ON IMATI NA SEBI JESTE FIELD CIJE CE TYPE BITI
//                            NIZ       BlogPostPage    TYPE-OVA

//            TAJ FIELD SE MOZE ZVATI       blogPostPages

//                                   SAKLE OVAJ NIZ CE BITI NON NULABLE
//                                   JER AKO NEMA     BlogPosPage  -OVA U NIZU
//                                    NEMA POTREBA I DA POSTOJI (ALI OVO JE
// EDGE CASE KOJI NECU NIKAD IMATI, JER NECE PSIOTOJATI GroupPage AKO ZA NJEGA
// NEMA BlogPostPage-OVA)

// (1) A MORAM PROSIRITI I  BlogPostPage TAKO DA ON IMA NA SEBI FIELD
//      KOJI CE BITI TYPED SA         GroupPage
// FIELD SE MOZE ZVATI    groupPage
// NARAVNO OVAJ FIELD MOZE BITI    NULLABLE, DAKLE TREBA DA SME DA BUDE null
// JER NEKI PAGE-OVI NECE IMATI SVOJ RELATED GROUP PAGE

// ***************   ALI STA JOS MOZE BITI NAROCITO KORISNO  *********
//  PA TO DA OBA   TYPE-A    , I    BlogPostPage      I     GroupPage
// IAMJU USTVARI FIELD, KOJI CE OPET BITI ARRAY SA SVIM MOGUCIM
//          GroupPage    -OVIMA
// KOJI MOGU POSTOJATI NA MOM CELOKUPNOM BLOGU, MOM CELOM APP-U

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type BlogPostPage implements Node @dontInfer {
      id: ID!
      title: String!
      path: String!
      updated: Date! @dateformat
      body: String!
      
      frontMatter: MyFrontMatter!

      groupPage: GroupPage

      allPosibleGroupPages: [GroupPage]!

    }

    type MyFrontMatter {
      title: String!
      lang: String!
      description: String!
      themeColor: String!
    }

    type GroupPage implements Node @dontInfer {

      name: String!
      path: String!

      blogPostPages: [BlogPostPage!]!


      allPosibleGroupPages: [GroupPage!]!


    }



  `);
};

// DAKLE POSTO GORNJI NOVI TYPE IMPLEMENTIRA      Node
// TO ZNACI DA CE BITI KRIRANA DVA NOVA QUERY-JA U GRAPHQL LAYERU
// STO MOZES ODMAH I PROVERITI U PLAYGROUND-U ILI     Graphiql

// NOVI QUERY-JI BI TREBALO DA SE ZOVU    allGroupPage      I
// groupPage

// === ~~ === ~~ ===

// DAKLE SLEDECI HOOK SE IZVRSVA NA SVAKI CREATION         Node-A
// ------ SECAM SE OVAKVOG POREDKA  -----------------------------------
//              gatsby-source-filesystem    JE NAPRAVIO ODREDJENE NODE-OVE
//   ZATIM      gatsby-plugin-mdx         JE NAPRAVIO ODREDJENE NODE-OVE
// DOBRO, A sourceInstaceName POTICE OD MOG PLUGINA       gatsby-plugin-raedal

const posibleGroupPageNames = []; // IDEJA JE DA U OVAJ NIZ STAVLJAM IMENA

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  if (!node.parent) return; // OVO JE I DALJE OK

  const parentNode = getNode(node.parent);

  // AKO NIJE LOADED BY MY THEME, NI TAJ MI NE TREBA
  if (parentNode.sourceInstanceName !== "gatsby-theme-raedal") return;

  const { basePath } = withDefaults(options); // PO DEFAULT-U     /  OVDE NISAM NISTA DODATNO DODAVAO STO SE TICE DEFAULT-OVA (MOZES DA POGLEDAS FAJL FUNKCIJE KOJA PRAVI DEFAULT-OVE)

  const { name, modifiedTime, relativeDirectory } = parentNode; // RELATIVAN
  //                                                DIREKTORIJUM U ODNOSU NA
  //                                                 FOLDER U KOJEM JE SAV
  //                                                CONTENT, KOJI LOAD-UJES
  //                                                  SA TVOJOM TEMOM
  // ODNOSNO TO BI TREBALO DA JE RELATIVNO NA      sites/blog/blogposts     (U SLUCAJU blog SITE-A)

  const id = createNodeId(`BlogPostPage-${node.id}`);

  const { contentDigest } = node.internal;
  const { title } = node.frontmatter || name;

  // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==

  /* console.log(
    "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
  ); */
  /* console.log(
    "=== !== === !== === !== === !== === !== !== === !== === !== === !== === !== === !==="
  ); */

  const pageName = name !== "index" ? name : "";

  // DODAJEM SLUG SUPPORT ODNOSNO SVE STO IMA slug U FRONTMATTER-U slug
  // BI TREBALO DA BUDE PATH

  let slug;
  if (node.frontmatter.slug) slug = `/${node.frontmatter.slug}`;

  //  SITE METADATA (ODNONO ONO STO CE KONZUMIRATI Helemet)
  // OVDE SAM,
  // UPRAVO DODAO I DEFAULT ZA        group     FIELD
  const { lang, themeColor, description, group } = withSiteHelmetDefaults(
    node.frontmatter
  );
  // E KAKO JA MOGU DA ISKORISTIM       group       INFO
  //    MORAM GA ISKORISTITI ZA      FIELD NA  BlogPostPage  NODE TYPE-U
  // TO JE, SASVIM JASNO

  // ALI JA ZELI MDA KREIRAM NOVI NODE ALI OVAJ NODE, JA KREIRAM SAMO JEDANPUT

  actions.createNode({
    // CAK I OVA FUNKCIJA TRIGGER-UJE HOOK U CIJEM SAM OBIMU
    id,
    title,
    updated: modifiedTime,
    parent: node.id,
    // OVO JE PATH KOJI CES KORISTITI U ADRESS BAR-U, DA SE RENDERUJE, PAGE
    // A TO SAMO KREIRANJE PAGE-A, CES DEFINISATI DOLE U HOOK-U
    // createPages
    // SERVIRAM slug AKO GA JE KORISNIK OBEZBEDIO
    path: slug || path.resolve("/", basePath, relativeDirectory, pageName),
    internal: {
      type: "BlogPostPage",
      contentDigest,
    },

    frontMatter: {
      // TITLE IMAM NA DVA MESTA, NIJE NI BITNO
      title,
      lang,
      description,
      themeColor,
    },
  });
};

// KREIRANJE RESOLVER ZA body FIELD

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    BlogPostPage: {
      body: {
        type: "String!",
        resolve: (source, arguments, context, info) => {
          // U SUSTINI NA source JESTE PARENT NODE , A TO JE NODE KOJI JE
          // LOADED SA gatsby-plugin-mdx

          // E PA SA NJEGA CITAS body FIELD   I DAJES GA BODY-JU      BlogPostPage
          // NODE-A

          const mdxType = info.schema.getType("Mdx");

          /*  console.log(
            "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
          ); */
          // const headingsBlah = info.schema.getType("MdxHeadingMdx").getFields();

          // console.log(JSON.stringify(headingsBlah, null, 2));
          // console.log(headingsBlah.headings);
          /* console.log(
            "=== !== === !== === !== === !== === !== !== === !== === !== === !== === !== === !==="
          ); */

          const mdxFields = mdxType.getFields();

          const bodyResolver = mdxFields.body.resolve;

          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });

          return bodyResolver(mdxNode, arguments, context, {
            fieldName: "body",
          });

          // A STA JE TAJ body KOJI JE UZET SA NODEA-A, KOJI JE Mdx TYPE-A?
          // PA TO JE STRINGIFIED FUNKCIJA NAMENJENE        MDXRenderer
          // KOMPONENTI, (DAKLE KADA QUERY-UJEM body STAVLJAM GA U TU
          // KOMPONENTU )
        },
      },
    },
  });
};

// SADA SE MOZE DEFINISATI KREIRANJE SAMIH STRANICA
// ASYNC FUNKCIJA

// NARAVNO, PRE NEGO STO POCNES DA DEFINISES KREIRANJE PAGE-A, ODNONO PAGE-OVA
// TREBALO BI DA OBEZBEDIS      TEMPLATE KOMPONENTU

// KAKAV JE OBRAZAC:

// U OBIMU, SLEDECEG HOOK-A QUERY-UJES ZA SVIM      BlogPostPage-OVIMA
// I TU SAMO UZIMAS     id        I UZIMAS      path   (PATH PREDSTAVLJA ROUTE
//                                                    GDE PAGE TREBA BITI
//                                                     RENDERED)

exports.createPages = async ({ actions, graphql, reporter }) => {
  // POSTO SAM PRAVIO MULTIPLE QUERIES MORAO SAM DA UPOTREBIM
  // Promise.all

  //  //   SADA DA OBJASNIM STA SAM URADIO  /////

  // OD RANIJE ZNAM DA JE PARENT NODE MOM     BlogPostPage-U
  // USTVARI    Mdx
  // I JA MOGU UZETI PARNT-OV ID
  // I NA OSNOVU PARENT-OVOG ID-JA JA BIH EXEQUETE-OVAO

  // I ONO STA NISI ZNAO OD RANIJE JESTE DA MOZES PROSLEDJIVATI
  // VARIJABLE OVIM QUERY-JIMA (TAKO DA CU SADA QIERY-EVATI ZA HEADINGSIMA, NA
  // OSNOVU ID-JA PARENT-A  BlogPostPage-A)

  // DAKLE OVAJ ID OSTAJE ISTI SAMO STO PORED SVEG OSTALOG QUERY-UJEM ZA
  //    id    -JEM    NODE-A, KOJEI JE PARENT NODE

  // TO JE ZATO STO CU KASNIJE NA OSNOVU TOG id-JA JA USTVARI PRAVITI
  // QUERY ZA HEADINGSIMA

  const result = await graphql(`
    query MyPages {
      pages: allBlogPostPage {
        nodes {
          id
          path

          parent {
            id
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(
      "Something went wrong with QUERY FOR ALL OF YOUR BLOG POSTS",
      result.errors
    );
  }

  const blogPostIdsAndPaths = result.data.pages.nodes;

  // ODLUCIO SAM DA UMESTO forEach OVDE KORISTIM ASYNC ITERATOR
  // JER CU PRAVITI NOVE QUERY-JE, A KAO STO ZNAS ON ISU OVDE ASINHRONI

  const arrayOfPromises = [];

  for (let blogPost of blogPostIdsAndPaths) {
    const parentId = blogPost.parent.id;

    // console.log({ parentId });
    const { id, path } = blogPost;

    arrayOfPromises.push(
      new Promise((res, rej) => {
        graphql(
          `
            query GetIdAndHeadings($id: String!) {
              mdx(id: { eq: $id }) {
                headings(depth: h2) {
                  value
                  depth
                }
              }
            }
          `,
          { id: parentId } // EVO OVDE SAM PROSLEDIO QUERY VARIJABLU
        ).then((queryResult) => {
          // ZNAS DA RESULTAT GRAPHQL QUERY-JA, UVEK POSTOJI
          // DAKLE ERROR INSTANCA NIKADA NIJE THROWN

          // ALI AKO POSTOJI    error     PROPERTI
          // TO ZNACI DA QUERY NIJE BIO USPESAN

          if (queryResult.error) {
            reporter.panic(
              "Couldnt get headings for the current page",
              queryResult.error
            );
          }

          actions.createPage({
            context: {
              id,
              headings: queryResult.data.mdx.headings,
              // path MOZE BITI CONFLICTING NAME
              // ZATO SAM IZBRAO DA
              // (A OVO MI JE POTREBNO ZA LINK TAG
              // KOD LINKED HEADERS-A)
              relativeLink: path,
            },
            path,
            // component: componentPath,
            component: require.resolve(
              "./src/templates/blog-post-template.tsx"
            ),
          });

          res();
        });
      })
    );
  }

  return Promise.all(arrayOfPromises);
};
