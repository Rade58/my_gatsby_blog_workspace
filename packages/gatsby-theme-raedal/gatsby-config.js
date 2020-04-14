const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false
module.exports = (options) => {
  const { contentPath, useExternalMDX } = withDefaults(options);

  return {
    plugins: [
      "gatsby-plugin-typescript",

      /* {
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
            default: require.resolve("./src/components/layout.tsx"),
          },
        },
      },
      "gatsby-plugin-theme-ui",
    ].filter(Boolean),
  };
};
