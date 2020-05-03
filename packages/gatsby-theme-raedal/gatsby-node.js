const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false
//
const withSiteHelmetDefaults = require("./utility/utility-site-metadata"); // HELMET DEFAULTS (ONO STO SE SERVIRA ZA DEFAULT ZA FIELD frontMatter KOJI SAM KREIRAO) (DODAO SAM U FUNKCIJU I DEFAULTOVE ZA    group    I   groupColor     )
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
      
      allBlogKeywords: [GroupNameAndPath!]!

    }

    type MyFrontMatter {
      title: String!
      lang: String!
      description: String!
      themeColor: String!
    }

    type GroupPage implements Node @dontInfer {

      id: ID!

      name: String!
      path: String!

      groupColor: String!

      updated: Date! @dateformat

      blogPostPages: [BlogPostPage]!


      allBlogKeywords: [GroupNameAndPath!]!

    }


    type GroupNameAndPath {
      keyword: String!
      path: String!
    }

  `);
};
// ************************
// MOZE BITI DA SU GORNJI      allBlogKeywords      FIELD-OVI, NA
// OBA TYPE-A, ODNONO NODE-A, IPAK VISAK
// ************************

// STA MOGU NASLUTITI POSTO SAM KRIRAO, PO DVA, TAKORECI KOMPLEKSIJA FIELDA
// NA DVA TYPE-A

//  BlogPostPage    SADA IMA FIELD-OVE   groupPage: GroupPage
//                                      allPosibleGroupPages: [GroupPage]!

// I OBADVA CE IZISKIVATI     RESOLVERE
// I ISTO VAZI I ZA       blogPostPages: [BlogPostPage!]!
//                        allPosibleGroupPages: [GroupPage!]!
//   NA     GroupPage-U

// I ONI IZISKUJU RESOLVER-E

//      CISTO, JOS INFORMATIVNO DA TI NAPOMENEM
// DAKLE POSTO GORNJI NOVI TYPE IMPLEMENTIRA      Node
// TO ZNACI DA CE BITI KRIRANA DVA NOVA QUERY-JA U GRAPHQL LAYERU
// STO MOZES ODMAH I PROVERITI U PLAYGROUND-U ILI     Graphiql

// NOVI QUERY-JI BI TREBALO DA SE ZOVU    allGroupPage      I
// groupPage

// === ~~ === ~~ ===

// DAKLE SLEDECI HOOK SE IZVRSVA NA SVAKI CREATION         Node-A
// I KADA KREIRAS NOVE NODE-OVE U OBIMU TOG HOOK-A (I TO OPET TRIGGER-UJE POMENUTI HOOK)
// ------ SECAM SE OVAKVOG POREDKA  -----------------------------------
//              gatsby-source-filesystem    JE NAPRAVIO ODREDJENE NODE-OVE
//   ZATIM      gatsby-plugin-mdx         JE NAPRAVIO ODREDJENE NODE-OVE
// DOBRO, A sourceInstaceName POTICE OD MOG PLUGINA       gatsby-plugin-raedal

const groupPagesNamesAndIds = {}; // IDEJA JE DA U OVAJ OBJEKAT STAVLJAM
//                                  GROUP NAME - ID PAROVE

// SVI HELPERI SU OVDE OBJASNJENI:     https://www.gatsbyjs.org/docs/node-api-helpers/#createContentDigest
exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  options
) => {
  // OVOG PUTA SAM IZ GORNJEG PRVOG ARGUMENTA IZDVOIO, JOS JEDAN HELPER
  // A TO JE HELPER ZA KREIRANJE CONTENT DIGEST-A
  // TREBA MI JER ZELIM DA KREIRAM TAJ NOVI DIGEST ZA SVAKI OD NOVIH
  // NODE-OVA KOJE CU KREIRATI (OVO SLUZI ZA CACHING, SAMO NAPOMINJEM)

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
  const id = createNodeId(`BlogPostPage-${node.id}`); // OVO JE ID ZA
  //                                          BlogPostPage    NODE

  const { contentDigest } = node.internal;
  const { title } = node.frontmatter || name;

  const pageName = name !== "index" ? name : "";

  // DODAJEM SLUG SUPPORT ODNOSNO SVE STO IMA slug U FRONTMATTER-U slug
  // BI TREBALO DA BUDE PATH

  let slug;
  if (node.frontmatter.slug) slug = `/${node.frontmatter.slug}`;

  //  SITE METADATA (ODNONO ONO STO CE KONZUMIRATI Helemet)
  // OVDE SAM,
  // UPRAVO DODAO I DEFAULT ZA        group     FIELD
  const {
    lang,
    themeColor,
    description,
    group, // OVO JE VEZANO ZA GROUP PAGE
    groupColor, // KAO I OVO
  } = withSiteHelmetDefaults(node.frontmatter);
  // E KAKO JA MOGU DA ISKORISTIM       group       INFO
  //    MORAM GA ISKORISTITI ZA      FIELD NA  BlogPostPage  NODE TYPE-U
  // TO JE, SASVIM JASNO

  // ALI JA ZELIM DA KREIRAM NOVI NODE ALI OVAJ NODE, JA KREIRAM SAMO JEDANPUT

  // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==

  // DAKLE MORA SE PRAVITI NODE

  // SVAKI PUT PROVERAVAS DA LI NIZ CONTAIN-UJE    group
  // AKO CONTAIN-UJE NE PRAVIS NODE
  // IDEJA JE  NAPRAVI NODE I STAVI       group     U     NIZ

  // console.log("=== !== === !== === !== === !== === !== === !== === !== === !== === !== ===");
  // console.log(group, groupColor);
  // console.log(JSON.stringify(node.frontmatter, null, 2));
  // console.log(JSON.stringify(groupPagesNamesAndIds, null, 2));
  // console.log("=== !== === !== === !== === !== === !== !== === !== === !== === !== === !== === !===");

  // JA MOGU DODATI ODREDJENE PROPERTIJE, KOJI SE TICU
  // RELATED      GroupPage-A

  // I TO NAJBOLJE D IH ISKALKULISEM OVDE (JASNO TIO JE DA groupPage FIELD SME
  // BITI null)

  // EVO OVO JE OBJEKAT, KOJI TREBA DA SE DODAJE KAO VREDNOST blogPost FIELD-A
  // NA BlogPostPage NODE-U (I KADA MALO BOLJE RAZMISLIS OVO TI NEKAKO SUZAVA, ILI NAZIRES PRICU ZA STA CES SVE MORATI DA DEFINISES RESOLVER)

  let groupPageObject;

  // OVIM SLEDECIM USTVARI REGULISAM DA L ICE SE KREIRATI NOVI ID ILI NE

  if (!groupPagesNamesAndIds[group] && group) {
    // group NE SME BITI null (POSTOJI MOGUCNOST DA SE null UZME KAO PROPERTI KADA KORISTIS [] NOTATION PRI ASSIGNMENTU PROPERTIJA)

    const groupPageId = createNodeId(`GroupPage-${node.id}`);

    groupPagesNamesAndIds[group] = { groupPageId };

    // moram kolektovati i id-jeve BlogPostPage-OVA

    if (!groupPagesNamesAndIds[group]["blogPages"]) {
      groupPagesNamesAndIds[group].blogPages = [];
    }

    groupPagesNamesAndIds[group].blogPages.push(id);

    // === !== === !== === !== === !==
    // U OBIMU OVE IZJAVE JA BIH USTVARI TREBAO DA KREIRAM NOVI Node
    // ODNONO NOVI    GroupPage   NODE  (JER OVDE ZNAM DA OVDE IMAS
    //  group     SA NOVOM VREDNOSCU   )

    // !======================================!   VAZNO
    // OVAJ PUT KREIRAM POTPUNO NOVI          contentDigest (TO SLUZI ZA
    // CACHING)
    // ZA TO IMAM FUNKCIJU    createContentDigest
    // TREBALO BI DA JE NAHRANIM SA STRINGOM ILI OBJEKTOM, KOJI IMA INFO
    // SVOJSTVEN ZA TRENUTNO PRAVLJENI NODE
    const currentGroupPageContentDigest = createContentDigest({
      group,
      groupPageId, // ZADAO OBJEKAT SA TRENUTNIM group STRINGOM I ID-JEM TRENUTNOG GROUP-A
    });

    // MISLIM DA SADA IMAM SVE STO JE POTREBNO ZA KREIRANJE NOVOG NODE-A
    actions.createNode({
      id: groupPageId,
      name: group,
      path: "/" + group,
      groupColor,
      // STAVICU I UPDATED PA CU VIDETI (IAKO NISAM SIGURAN DA CE OVO BITI
      // UPDATED AKO SE DODA ILI (OSTAJE TI DA QUERY-UJES I VIDIS DA L ICE TI
      // DATI PRAVI INFO))
      updated: modifiedTime, // MISLI MDA OVO SAMO POKAZUJE VREME ZA KREIRANI
      //                       ILI UPDATE-OVANI MDX FAJL, KOJI SE TRENUTNO
      //                                        KREIRA, U ISTOM NAVRATU KAD SE
      //                                        KREIRA OVA GroupPage INSTANCA
      //    parent-A   STVARNO NEMA
      // I NEMA SMISLA BILO STA STAVLJATI ZA PARENT-A
      internal: {
        type: "GroupPage",
        contentDigest: currentGroupPageContentDigest,
      },

      // ALI STA JE SADA OVDE PROBLEMATICNO, PA PROBLEMATICNO JE TO STO NEMAM
      //      blogPostsPages         FIELD, KOJI TREBA DA IMA ARRAY
      //                                      BlogPostPage-OVA

      // I DEFINITIVNO ZA NJEGA JA MORAM NAPISATI RESOLVER (I TO CE BITI PRVI
      // RESOLVER KOJI CU NAPISATI U OVOM STADIJUMU PROJEKTA)
    });
    // A BILO KOJI FIELD, KOJI SAM ZAOSTAO DA DEFINISEM ZA OVAJ GroupPage  NODE
    // JER NIJE BILO MOGUCE
    // ILI, DOLE ZA ODREDJENI FIELD   BlogPostPage-A  NODE-A
    // DEFINISACU UZ POMOC RESOLVER-A

    // MOZES DA NASTAVIS SA DEFINISANJEM ONOGA CIME CE BITI NAHRANJEN
    // groupPage      FIELD       BlogPostPage

    groupPageObject = {
      id: groupPageId, // MOZDA OVE NISAM OVAKO TREBAO RADITI (VEC
      //NEKI RANDOM BROJ ZATO STO NEMAM NEKU
      // RELACIJU  JEDAN Mdx NASPRAM JEDNOG
      // GroupPage ID-JA )
      name: group,
      path: "/" + group,
      groupColor,
      updated: modifiedTime,
    };

    /* if (!groupPagesNamesAndIds[group]["blogPages"]) {
      groupPagesNamesAndIds[group].blogPages = [];
    }

    groupPagesNamesAndIds[group].blogPages.push(id); */

    // === !== === !== === !== === !==
  } else if (group) {
    if (!groupPagesNamesAndIds[group]["blogPages"]) {
      groupPagesNamesAndIds[group].blogPages = [];
    }

    groupPagesNamesAndIds[group].blogPages.push(id);

    groupPageObject = {
      id: groupPagesNamesAndIds[group].groupPageId,
      name: group,
      path: "/" + group,
      groupColor,
    };
  }

  const groupPage = !group ? null : groupPageObject;

  actions.createNode({
    // CAK I OVA FUNKCIJA TRIGGER-UJE HOOK U CIJEM SAM OBIMU (INFO OD RANIJE)
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

    // EVO GA, PRVO KREIRAM SVE ONO STO MOGU OBEZBEDITI A TICE SE GROUP PAGE-A
    groupPage,
    // ALI IPAK BEZ OBZIRA STA SAM OBEZBEDIO, JA CU PRAVITI RESOLVER-A ZA OVAJ
    // FIELD
  });
};

// KREIRANJE RESOLVER ZA body FIELD

//  SADA CU KREIRATI RESOLVER-A I ZA      groupPage     FIELD NA    BlogPostPage
//                                                                      TYPE-U

exports.createResolvers = ({ createResolvers }) => {
  /*  console.log(
    "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
  );
  console.log(groupPagesNamesAndIds);
  console.log(
    "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
  ); */

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

        // POSTO ISTI FIELD POSTOJI I NA GroupPage TYPE-U
        // DAO SAM KOD NJEGA OBJASNJENJE
      },

      allBlogKeywords: {
        type: "[GroupNameAndPath!]!",

        resolve: () => {
          let pathAndNameArray = [];

          /*
          groupPageId
          blogPages
          */

          console.log(
            "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
          );

          console.log(JSON.stringify(groupPagesNamesAndIds, null, 2));

          console.log(
            "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
          );

          const groupKeys = Object.keys(groupPagesNamesAndIds);

          for (let member of groupKeys) {
            pathAndNameArray.push({ keyword: member, path: "/" + member });
          }

          return pathAndNameArray;
        },
      },
    },
    // EVO DEFINISEM RESOLVER ZA     blogPostPages   FIELD NA      GroupPage    TYPE-U
    GroupPage: {
      blogPostPages: {
        type: "[BlogPostPage]!",
        resolve: (source, arguments, context, info) => {
          const blogPostType = info.schema.getType("BlogPostPage");

          const blogPostFields = blogPostType.getFields();

          // PA POTREBNO JE UZETI SVE NODE-OVE

          return [];
        },
      },

      // KREIRANJE RESOLVER-A ZA      allBlogKeywords
      // JE LAKSE JER SAM JA SVE TE VREDNSOTI STAVIO U NIZ (SECAS SE?)
      // groupPagesNamesAndIds (ON JE U GLOBALNOM OBIMU IZVAN BILO KOG HOOK-A)
      // DAKLE DOSTUPAN TOKOM BUILDA

      allBlogKeywords: {
        type: "[GroupNameAndPath!]!",

        resolve: () => {
          let pathAndNameArray = [];

          const groupKeys = Object.keys(groupPagesNamesAndIds);

          for (let member of groupKeys) {
            pathAndNameArray.push({ keyword: member, path: "/" + member });
          }

          return pathAndNameArray;
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
