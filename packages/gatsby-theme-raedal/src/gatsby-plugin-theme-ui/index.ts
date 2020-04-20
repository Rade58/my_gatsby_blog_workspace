import { deep as theme } from "@theme-ui/presets";
import { Theme, ButtonProps, TextProps, ThemeProviderProps } from 'theme-ui'


// import { ThemeProvider } from "theme-ui";  // OVO NE KORISTIM OVDE
//                                            ALI CIST TI OSTAVLJAM KAO
//                                          PODSETNIK DA OVOM KOMPONENTOM
//                                            MORAS WRAPP-OVATI LAYOUT
//                                            DA BI MOGAO KORISTITI STILOVE
//                                             KOJE BRING-UJE PRESET

// ThemeProvider UZIMA TEMU KAO PROP theme

const myButton: ButtonProps = {



}

const typography: Theme = {
  fontSizes: {

  }
}


const myTheme = {
  ...theme,
  myButton
}


export default myTheme