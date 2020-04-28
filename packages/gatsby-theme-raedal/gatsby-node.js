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

  if (!node.parent) return;

  // AKO POTICE ON BILO CEGA DRUGOG STO NIJE      gatsby-plugin-mdx
  // NE TREBA MI NI TADA

  if (node.internal.owner !== "gatsby-plugin-mdx") return;

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
  // OPET NAPOMENA DA OVDE PRAVIM QUERY ZA SVIM  BlogPostPage   NODE-OVIMA
  // OD KOJIH PRAVIM
  const result = await graphql(`
    query {
      pages: allBlogPostPage {
        nodes {
          id
          path
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("failed to find blog post nodes", result.errors);
  }

  const blogPostIdsAndPaths = result.data.pages.nodes;

  blogPostIdsAndPaths.forEach(({ id, path }) => {
    actions.createPage({
      context: { id }, // QUERY VARIJABLA, ZA QUERY OPERATION U TEMPLATE-U
      path, // PATH NA KOJEM CE BITI RENDERED PAGE (PATH URL U ADRESS BAR-U)
      component: require.resolve("./src/templates/blog-post-template.tsx"),
    });
  });
};
