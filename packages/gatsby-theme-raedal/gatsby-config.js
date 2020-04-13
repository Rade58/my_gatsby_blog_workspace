const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false
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
          defaultLayouts: {},
        },
      },
      "gatsby-plugin-theme-ui",
    ].filter(Boolean),
  };
};
