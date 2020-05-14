const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false

// const siteMetadata = require("./src/seo/siteMetadata");

const remarkSlug = require("remark-slug");

module.exports = (options) => {
  const { contentPath, useExternalMDX } = withDefaults(options);

  return {
    plugins: [
      "gatsby-plugin-typescript",
      /* {
        resolve: "gatsby-plugin-anchor-links",
      }, */

      /* {   // OVO NIKAD NIJE NI TREBALO (IZAZIVA ERROR)
        resolve: "gatsby-plugin-typescript",
        // ALI TAKODJE ZELIM DA BUDE MOGUCE KORISCENJE PRAGME, I tsx-A
        options: {
          isTSX: true,
          jsxPragma: "jsx",
          allExtensions: true,
        },
      }, */
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
            // NA SITE NIVOU
          },
          remarkPlugins: [remarkSlug],
        },
      },
      "gatsby-plugin-theme-ui",
    ].filter(Boolean),
  };
};
