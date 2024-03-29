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
//                                            DODAO JOS, KAKO JE MOJA TEMA RASLA
//
const withFrontmatterDefaults = require("./utility/utility-site-metadata"); // (ONO STO SE SERVIRA ZA DEFAULT ZA FIELD frontMatter KOJI SAM KREIRAO)
//

///////////////////////////
// DEFINISANJE FOLDERA ZA KOMPONENTE KOJE MOGU UVOZITI NA NIVOU SITE-A
// MISLIM DA OVO NIJE USPELO, A MOZDA JA OVO I POGRESNO DEFINISEM
/* exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [pathPackage.resolve(__dirname, "src"), "node_modules"],
    },
  });
}; */
///////////////////////////

exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();

  // DAKLE SADA IZDVAJAM I      groupsPath
  // I ZELIM DA SE NA NIVOU SITE-A KREIRA     FOLDER AKO GA NEMA

  const {
    contentPath,
    groupsPath,
    authorsPath,
    authorsPictures,
    socialSvgs,
    deviconsInUse,
  } = withDefaults(options);

  const blogsDir = pathPackage.join(program.directory, contentPath); // DAKEL OVOM SE
  //                                                         APSOLUTNI
  //                                                  DIREKTORIJUM SITE-A

  // PRAVIM NOVI ABSOLUTNI PATH, OVAJ PUT ZA FOLDER ZA GROUP PAGE MDXES

  const groupsDir = pathPackage.join(program.directory, groupsPath);

  const authorsDir = pathPackage.join(program.directory, authorsPath);

  const deviconsDir = pathPackage.join(program.directory, deviconsInUse);
  const socialIconsDir = pathPackage.join(program.directory, socialSvgs);
  const authorsImagesDir = pathPackage.join(program.directory, authorsPictures);

  // OVO SAM RANIJE RADIO
  if (!fs.existsSync(blogsDir)) {
    mkdirp.sync(blogsDir);
  }

  // SAD RADIM ISTO, SAMO ZA PREDHODNI PATH
  if (!fs.existsSync(groupsDir)) {
    // DAKLE KREIRAM FOLDER AKO GA NEMA
    mkdirp.sync(groupsDir);
  }

  if (!fs.existsSync(authorsDir)) {
    mkdirp.sync(authorsDir);
  }

  // === !== === !===

  if (!fs.existsSync(deviconsDir)) {
    mkdirp.sync(deviconsDir);
  }
  if (!fs.existsSync(socialIconsDir)) {
    mkdirp.sync(socialIconsDir);
  }
  if (!fs.existsSync(authorsImagesDir)) {
    mkdirp.sync(authorsImagesDir);
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

  // __ --> __ __> __ => ==> ODMAH NA POCETAK       BlogPostPage    TYPE-A, DODAJEM JOS NEKOLIKO TYPE-OVA
  // DODAO SAM        createdAt         I DODAO SAM           isUpdated
  // I SAM MOZES VIDETI, KAKO SU TYPED

  // MOZES I VIDETI DA SAM KORISTIO I DIREKTIVU ZA      createdAt     KOJA CE MI DATI MOGUCNOST DA UPOTREBIM
  // Moment.js PAKET

  // I POSTO SI ZAVRSIO SA DEFINISANJEM TYPE-OVA, MOZES DA ODES U HOOK onCreateNode GDE CES DEFINISATI
  // ADDITIONAL FIELD-OVE KOJI CE BITI KREIRANI

  // A NAKON TOGA DEFINISES RESOLVER-A, ZA        isUpdated
  // __ --> __ __> __ => ==>__ --> __ __> __ => ==>__ --> __ __> __ => ==>__ --> __ __> __ => ==>__ --> __ __> __ => ==>_
  // USTVARI PRVO SKOKNI U      `packages/gatsby-theme-raedal/utility/utility-site-metadata.js`
  // GDE CES DEFINISATI DEFAULT ZA        createdAt
  // __ --> __ __> __ => ==>

  // === !== === !== === !== === !== === !== === !==
  // DODACI       ordinalG        TYPE ODMAH NA POCETAK
  // TIPE CE MU BITI    Int
  // I NARAVNO DRUGI KREIRACU FIELD       prevAndNextPagePath
  // I ZA TA JFIELD CU KREIRATI, POSEBAN TYPE

  createTypes(`
    type BlogPostPage implements Node @dontInfer {

      cloudImagesArrayName: String!

      author: AuthorPage

      ordinalG: Int!
      prevAndNextPagePath: PrevAndNextPagePath!

      createdAt: Date! @dateformat
      isUpdated: Boolean!


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

      icon: String!

      groupColor: String!

      keywordTextColor: String!

      keywordBorderColor: String!

      underlineColor: String!

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

    type PrevAndNextPagePath {
      prevPagePath: String
      nextPagePath: String
    }

    type AuthorPage implements Node @dontInfer {

      id: ID!

      authorID: String!
      authorName: String!

      path: String!

      
      lang: String!
      about: String!

      
      authorImage: AuthorImage
      authorPlaceholderSvg: AuthorImage!
      

      personalWebsite: String
      
      github: SocialMedia
      twitter: SocialMedia
      instagram: SocialMedia

      facebook: SocialMedia
      youtube: SocialMedia
      linkedin: SocialMedia

      lastTenPosts: [OneOfLastTenPosts]!

    }

    type SocialMedia {
      network: String
      url: String
      icon: AuthorImage
    }

    type AuthorImage {
      image: String
      mediaType: String
    }


    type OneOfLastTenPosts {
      
      createdAt: Date! @dateformat
      updated: Date! @dateformat

      path: String!
      title: String!

      description: String!
      themeColor: String!

      group: GroupForAuthor

    }

    type GroupForAuthor {
      path: String!
      name: String!
      icon: String!
      underlineColor: String!
    }



  `);
};
// ------------------------TEKST OD RANIJE
// KAO STO VIDIS GORE SAM PROSIRIO      GroupNameAndPathType, DODAJUCI
// keywordColor I keywordTextColor

// EVENTUALLY, VEMO BRZO CU OVO IZBACITI
// OVAJ OBJEKAT NIJE DOBRA STVAR

// MISLIM DA JE OVAJ OBJEKAT POSTAO NO OP ILI DA CE TO POSTATI
// (1) IZ RESOLVERA SAM GA POTPUNO UKLONIO, JER GA ONI VISE NE KORISTE
// (2) JEDINO SE KORISTI PRI KREIRANJU GROUP PAGE-OVA, A TO CE USKORO BITI
//                    UKLONJENO
// CIM GA PODVUCE ESLINT ZNACU DA JE NO-OP
// const groupPagesNamesAndIds = {}; // MORACE BITI UKLONJENO JER NEMA NIKAKV
//                                  NACIN DA KORISTI CACHE
//            OVO JE PREDPSOTVKA JER JA JESAM KORISTIO CONTEND DIGEST
//                                   PRI KREIRANJU NODE-OVA ALI NEMA VEZE
//                                SADA CU I ONAKO IAMTI CORRESPONDING MDXES

// SVI HELPERI SU OVDE OBJASNJENI:     https://www.gatsbyjs.org/docs/node-api-helpers/#createContentDigest
// ---------------------------------------------------------------------------------------------------------

exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  options
) => {
  if (!node.parent) return; // OVO JE I DALJE OK

  const parentNode = getNode(node.parent);

  // OVO OSTAJE ISTO   (   "/"     JE basePath ) (NAPISAO RANIJE)
  const { basePath } = withDefaults(options); // PO DEFAULT-U

  const { name, modifiedTime, relativeDirectory } = parentNode;

  if (parentNode.sourceInstanceName === "gatsby-theme-raedal") {
    //
    // console.log(parentNode.sourceInstanceName);
    //

    const id = createNodeId(`BlogPostPage-${node.id}`);

    const { contentDigest } = node.internal;

    const { title } = node.frontmatter || name;

    const pageName = name !== "index" ? name : "";

    let slug;
    if (node.frontmatter.slug) slug = `/${node.frontmatter.slug}`;

    const {
      // IZDVAJAM STRING
      cloudImagesArrayName,
      //
      author,
      // IZDVAJAM       ordinalG
      ordinalG,
      // EVO IZDVOJIO SAM I       createdAt     (SADA SAM OTREBA DA GA UPOTREBIS, KAO NOVI FIELD, PRI KREIRANJU NODE-A)
      createdAt,
      //
      lang,
      themeColor,
      description,
      group,
      /* groupColor,
      keywordTextColor,
      keywordBorderColor, */ // OVO COMMENTED OUT PROVIDE-UJE GROUP PAGE (NE TREBA OVDE)
    } = withFrontmatterDefaults(node.frontmatter); // MISLEADING IME FUNKCIJE, ALI NEKA OSTANE

    actions.createNode({
      // CAK I OVA FUNKCIJA TRIGGER-UJE HOOK U CIJEM SAM OBIMU (INFO OD RANIJE)
      id,
      title,

      //
      author, // KREIRACU RESOLVER-A
      //

      // EVO ZADACU I ordinalG (ALI ZADACU I FIELD   prevAndNextPagePath   ZA KOJI CU, UBRZO I, KREIRATI   **  RESOLVER-A  **   )
      ordinalG,
      prevAndNextPagePath: {}, // DAKLE PROSLEDJUJEM MU BEZVEZE NESTO (PRAZAN OBJEKAT) (NIJE N IBITNO, JER KAO STO REKOH, KREIRACU RESOLVER-A)
      // EVO OVDE CU DODATI       createdAt     FIELD
      createdAt,
      // A ONAJ FIELD, KOJI CE SE MORATI RESOLVE-OVATI JESTE        isUpdated

      //  ZA SADA SAM MU PROSLEDIO      false    (ALI TO I NIJE BITNO JER CES U RESOLVER-U KORISTITI source)
      // A source   JESTE SVE DATO OD OVOG NODE-A
      // === !== === !== ===
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
        name: group, // OVO JE ONAJ GROUP NAME
      },

      // MISLIM DA TI VEC IMAS RESOLVER KOJI UPRAVO UZIMA GORNJI
      // group FIELD I SA NJEGA UZIMA STA MU TREBA DA BI QUERY-EOVAO
      // APROPRIATE GROUP PAGE

      // SALJEM I FIELD, KOJI CE PREDSTAVLJATI QUERY PARAM ZA CLOUDINARY
      // A SEARCH CU OBAVITI ILI PRI KREIRANJU PAGE-OVA ILI NAKON STO KREIRAM PAGE (JOS RAZMATRAM STA MOGU)

      cloudImagesArrayName,
    });

    /////////////////////////////////////////////////////////////////
  }
  // OVO SAM SVE DEFINISAO RANIJE
  // === !== ===  KREIRAM NODE-OVE ZA GROUP STRANICE !== === !== ===
  // === !== ===   !== === !== ===
  /* console.log("=======================================================");
  console.log(parentNode.sourceInstanceName === "group-pages-raedal");
  console.log("======================================================="); */
  if (parentNode.sourceInstanceName === "group-pages-raedal") {
    // console.log(parentNode.sourceInstanceName);

    const id = createNodeId(`GroupPage-${node.id}`);

    // IZDVAJAM STA MI TREBA IZ FRONTMATTER-A
    // DAKLE I GROUP PAGES, MDX-OVI IMAJU (ODNONO TREBA DA IAMJU)
    //    group     FIELD SA IMENOM GRUPE

    const {
      group,
      groupColor,
      keywordBorderColor,
      keywordTextColor,
      underlineColor,
      // NEKA TU BUDU PROPERTIJI I LANG I DESCRIPTION
      lang,
      description,
      // JER SVAKAKO CE MI POMENUTE STVARI TREBA TI ZA
      // SEO
      // ZATO SKOKNI SAD U SDL DA DODAS I OVE TYPE-OVE
    } = withFrontmatterDefaults(node.frontmatter);

    const { contentDigest } = node.internal;

    // === !== === !== === !== === !==
    // === !== === !== === !== === !==

    // MISLIM DA SADA IMAM SVE STO JE POTREBNO ZA KREIRANJE NOVOG NODE-A
    actions.createNode({
      id,
      name: group,
      path: pathPackage.resolve("/", group.toLowerCase()),
      // DODAJEM I   lang     I   description
      lang,
      description,
      //
      groupColor,
      keywordTextColor,
      keywordBorderColor,
      //
      underlineColor,
      //
      updated: modifiedTime,
      updatedFns: modifiedTime,
      // TREBA DA POSTOJI I PARENT
      parent: node.id,
      //
      internal: {
        type: "GroupPage",
        contentDigest,
      },

      // EVO OVDE PROSLEDJUJEM GROUP NAME === !== === !==
      icon: group,
      // === !== === !== === !== === !== === !== === !==
    });
  }

  // === !== === !== !== KREIRANJE    AuthorPage      NODE-OVA

  if (parentNode.sourceInstanceName === "author-pages-raedal") {
    console.log(JSON.stringify(node.frontmatter, null, 2));

    const id = createNodeId(`AuthorPage-${node.id}`);

    const {
      authorID,
      authorName,
      about,
      lang,
      github,
      twitter,
      instagram,
      youtube,
      facebook,
      linkedin,
      personalWebsite,
    } = withFrontmatterDefaults(node.frontmatter);

    const { contentDigest } = node.internal;

    actions.createNode({
      id,
      path: pathPackage.resolve("/", "author/", authorID.toLowerCase()),
      parent: node.id,
      authorID,
      internal: {
        type: "AuthorPage",
        contentDigest,
      },
      authorName,
      about,
      lang,
      github: { network: "github", url: github },
      twitter: { network: "twitter", url: twitter },
      instagram: { network: "instagram", url: instagram },
      youtube: { network: "youtube", url: youtube },
      facebook: { network: "facebook", url: facebook },
      linkedin: { network: "linkedin", url: linkedin },
      personalWebsite,

      // ZA SLEDECE FIELD-OVE CU NAPRAVITI RESOLVERE
      authorImage: "", // TREBA DA PRONADJEM IMAGE IZ    "{userId}.jpg/png"     authors-images   FOLDER
      authorPlaceholderSvg: "", // TREBA DA PRONADJEM     "author_placeholer.svg"    `social-icons` FOLDER
    });
  }
};

// __ --> __ __> __ => ==>__ --> __ __> __ => ==>__ --> __ __> __ => ==>__ --> __ __> __ => ==>__ --> __ __> __ => ==>_
//   DAKLE POTREBNO JE DA DODAM RESOLVER ZA       isUpdated     FIELD     NA          BlogPostPage      TYPE-U
// __ --> __ __> __ => ==>__ --> __ __> __ => ==>__ --> __ __> __ => ==>__ --> __ __> __ => ==>__ --> __ __> __ => ==>_

exports.createResolvers = ({ createResolvers }) => {
  /*  console.log(
    "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
  );
  console.log(
    "=== !== === !== === !== === !== === !== === !== === !== === !== === !== ==="
  ); */

  createResolvers({
    // DAODAJE M RESOLVERE ZA   AuthorPage   TYPE
    AuthorPage: {
      lastTenPosts: {
        type: "[OneOfLastTenPosts]!",
        resolve: async (source, args, context, info) => {
          const { authorID } = source;

          const resultArrayBlogPost = await context.nodeModel.runQuery({
            type: "BlogPostPage",
            query: {
              // limit: "10",
              sort: { order: ["DESC"], fields: ["updated"] },
              filter: { author: { authorID: { eq: authorID } } },
            },
          });

          // console.log(resultArray);

          const arrayOfPromises = [];

          if (resultArrayBlogPost && resultArrayBlogPost.length) {
            for (let i = 0; i < 10; i += 1) {
              const {
                groupPage,
                frontMatter,
                createdAt,
                updated,
                path,
                title,
              } = resultArrayBlogPost[i]; // NE ZABORAVI DA JE OVO NIZ
              const { name: groupPageName } = groupPage;

              const { description, themeColor } = frontMatter;

              arrayOfPromises.push(
                new Promise((res, rej) => {
                  context.nodeModel
                    .runQuery({
                      type: "GroupPage",
                      query: {
                        filter: {
                          name: { eq: groupPageName },
                        },
                      },
                    })
                    .then(async (groupPageResultArray) => {
                      // MORAM DA PRAVI MDODADATNI QUERY ZATO JE then-OV CALLBACK ASYNC, JER CU KORISTITI  await
                      const {
                        path: groupPath,
                        name,
                        icon: iconName,
                        underlineColor,
                      } = groupPageResultArray[0]; // NIKAD NE ZABORAVI DA NAZAD DOBIJAS NIZ

                      const iconNameArgument = iconName.toLowerCase();

                      const iconArray = await context.nodeModel.runQuery({
                        type: "File",
                        query: {
                          filter: {
                            sourceInstanceName: { eq: "devicons-raedal" },
                            name: { eq: iconNameArgument },
                          },
                        },
                      });

                      // ALI NE SAM OTO, MORACU DA CITAM FAJL

                      const { absolutePath } = iconArray[0]; // I OPET PONAVLJAM NE ZABORAVI DA JE OVO NIZ

                      let base64ValueIcon;

                      await new Promise((resolve, reject) => {
                        fs.readFile(
                          absolutePath,
                          { encoding: "base64" },
                          (error, result) => {
                            if (error) return reject(error);

                            base64ValueIcon = result;

                            return resolve();
                          }
                        );
                      });

                      return res({
                        group: {
                          path: groupPath,
                          name,
                          icon: base64ValueIcon,
                          underlineColor,
                        },
                        description,
                        themeColor,
                        createdAt,
                        updated,
                        path,
                        title,
                      });
                    })
                    .catch((error) => rej(error));
                })
              );
            }

            return Promise.all(arrayOfPromises);
          }

          return [];
          // console.log(arrayOfPromises);
        },
      },

      authorImage: {
        type: "AuthorImage",
        resolve: async (source, args, context, info) => {
          // let blah;

          const { authorID: name } = source;

          const resultArray = await context.nodeModel.runQuery({
            type: "File",
            query: {
              filter: {
                sourceInstanceName: { eq: "authors-pictures" },
                name: { eq: name },
              },
            },
          });

          const { absolutePath, internal } = resultArray[0];
          const { mediaType } = internal;

          return new Promise((res, rej) => {
            fs.readFile(
              absolutePath,
              { encoding: "base64" },
              (error, result) => {
                if (error)
                  return rej(new Error("author image file couldn't be read"));

                return res({
                  image: result,
                  mediaType,
                });
              }
            );
          });

          // return "";
        },
      },
      authorPlaceholderSvg: {
        type: "AuthorImage!",
        resolve: async (source, args, context, info) => {
          // console.log("QUERY EXECUTED!!!");

          const name = "author_placeholder";
          const myMediaType = "image/svg+xml";

          const resultArray = await context.nodeModel.runQuery({
            type: "File",
            query: {
              filter: {
                sourceInstanceName: { eq: "social-svgs" },
                name: { eq: name },
                internal: {
                  mediaType: { eq: myMediaType },
                },
              },
            },
          });

          // console.log(resultArray);

          const { absolutePath, internal } = resultArray[0];
          const { mediaType } = internal;

          return new Promise((res, rej) => {
            fs.readFile(
              absolutePath,
              { encoding: "base64" },
              (error, result) => {
                if (error)
                  return rej(
                    new Error("Couldn't read author placeholder svg image")
                  );

                return res({
                  image: result,
                  mediaType,
                });
              }
            );
          });
        },
      },
    },
    //  === !== === !== ===

    BlogPostPage: {
      // === !== === !== === !== === !==
      // ZADAJEM RESOLVER-A ZA        prevAndNextPagePath  FIELD
      // === !== === !== === !== === !==
      prevAndNextPagePath: {
        type: "PrevAndNextPagePath!",
        resolve: async (source, args, context, info) => {
          const { groupPage, ordinalG } = source;
          const { name } = groupPage;

          if (!name && !ordinalG) {
            return { prevPagePath: null, nextPagePath: null };
          }

          // VODI RACUNA DA JE NIZ POVRATNA VREDNOST  runQuery-JA
          // JA OCEKUJEM I ZELIM SAMO NULTI CLAN, TAK ODA SAM U OBA SLUCAJA RESTRUKTURIRAO NIZ-OVE
          // USTVARI NIJE MOGUCE RETRUKTURIRATI NIZOVE
          const blogPostPrevArr = await context.nodeModel.runQuery({
            type: "BlogPostPage",
            query: {
              filter: {
                groupPage: { name: { eq: name } },
                ordinalG: { eq: ordinalG - 1 },
              },
            },
          });

          const blogPostNextArr = await context.nodeModel.runQuery({
            type: "BlogPostPage",
            query: {
              filter: {
                groupPage: { name: { eq: name } },
                ordinalG: { eq: ordinalG + 1 },
              },
            },
          });

          // console.log({ blogPostPrev, blogPostNext });

          // DAKLE NEKADA KAO STO ZNAS NIJE PRONADJENO NISTA U NIZU
          // OVO JE MOJ NACIN DA TO HANDLE-UJEM
          const prevPagePath =
            blogPostPrevArr && blogPostPrevArr[0]
              ? blogPostPrevArr[0].path
              : null;
          const nextPagePath =
            blogPostNextArr && blogPostNextArr[0]
              ? blogPostNextArr[0].path
              : null;

          return {
            prevPagePath,
            nextPagePath,
          };
        },
      },
      // === !== === !== === !== === !==

      // EVO ZADAJEM          isUpdated       FIELD  (NARAVNO, MOGU DA STAMPAM I VIDIM KAKO SVE IZGLEDA)
      isUpdated: {
        type: "Boolean!",
        resolve: (source, args, context, info) => {
          // console.log(source);

          //  IZ source-A, TREBAM DA IZDVOJIM     updated   I   createdAt

          const { createdAt, updated } = source;

          if (!createdAt) return false;
          if (!updated) return false;

          // SADA OD OBE VREDNOSTI TREBAM DA IZDVOJIM     GODINU, MESEC, DAN U MESECU
          const createdDate = new Date(createdAt);
          const updatedDate = new Date(updated);

          // OVO SU MOJE KONSTRUKCIJE STRINGOVA, NIJE NIKAKAV ROCKET SCIENCE
          const createdString = `${createdDate.getFullYear()}-${createdDate.getMonth()}-${createdDate.getDate()}`;
          const updatedString = `${updatedDate.getFullYear()}-${updatedDate.getMonth()}-${updatedDate.getDate()}`;

          // console.log({ createdString, updatedString });

          // DAKLE AKO SU STRINGOVI ISTI, NISTA NIJE UPDATED

          // AK OSU STRINGOVI RAZLICITI JESTE UPDATED

          return !(createdString === updatedString);

          // KREIRAJ NOVI BLOG POST DA VIDIS DA LI CE OVO POKAZATI FALSE
          // I DA BIO SAM U PRAVU, USPESNO SAM DEFINISAO, OVAJ RESOLVER
        },
      },

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
        // MORA ASYNC
        resolve: async (source, args, context, info) => {
          const groupPageInstance = await context.nodeModel.runQuery({
            type: "GroupPage",
            query: {
              filter: { name: { eq: source.groupPage.name } },
            },
          });

          // console.log(groupPageInstance);

          if (!groupPageInstance) return null; // groupPage FIELD SME BITI NULL JER SAM TAKO DOZVOLIO
          //
          return groupPageInstance[0] || { name: "bilo koje ime" }; // NIKADA SE NECE DESITI DA
          //                                                              DA VREDNOST BUDE POSLE ||
          //                                                              ALI IPAK SAM TO HANDLE-OVAO
        },
      },

      // === !== author=== !== ===
      author: {
        type: "AuthorPage",
        resolve: async (source, args, context, info) => {
          const { author } = source;

          const resultArray = await context.nodeModel.runQuery({
            type: "AuthorPage",
            query: {
              filter: {
                // internal: {sourceInstanceName: {eq: "author-pages-raedal"}},
                authorID: { eq: author },
              },
            },
          });

          // const authorOb = resultArray[0];

          if (!resultArray) return null;

          return resultArray.length ? resultArray[0] : null;
        },
      },
      // === !== === !== ===
    },
    // EVO DEFINISEM RESOLVER ZA     blogPostPages   FIELD NA      GroupPage    TYPE-U
    GroupPage: {
      // === !== === !== === !== === !==
      // EVO PRAVIM RESOLVER-A ZA             iconPath
      icon: {
        type: "String!",
        resolve: async (source, args, context, info) => {
          // GROUP NAME SE NALAZI U     source.icon
          // A DA SE NE ZEZNEM, path PAKET SAM UVEZAO KAO     pathPackage

          // MISLIM DA JE U OVOM SLUCAJU U PITANJU TYPE       File

          if (source.icon) {
            const name = source.icon.toLowerCase();
            const relPath = `${name}.svg`;

            // BICE RETURNED ARRAY, ALI IMACE SAMO JEDAN CLAN

            const resultArray = await context.nodeModel.runQuery({
              type: "File",
              query: {
                // OVO SAM PREKOPIRAO SVE IZ ONOG QUERY-JA, KOJEG SAM VEC NAPRAVIO U Graphiql-U
                // I ONO STO SAM PROSLEDIO JE KAO STO VIDIS relPath
                filter: {
                  internal: { mediaType: { eq: "image/svg+xml" } },
                  relativePath: { eq: relPath },
                },
              },
            });

            // IZDVAJAM ABSOLUTE PATH NEOPHODAN ZA READING FILE-A
            const { absolutePath } = resultArray[0];
            //

            const fileReadPromise = new Promise((res, rej) => {
              // IPAK NECU "utf-8"   VEC    "base64"
              fs.readFile(
                absolutePath,
                /* "utf8", */
                { encoding: "base64" },
                (error, result) => {
                  if (error) {
                    return rej(error);
                  }

                  // console.log(result);

                  return res(result);
                }
              );
            });

            // console.log({ resultArray });

            // return source.icon;

            return fileReadPromise;
          }

          return "nesto";
        },
      },

      // === !== === !== !== === !== ===
      // === !== === !== !== === !== ===
      blogPostPages: {
        type: "[BlogPostPage]!",

        args: {
          sort: "BlogPostPageSortInput",
        },
        //
        resolve: async (source, args, context, info) => {
          let blogPostPages;

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
    SocialMedia: {
      icon: {
        type: "AuthorImage!",
        resolve: async (source, args, context, info) => {
          const { network } = source;

          const resultArray = await context.nodeModel.runQuery({
            type: "File",
            query: {
              filter: {
                sourceInstanceName: { eq: "social-svgs" },
                name: { eq: network },
                internal: { mediaType: { eq: "image/svg+xml" } },
              },
            },
          });

          const { absolutePath, internal } = resultArray[0];
          const { mediaType } = internal;

          return new Promise((res, rej) => {
            fs.readFile(
              absolutePath,
              { encoding: "base64" },
              (error, result) => {
                if (error)
                  return rej(new Error(`coundn't read ${network} icon`));

                return res({
                  image: result,
                  mediaType,
                });
              }
            );
          });
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

  // === !== NOVO STA SAM DODAO === !==
  // QUERY-UJEM SADA I ZA ONIM STRINGOM       cloudImagesArrayName
  // === !== === !==

  const result = await graphql(`
    query MyPages {
      pages: allBlogPostPage {
        nodes {
          id
          path

          cloudImagesArrayName

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
    const { id, path, cloudImagesArrayName } = blogPost; // KAO STO VIDIS IZDVOJIO SAM I    cloudImagesArrayName

    // CONVINIENTLY, QUERY ZA CLOUDINARY ASSET-OVIAM PRAVIM U DONJEM then-U

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
        ).then(async (queryResult) => {
          // OVO MOZE BITI I ASYNC FUNKCIJA
          // ZNAS DA RESULTAT GRAPHQL QUERY-JA, UVEK POSTOJI
          // DAKLE ERROR INSTANCA NIKADA NIJE THROWN

          // ALI AKO POSTOJI    error     PROPERTI
          // TO ZNACI DA QUERY NIJE BIO USPESAN

          if (queryResult.errors) {
            reporter.panic(
              "Couldnt get headings for the current page",
              queryResult.errors
            );
          }

          // === !==  EVO OVO JE RELATED ZA CLOUDINARY=== !== === cloudImagesArrayName  (ON CE BITI PROSLEDJENA QUERY VARIJABLA)
          // ISTO TAKO IZGLEDA DA FRAGMENT NE FUNKCIONISE
          // ALI MORAM MODIFIKOVATI SEARCH PARAM

          // OVDE CE USTVARI BITI DATA
          const cloudinaryAssets = { data: { allFile: { nodes: [] } } }; // LAKSE JE OVAKO DA COMMENT-UJEM OUT SLEDECI CODE
          // NECU DA RUNN-UJEM QUERY AKO SEARCH PARAMETAR JESTE PRAZAN STRING

          // SAM OTREBAS OVO DA ODCOMMENT-UJES OUT KADA ZELIS DA KORISTIS CLOUDINARY
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
          // === !== ERROR HANDLING === !== ===
          if (cloudinaryAssets.errors) {
            reporter.panic(
              "Something went wrong with QUERY FOR CLOUDINARY ASSETS",
              cloudinaryAssets.errors
            );

            // cloudinaryAssets = { data: { allFile: { nodes: [] } } };
          }
          // === !== === !== ===

          const cloudinaryArray = cloudinaryAssets.data.allFile.nodes;

          if (cloudinaryArray.length) {
            console.log(JSON.stringify(cloudinaryArray, null, 2));
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
              // DODAO SAM I NIZ, U KOJEM TREBA DA BUDU SLIKE SA CLOUDINARY-JA
              cloudinaryArray,
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

  // === !==  MAKING AUTHOR PAGES === !== ===

  const authorsOb = await graphql(`
    query TakeAuthorsNodes {
      authors: allAuthorPage {
        nodes {
          id
          path
        }
      }
    }
  `);

  // console.log(JSON.stringify(authorsOb, null, 2));

  if (authorsOb.errors) {
    reporter.panic(
      "Something went wrong with query for all authors",
      authorsOb.errors
    );
  }

  const authors = authorsOb.data.authors.nodes;

  const authorsPromises = [];

  // eslint-disable-next-line
  for (let author of authors) {
    authorsPromises.push(
      new Promise((res, rej) => {
        actions.createPage({
          context: { id: author.id },
          path: author.path,
          component: require.resolve(
            "./src/templates/author-page-template.tsx"
          ),
        });

        res();
      })
    );
  }

  await Promise.all(authorsPromises);
};

// === !== === !== === !== ===
