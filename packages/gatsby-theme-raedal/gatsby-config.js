const remarkSlug = require("remark-slug");
const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false

// const siteMetadata = require("./src/seo/siteMetadata");

// ENVIROMENT STUFF   ///////////////////////

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

//////////////////////////////////////////

module.exports = (options) => {
  // SADA IZDVAJAM I      groupsPath
  const { contentPath, useExternalMDX, groupsPath } = withDefaults(options);

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
      // DAKLE POTREBNO JE SAMO DODATI JOS JEDNU KONFIGURACIJU
      // SOURCE FILESYSTEM-A
      // === !== === !==
      {
        resolve: "gatsby-source-filesystem",
        options: {
          // ALI SADA MORAM KORISTITI DRUGI NAME OSIM ONOG IMENA
          //            gatsby-theme-raedal
          name: "group-pages-raedal",
          path: groupsPath,
        },
      },
      // === !== === !==   OVO JE DOBRO MESTO ZA KONFIGURIRANJE     ****    CLOUDINARY-JA   ****   === !== === !==
      {
        // OVO JE SAMO KONFIGURACIJA ZA IKONE IZ MOJE TEME
        resolve: "gatsby-source-filesystem",
        options: {
          name: "group-icons",
          path: "devicons-in-use",
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
          uploadFolder: "raedal-blog-devicons",
        },
      },
      // === !== === !==  === !== === !== === !== === !== === !== === !== === !== === !==
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
