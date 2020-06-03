const remarkSlug = require("remark-slug");
// const fs = require("fs");    // TREBA ZA CLOUDINARY (NE UKLANJAJ)
const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false

// === !== === !== === !== SAMO PRIVREMENO COMMENTED OUT
// ENVIROMENT STUFF   ///////////////////////

/* require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); */
// === !== === !== === !== === !== === !==
//////////////////////////////////////////

module.exports = (options) => {
  // SADA IZDVAJAM I      groupsPath
  const {
    contentPath,
    useExternalMDX,
    groupsPath,
    authorsPath,
    deviconsInUse,
    authorsPictures,
    socialSvgs,
  } = withDefaults(options);

  // DAKLE TO CE BITI PATH FOLDER-A, RELATIVAN PATH NA SITE
  // GDE CU STAVLJATI MOJE GROUP PAGES

  return {
    plugins: [
      "gatsby-plugin-typescript",
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "gatsby-theme-raedal",
          path: contentPath,
        },
      },
      // === !== === !==
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "group-pages-raedal",
          path: groupsPath,
        },
      },
      // === !== === !==   OVO JE DOBRO MESTO ZA KONFIGURIRANJE     ****    CLOUDINARY-JA   ****   === !== === !==
      // === !== === !== === !== === !== === !== PRIVREMENO COMMENTED OUT === !== === !== === !==
      /* {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "group-icons",
          path: "cloud-images"
        },
      },
      // CLOUDINARY CONFIGURACIJA
      {
        resolve: "gatsby-transformer-cloudinary",
        options: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.CLOUDINARY_API_KEY,
          apiSecret: process.env.CLOUDINARY_API_SECRET,
          // A IME FOLDER NA CLOUD-U MOZE BITI RANDOM
          uploadFolder: "raedal-blog",
        },
      }, */
      // === !== === !==  === !== === !== === !== === !== === !== === !== === !== === !==
      // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==
      // OVIM ZELIM DA LOAD-UJEM SVE MOGUCE IKONICE VEZANE ZA SITE, ODNOSNO DEVICONS-E
      // DAKLE TO RADIM JER ZELIM DA I NJIH MOGU QUERY-OVATI I MOZDA DA I KORISTIM, NJIHOV
      // STRINGIFIED OBLIK
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "devicons-raedal",
          path: deviconsInUse, // OVO JE DAKLE IME FOLDERA KOJE CE BITI NA SITE LEVEL-U
        },
      },
      // authors
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "author-pages",
          path: authorsPath,
        },
      },
      // === !== === !== === !== === !==
      // ZA SLIKE AUTORA
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "authors-pictures",
          path: authorsPictures,
        },
      },
      // ZA SOCIJALNE IKONE
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "social-svgs",
          path: socialSvgs,
        },
      },
      // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==
      // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==
      !useExternalMDX && {
        resolve: "gatsby-plugin-mdx",
        options: {
          defaultLayouts: {
            default: require.resolve("./src/components/layout.tsx"), // OVO JE DEFAULT ZA PAGES
            // ALI ONE KOJE NISU KREIRANE SA MOJIM PLUGINOM
            // DAKLE CIJI CORRESPONDING MDX FAJLOVI NISU STAVLJENI U FOLDER       blogposts
            // NA SITE NIVOU (ALI IMAJ NA UMU DA CU JA IPAK FORMIRATI POTPUNO DRUGACIJU KOMPONENTU)
            // ILI TACNIJE, OVA KOMPONENTA NECE UOPSTE BITI KORISCENA ZA ONE PAGE-OVE IZVAN MOJE
            // TEME JER IZVAN MOJE TEME NICEGA NECE NI BITI
          },
          remarkPlugins: [remarkSlug],
        },
      },
      "gatsby-plugin-theme-ui",
    ].filter(Boolean),
  };
};
