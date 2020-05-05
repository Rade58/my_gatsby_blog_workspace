import { deep as theme } from "@theme-ui/presets";
import { Theme, ButtonProps, TextProps, ThemeProviderProps, Divider, DividerProps, BoxProps } from 'theme-ui'


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

  },

}


const playgroundObject: Theme = {
  borderStyles: {
    headerBorder: "#d42e66 solid 2px"
  },

}



const myTheme: Theme = {
  ...theme,
  borders: {
    primary: { border: "#d42e66 solid 2px" }
  },
  /* buttons: {
    primary: {colo}
  } */

}


export default myTheme