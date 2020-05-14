const remarkSlug = require("remark-slug");
const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false

// const siteMetadata = require("./src/seo/siteMetadata");

module.exports = (options) => {
  const { contentPath, useExternalMDX } = withDefaults(options);

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
