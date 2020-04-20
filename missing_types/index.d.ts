/**
 * @description Preset themes for theme-ui 
 * @author Rade
 */

declare module "@theme-ui/presets" {
  import { Theme } from 'theme-ui'

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
    tailwind = "tailwind"
  }


  const presets: Record<themeNames, Theme>

  export = presets
}

/**
 * @description svg image uri  (base64)
 */

declare module '*.svg'

/**
 * @description png image uri  (base64)
 */

declare module '*.png'

