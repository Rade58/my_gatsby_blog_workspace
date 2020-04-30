const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false
// ZA METADATA (ODNONO ZA ONO STO CE KONZUMIRATI Helmet NA KRAJU)
const withSiteHelmetDefaults = require("./utility/utility-site-metadata");
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

// U GRAPHQL LAYER DODAJEM NOVI TYPE, A TO CE BITI      BlogPostPage

// I OVO CE DODATI DVA QUERY-JA U GRAPHQL LAYER (ALI U OVOM TRENUKU
// NEMA NODE-A , MORAS IH NAPRAVITI) (STO SAM KASNIJE I URADIO)

// DEFINISAO SAM JOS JEDAN TYPE TO CATER MY NEEDS, ALI TO JE SAMO TYPE, KOJI
// SE KORISTI U       BlogPostPage    TYPE

exports.createSchemaCustomization = ({ actions }) => {
  //  RANIJE SAM MISLI ODA OVDE DODAM JOS NOVIH TYPE-OVA, ALI
  // SAM ODUSTAO JER NISU TREBALI

  actions.createTypes(`
    type BlogPostPage implements Node @dontInfer {
      id: ID!
      title: String!
      path: String!
      updated: Date! @dateformat
      body: String!

      frontMatter: MyFrontMatter!

    }

    type MyFrontMatter {
      title: String!
      lang: String!
      description: String!
      themeColor: String!
    }

  `);
};

// EVO OVAKO DEFINISEM PRAVLJANJE NODE-OVA
// I JA OVDE KONKRETNO ZELI MDA HANDLE-UJEM ONE NODE-OVE
// KOJEJE KREIRAO     gatsby-plugin-mdx

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  // AKO NEMA PARENTA POTICE OD       gatsby-source-filesystem
  // NE TREBA MI ONDA

  // console.log(node.parent ? getNode(node.parent).sourceInstanceName : "nista");

  // console.log(JSON.stringify(node, null, 2));
  // console.log(node.internal ? node.internal.type : "nothing");

  if (!node.parent) return;

  // AKO POTICE ON BILO CEGA DRUGOG STO NIJE      gatsby-plugin-mdx
  // NE TREBA MI NI TADA

  const parentNode = getNode(node.parent);

  // AKO NIJE LOADED BY MY THEME, NI TAJ MI NE TREBA
  if (parentNode.sourceInstanceName !== "gatsby-theme-raedal") return;

  const { basePath } = withDefaults(options); // PO DEFAULT-U     /

  const { name, modifiedTime, relativeDirectory } = parentNode; // RELATIVAN
  //                                                DIREKTORIJUM U ODNOSU NA
  //                                                 FOLDER U KOJEM JE SAV
  //                                                CONTENT, KOJI LOAD-UJES
  //                                                  SA TVOJOM TEMOM

  const id = createNodeId(`BlogPostPage-${node.id}`);

  const { contentDigest } = node.internal;
  const { title } = node.frontmatter || name;

  // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==

  /* console.log(
    "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
  ); */
  // console.log(node.headings);
  /* console.log(
    "=== !== === !== === !== === !== === !== !== === !== === !== === !== === !== === !==="
  ); */

  const pageName = name !== "index" ? name : "";

  // DODAJEM SLUG SUPPORT ODNOSNO SVE STO IMA slug U FRONTMATTER-U slug
  // BI TREBALO DA BUDE PATH

  let slug;
  if (node.frontmatter.slug) slug = `/${node.frontmatter.slug}`;

  //  SITE METADATA (ODNONO ONO STO CE KONZUMIRATI Helemet)
  const { lang, themeColor, description } = withSiteHelmetDefaults(
    node.frontmatter
  );
  // KAO STO VIDIS IZDVAJAM GA IZ FRONTMATTER-A

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
        )
          .then((queryResult) => {
            // ZNAS DA RESULTAT GRAPHQL QUERY-JA, UVEK POSTOJI
            // DAKLE ERROR INSTANCA NIKADA NIJE THROWN

            actions.createPage({
              context: {
                id,
                headings: queryResult.data.mdx.headings,
              },
              path,
              // component: componentPath,
              component: require.resolve(
                "./src/templates/blog-post-template.tsx"
              ),
            });

            res();
          })
          .catch((err) => {
            console.log("REJECTED");
            console.log(err);
            rej();
          });
      })
    );
  }

  return Promise.all(arrayOfPromises);

  /*  blogPostIdsAndPaths.forEach(({ id, path }, index) => {
    // SADA OVDE MOGU DA IZFILTRIRAM REZULTATE, I PROSLEDIM IH KROZ CONTEXT

    let headings;

    // console.log(idsAndHeadingsValues[index].frontmatter.slug, path);

    

    actions.createPage({
      context: {
        id,
      }, // QUERY VARIJABLA, ZA QUERY OPERATION U TEMPLATE-U
      path, // PATH NA KOJEM CE BITI RENDERED PAGE (PATH URL U ADRESS BAR-U)
      component: require.resolve("./src/templates/blog-post-template.tsx"),
    });
  }); */
};
