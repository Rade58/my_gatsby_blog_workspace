const mkdirp = require("mkdirp");
const pathPackage = require("path");
const fs = require("fs");
// UVOZIM NOVI KAKET, KOJI CU KORISTITI PRI DEFINISANJU FIELD EXTENSION-A
const { format: formatDate, parseISO } = require("date-fns");
// MOZES KORISTITI RUNKIT I DOKUMENTE, DA SAZNAS KAKAV SVE DATUM MOZES KONSTUISATI SA POMENUTIM PAKETOM
//    https://date-fns.org/v2.13.0/docs/format

const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false
//                A DODAO SAM I NOVI DEFAULT ZA     groupsPath  -->    "grouppages"
//
const withSiteHelmetDefaults = require("./utility/utility-site-metadata"); // HELMET DEFAULTS (ONO STO SE SERVIRA ZA DEFAULT ZA FIELD frontMatter KOJI SAM KREIRAO) (DODAO SAM U FUNKCIJU I DEFAULTOVE ZA    group    I   groupColor     )
//

exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();

  // DAKLE SADA IZDVAJAM I      groupsPath
  // I ZELIM DA SE NA NIVOU SITE-A KREIRA     FOLDER AKO GA NEMA

  const { contentPath, groupsPath } = withDefaults(options);

  const blogDir = pathPackage.join(program.directory, contentPath); // DAKEL OVOM SE
  //                                                         APSOLUTNI
  //                                                  DIREKTORIJUM SITE-A

  // PRAVIM NOVI ABSOLUTNI PATH, OVAJ PUT ZA FOLDER ZA GROUP PAGE MDXES

  const groupsDir = pathPackage.join(program.directory, groupsPath);

  // OVO SAM RANIJE RADIO
  if (!fs.existsSync(blogDir)) {
    mkdirp.sync(blogDir);
  }

  // SAD RADIM ISTO, SAMO ZA PREDHODNI PATH
  if (!fs.existsSync(groupsDir)) {
    // DAKLE KREIRAM FOLDER AKO GA NEMA
    mkdirp.sync(groupsDir);
  }
};

// ZELIM DAKLE DA DEFINISEM DIREKTIVU  ,      NEKA SE ZOVE        datefns

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions;

  // KREIRAO SAM DIREKTIVU (EXTENSION), ALI NA KRAJU SAM DEPRECATE-OVAO FIELD-OVE GDE JE KORISTIM
  // ZATO STO date-fns NESTO NE RADI BAS DOBRO
  createFieldExtension({
    name: "formateDateFns",
    args: {
      MMMMwoyyyy: {
        type: "Boolean!",
        defaultValue: true,
      },
      eeeeMMMMwoyyyy: {
        type: "Boolean!",
        defaultValue: true,
      },
    },
    // E MORAM PISATI I NESTO STO SE ZOVE extend FUNKCIJA
    extend(options, prevFieldConfig) {
      return {
        args: {
          MMMMDoyyyy: "Boolean",
          eeeeMMMMDoyyyy: "Boolean",
        },
        // PISEM I RESOLVER-A
        resolve(source, args, context, info) {
          const { defaultFieldResolver } = context; //

          const fieldValue = defaultFieldResolver(source, args, context, info);
          // OVO GORE MOZDA NECE TREBATI

          // console.log(fieldValue);

          if (args.MMMMDoyyyy) {
            return formatDate(parseISO(fieldValue), "MMMM, Do, yyyy");
          }

          if (args.eeeeMMMMDoyyyy) {
            return formatDate(parseISO(fieldValue), "eeee, MMMM, Do, yyyy");
          }

          return fieldValue;
        },
      };
    },
  });

  // EVO DODAO SAM I NOVI FIELD GDE KORISTIM EXTENSION, ODNONO DIREKTIVU
  // I TO JE KORISTIM NA DVA MESTA, ODNONO NA DVA FIELDA, U DVA RAZLICITA TYPE-A

  createTypes(`
    type BlogPostPage implements Node @dontInfer {
      id: ID!
      title: String!
      path: String!
      updated: Date! @dateformat

      updatedFns: Date! @formateDateFns @deprecated(reason: "date-fns paket ne radi nesto dobro")

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

      lang: String!

      description: String!


      groupColor: String!

      keywordTextColor: String!

      keywordBorderColor: String!

      updated: Date! @dateformat

      updatedFns: Date! @formateDateFns @deprecated(reason: "date=fns paket ne radi nesto dobro")


      blogPostPages: [BlogPostPage]!


      allBlogKeywords: [GroupNameAndPath!]!

    }


    type GroupNameAndPath {
      keyword: String!
      path: String!
      keywordColor: String!
      keywordTextColor: String!
      keywordBorderColor: String!
    }

  `);
};
// KAO STO VIDIS GORE SAM PROSIRIO      GroupNameAndPathType, DODAJUCI
// keywordColor I keywordTextColor

// EVENTUALLY, VEMO BRZO CU OVO IZBACITI
// OVAJ OBJEKAT NIJE DOBRA STVAR

// MISLIM DA JE OVAJ OBJEKAT POSTAO NO OP ILI DA CE TO POSTATI
// (1) IZ RESOLVERA SAM GA POTPUNO UKLONIO, JER GA ONI VISE NE KORISTE
// (2) JEDINO SE KORISTI PRI KREIRANJU GROUP PAGE-OVA, A TO CE USKORO BITI
//                    UKLONJENO
// CIM GA PODVUCE ESLINT ZNACU DA JE NO-OP
const groupPagesNamesAndIds = {}; // MORACE BITI UKLONJENO JER NEMA NIKAKV
//                                  NACIN DA KORISTI CACHE
//            OVO JE PREDPSOTVKA JER JA JESAM KORISTIO CONTEND DIGEST
//                                   PRI KREIRANJU NODE-OVA ALI NEMA VEZE
//                                SADA CU I ONAKO IAMTI CORRESPONDING MDXES

// SVI HELPERI SU OVDE OBJASNJENI:     https://www.gatsbyjs.org/docs/node-api-helpers/#createContentDigest
exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  options
) => {
  if (!node.parent) return; // OVO JE I DALJE OK

  // OVDE ZELIM DA NAPRAVIM PROVERU O KOJOJ SAM GOVORIO
  // === !== === !== === !== ===
  // if (getNode(node.parent).sourceInstanceName === "group-pages-raedal") {
  // PROVERAVAM DA L ICE SE POJAVITI ONAJ NAME KOJI SAM ZADAO
  // U CONFIGURACIJSKOM FAJLU GATSBY-JA
  // console.log(getNode(node.parent).sourceInstanceName);
  // }
  // === !== === !== === !== ===

  const parentNode = getNode(node.parent);

  // AKO NIJE LOADED BY MY THEME, NI TAJ MI NE TREBA (I TO JE TU BILO OD RANIJE)
  if (parentNode.sourceInstanceName !== "gatsby-theme-raedal") return;
  // A SADA IMAM I DRUGI SOURCE (NAMERNO CU DA NAPRAVIM I DRUGU USLOVNU IZJAVU)
  if (parentNode.sourceInstanceName !== "group-pages-raedal") return;

  // E AL ISADA CU IMATI VISE USLOVNIH IZJAVA
  // ODNOSNO TREBACE MI JEDNA USLOVNA IZJAVA DA HANDLE-UJEM ONO
  // STO DOLAZI OD
  //                                    "gatsby-theme-raedal"

  // I DRUGA ZA ONO STA DOLAZI OD       "group-pages-raedal"
  // ZATO BI OVDE TREBALO DA COMMIT-UJEM

  // OVO OSTAJE ISTO   (   "/""     JE basePath )
  const { basePath } = withDefaults(options); // PO DEFAULT-U

  // I OVO SU ZAJEDNICKE STVARI ZA SVAKI NODE OD
  // MOJE DVE VRSTE NODE-OVA, KOJE ZA SADA HANDLE-UJEM
  const { name, modifiedTime, relativeDirectory } = parentNode;

  // === !== ODAVDE CU DEFINISATI KREIRANJE NODE-OVA !== ===

  // === ===  IZDVAJAM PRVO STVARI KOJE SU ZAJEDNICKE ZA SVAKI NODE === !==
  //      IPAK NE BOLJE JE DA RADIM SVE U USLOVNIM IZJAVAMA

  // === !== === PRVO KREIRAM NODE-OVE ZA BLOG POST PAGE !== === !== ===
  // === !== === ODNOSNO PREMESTAM SVU LOGIKU U OVU USLOVNU IZJAVU!== === !== ===

  if (parentNode.sourceInstanceName === "gatsby-theme-raedal") {
    const id = createNodeId(`BlogPostPage-${node.id}`);

    const { contentDigest } = node.internal;

    const { title } = node.frontmatter || name;

    const pageName = name !== "index" ? name : "";

    let slug;
    if (node.frontmatter.slug) slug = `/${node.frontmatter.slug}`;

    const {
      lang,
      themeColor,
      description,
      group, // OVO JE VEZANO ZA GROUP PAGE
      // ALI OVO JE SADA VISAK I TREBA DA GA HANDLEF-UJE SAMO
      // GROUP NODE, DAKLE ON TREBA DA OBEZBEDJUJE TE PODATKE
      // STO ZNACI DA SLEDECE STVARI NECES VISE UNOSITI KROZ FRONTMATTER
      // BLOG POST MDX-OVA
      /* groupColor,
      keywordTextColor,
      keywordBorderColor, */ // ALI NEKA IH OVDE DA ZNAS STA TEBA DA
      //                            STAVIS U FRONTMATTER GROUP PAGE-A
    } = withSiteHelmetDefaults(node.frontmatter);

    actions.createNode({
      // CAK I OVA FUNKCIJA TRIGGER-UJE HOOK U CIJEM SAM OBIMU (INFO OD RANIJE)
      id,
      title,
      updated: modifiedTime,
      updatedFns: modifiedTime,
      parent: node.id,
      path:
        slug || pathPackage.resolve("/", basePath, relativeDirectory, pageName),
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
      // OVO CE MI BITI BITNO ZA RESOLVER-A
      // NAIME TREBA SAMO DA OBEZBEDIM NAME OF THE GROUP
      groupPage: {
        group, // OVO JE ONAJ GROUP NAME
      },

      // MISLIM DA TI VEC IMAS RESOLVER KOJI UPRAVO UZIMA GORNJI
      // group FIELD I SA NJEGA UZIMA STA MU TREBA DA BI QUERY-EOVAO
      // APROPRIATE GROUP PAGE
    });

    /////////////////////////////////////////////////////////////////
  }

  // === !== ===  KREIRAM NODE-OVE ZA GROUP STRANICE !== === !== ===
  // === !== ===   !== === !== ===

  if (parentNode.sourceInstanceName === "group-pages-raedal") {
    const id = createNodeId(`GroupPage-${node.id}`);

    // IZDVAJAM STA MI TREBA IZ FRONTMATTER-A
    // DAKLE I GROUP PAGES, MDX-OVI IMAJU (ODNONO TREBA DA IAMJU)
    //    group     FIELD SA IMENOM GRUPE

    const {
      group,
      groupColor,
      keywordBorderColor,
      keywordTextColor,
      // NEKA TU BUDU PROPERTIJI I LANG I DESCRIPTION
      lang,
      description,
      // JER SVAKAKO CE MI POMENUTE STVARI TREBA TI ZA
      // SEO
      // ZATO SKOKNI SAD U SDL DA DODAS I OVE TYPE-OVE
    } = withSiteHelmetDefaults(node.frontmatter);

    const { contentDigest } = node.internal;

    // === !== === !== === !== === !==
    // === !== === !== === !== === !==

    // MISLIM DA SADA IMAM SVE STO JE POTREBNO ZA KREIRANJE NOVOG NODE-A
    actions.createNode({
      id,
      name: group,
      path: pathPackage.resolve("/", group.toLowerCase()),
      // DODAJEM I   lang     I   description
      groupColor,
      //
      keywordTextColor,
      keywordBorderColor,
      updated: modifiedTime,
      updatedFns: modifiedTime,
      internal: {
        type: "GroupPage",
        contentDigest,
      },
    });
  }
  // === !== === !== === !== === !==
};

// KREIRANJE RESOLVER ZA body FIELD

//  SADA CU KREIRATI RESOLVER-A I ZA      groupPage     FIELD NA    BlogPostPage
//                                                                      TYPE-U

exports.createResolvers = ({ createResolvers }) => {
  /*  console.log(
    "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
  );
  console.log(
    "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
  ); */

  createResolvers({
    BlogPostPage: {
      body: {
        type: "String!",
        resolve: (source, args, context, info) => {
          const mdxType = info.schema.getType("Mdx");

          /* console.log(
            "=== !== === !== === !== === !== === !== !== === !== === !== === !== === !== === !==="
          ); */

          const mdxFields = mdxType.getFields();

          const bodyResolver = mdxFields.body.resolve;

          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });

          return bodyResolver(mdxNode, args, context, {
            fieldName: "body",
          });
        },
      },

      allBlogKeywords: {
        type: "[GroupNameAndPath!]!",

        resolve: (source, args, context, info) => {
          const arrayOfKeywordObjects = [];

          const allGroupPages = context.nodeModel.getAllNodes({
            type: "GroupPage",
          });

          // eslint-disable-next-line
          for (let groupPage of allGroupPages) {
            arrayOfKeywordObjects.push({
              keyword: groupPage.name,
              path: groupPage.path,
              keywordColor: groupPage.groupColor,
              keywordTextColor: groupPage.keywordTextColor,
              keywordBorderColor: groupPage.keywordBorderColor,
            });
          }

          // === !== === !== === !== === !==

          return arrayOfKeywordObjects;
        },
      },
      // KREIRAM I groupPage RESOLVER
      groupPage: {
        type: "GroupPage",
        resolve: (source, args, context, info) => {
          let groupPageInstance = null;

          if (source.groupPage && source.groupPage.id) {
            const blogPostId = source.groupPage.id;

            groupPageInstance = context.nodeModel.getNodeById({
              id: blogPostId,
            });
          }

          return groupPageInstance;
        },
      },
    },
    // EVO DEFINISEM RESOLVER ZA     blogPostPages   FIELD NA      GroupPage    TYPE-U
    GroupPage: {
      // MORACU DA DODADAM I INPUT TYPE
      // A OVAJ ME ZANIMA:
      //                          BlogPostPageSortInput

      blogPostPages: {
        type: "[BlogPostPage]!",
        // OVDE VRSIM TAJ TYPING INPUT FIELD-OVA
        args: {
          sort: "BlogPostPageSortInput", // (SAMO ZBOG OVOGA DOZVOLJENO TI JE DA NA FILD-U DODAJE S ARGUMENT)
        },
        //
        resolve: async (source, args, context, info) => {
          /* console.log(
            "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
          ); */
          // ONO STA TI TREBA JE       source.name
          // JER CES PREMA TOME PRAVITI QUERY
          /* console.log(source.name);
          console.log(
            "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
          ); */
          // I TREBA TI args.sort    ALI IMAJ NA UMU DA POSTOJI MOGUCNOST DA KORISNIK NIJE PROSLEDIO ARGUMENT
          /* console.log(args.sort);
          console.log(
            "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
          ); */

          // OVO JE OVDE BILO RANIJE STO JE TEDIOUS, I NECU OVO VISE KORISTITI

          /* const blogPostIdsArray = groupPagesNamesAndIds[source.name].blogPages;
          const blogPostArray = [];
          // eslint-disable-next-line
          for (let blogPostId of blogPostIdsArray) {
            blogPostArray.push(
              context.nodeModel.getNodeById({
                id: blogPostId,
              })
            );
          } */

          // === !== === !== ===

          let blogPostPages; // OVO CE EVENTUALLY BITI RETURNED JER CE IMATI
          // QUERIED BLOG POSTS OBJECTS NA SEBI

          // DAKLE KADA NE POSTOJI      sort   ARG

          if (!args.sort) {
            blogPostPages = await context.nodeModel.runQuery({
              filter: { groupPage: { name: { eq: source.name } } },
            });
          } else {
            // I KADA POSTOJI

            blogPostPages = await context.nodeModel.runQuery({
              query: {
                filter: { groupPage: { name: { eq: source.name } } },
                // DAKLE SAMO OVO ZDAJEM , A U      packages/gatsby-theme-raedal/src/templates/group-page-template.tsx
                // POGLEDAJ, USTVARI KAKAVE SI VARIJABLE PROSLEDIO (U PITANJU SU ENUMI)
                sort: args.sort,
              },
              type: "BlogPostPage",
            });
          }

          return blogPostPages;

          // === !== === !== ===

          // return blogPostArray;   // DAKLE OVO JE BILO RANIJE I TO VISE NE KORISTIM
        },
      },

      allBlogKeywords: {
        type: "[GroupNameAndPath!]!",

        resolve: (source, args, context, info) => {
          // === !== === !== === !== === !==

          const { name } = source;

          const arrayOfKeywordObjects = [];

          const allGroupPages = context.nodeModel.getAllNodes({
            type: "GroupPage",
          });

          /* console.log(
            JSON.stringify({ allGroupPagesInResolver, source }, null, 2)
          ); */

          // eslint-disable-next-line
          for (let groupPage of allGroupPages) {
            if (name !== groupPage.name) {
              arrayOfKeywordObjects.push({
                keyword: groupPage.name,
                path: groupPage.path,
                keywordColor: groupPage.groupColor,
                keywordTextColor: groupPage.keywordTextColor,
                keywordBorderColor: groupPage.keywordBorderColor,
              });
            }
          }

          // === !== === !== === !== === !==

          return arrayOfKeywordObjects;
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

// === !== === !== === !== === !== === !== === !== === !== === !==
// SADA KREIRAM           GroupPage
// === !== === !== === !== === !== === !== === !== === !== === !==
// JA MISLIM DA CU MOCI DA ISKORISTIM Promise.all KOJI VEC DOLE POSTOJI
// MEDJUTIM MORACU OBEZBEDITI TEMPLATE, ZA TAJ Group PAGE
// ZAPAMTI DA body NECES IMATI, JER TI OVE GROUP PAGE-OVE GENERISES SAM
// (NE GENERISES IH OD MDX-A, DAKLE GROUP PAGE-OVI NEMAJU SVOG PARENT-A)
// === !== === !== === !== === !== === !== === !== === !== === !==

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

  // eslint-disable-next-line
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

  await Promise.all(arrayOfPromises);

  const allGroupPagesIdsAndPaths = await graphql(`
    query TakeGroupPages {
      group: allGroupPage {
        nodes {
          id
          path
        }
      }
    }
  `);

  if (allGroupPagesIdsAndPaths.errors) {
    reporter.panic(
      "Something went wrong with QUERY FOR ALL OF YOUR GROUP PAGES",
      allGroupPagesIdsAndPaths.errors
    );
  }

  const groupArray = allGroupPagesIdsAndPaths.data.group.nodes;

  // eslint-disable-next-line
  for (let singleGroupPageData of groupArray) {
    // PRAVIM JEDAN GROUP PAGE ZA DRUGIM

    actions.createPage({
      // PROSLEDJUJEM QUERY VARIJABLU, KROZ CONTEXT
      context: { id: singleGroupPageData.id },
      // PATH NA KOJEM CE BITI GENERISAN PAGE
      path: singleGroupPageData.path,
      // KOMPONENTA, KOJA CE BITI RENDERED
      component: require.resolve("./src/templates/group-page-template.tsx"),
    });
  }
};
