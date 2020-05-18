/**
 * @description Preset themes for theme-ui
 * @author Rade
 */

declare module "@theme-ui/presets" {
  import { Theme } from "theme-ui";

  enum themeNames {
    base = "base",
    dark = "dark",
    deep = "deep",
    funk = "funk",
    future = "future",
    roboto = "roboto",
    swiss = "swiss",
    system = "system",
    tosh = "tosh",
    bootstrap = "bootstrap",
    bulma = "bulma",
    polaris = "polaris",
    tailwind = "tailwind",
  }

  const presets: Record<themeNames, Theme>;

  export = presets;
}

/**
 * @description svg image uri  (base64)
 */

declare module "*.svg";

/**
 * @description png image uri  (base64)
 */

declare module "*.png";

/**
 * @desciption gatsby-image PAKET TYPESCRIPT DEFINICIJA (FALILA JE PA SAM JE JA ZADAO) (PROBLEM JE JEDINO STO ESLINT GOVORI DA JE URESOLVED UVOZ, ZATO UVEK IGNORISM LINE GDE UVOZIM OVAJ PAKET)
 * @author Rade
 *
 */
declare module "gatsby-image" {
  import { FunctionComponent } from "react";

  type gatsbyImage = FunctionComponent<{
    fixed?: any;
    fluid?: any;
  }>;

  const GatsbyImage: gatsbyImage;

  export = GatsbyImage;
}
