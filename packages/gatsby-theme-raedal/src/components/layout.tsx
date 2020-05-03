/** @jsx jsx */
// gatsby-image   KOMPONENTA
// import GatsbyImage from "gatsby-image";

import { jsx, ThemeProvider } from "theme-ui";
// import { RouterProps } from "@reach/router";

import {
  Fragment,
  // useReducer,
  // useState,
  // useRef,
  useContext,
  useEffect,
  // -->  types
  FunctionComponent,
} from "react";

import { Global, css } from "@emotion/core";

import theme from "../gatsby-plugin-theme-ui/index";

// ********  HEADER STATE PROVIDER   ********************
//
import HeaderStateProvider from "../context_n_reducers/context_providers/headerStateProvider";

// **********************Blog Post Context stuff
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

// ********************************************

// ********  useHeader CUSTOM HOOK   ********************
import Header from "./header";
// === !==  === !==  === !==  === !==  === !==  === !==

import Main from "./main";
import Article from "./article";
import Seo from "../seo/seo";
// === !==  === !==  === !==  === !==  === !==  === !==

// CONTEXT ZA Layout LEVEL
/* import { $_createLayoutReducerState } from "../context_n_reducers/_context_n_reducer_layout"; */

// === !==  === !==  === !==  === !==  === !==  === !==
/* const {
  LayoutStateProvider,
  layoutReducer,
  defaultLayoutState,
} = $_createLayoutReducerState; */
// === !==  === !==  === !==  === !==  === !==  === !==

// console.log(theme.fontSizes);
// import { ACTION_TYPES_ENUM } from "../context_n_reducers/context_n_reducer_header";
//

interface LayoutPropsI {
  body: string;
  updated: string;
  path?: string;
}

const Layout: FunctionComponent<LayoutPropsI> = ({ body, updated }) => {
  // === !==

  // === !==  LAYOUT REDUCER
  /* const [reducedLayoutState, dispatchToLayout] = useReducer(
    layoutReducer,
    defaultLayoutState
  ); */

  ////////////////////////////////////////////////////////////////

  const { blogPostContext } = $_useBlogPostReducerState;

  const { seo } = useContext(blogPostContext);

  useEffect(
    () => () => {
      console.log("!!!! LAYOUT UNMOUNTING !!!!");
    },
    []
  );

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        {/*  ODAVDE MOZE DA IDE   Layout  STATE  PROVIDER   */}
        {/* <LayoutStateProvider
          value={{ reducedLayoutState, layoutDispatch: dispatchToLayout }}
        > */}
        <Global
          styles={{
            html: {
              // scrollBehavior: "smooth",    // OVO NEMOJ DA ENABLE-UJES
            },
            body: {
              // PRIMETIO SAM DA JE JASON KADA JE DEFINISAO ZA BODY
              // USTVARI DODAO MARGINE 4px
              // PA SAM I JA DODAO; IAKO NE ZNAM ZASTO

              margin: "4px",
              backgroundColor: "rgb(27, 34, 39)",
              paddingTop: "56px",
              // scrollBehavior: "smooth",

              // OBRATI PAZNJU DA KADA DODAS MARGINE, TI CES IMATO OVERFLOW SCROLL
              // ZA BODY STO NIJE DOBRO

              //width: "100%", // DA NISAM DODAO MARGINE, MOGAO SAM
              //                      DEFINISATI width: 100%

              // width: "calc(100vw - 4px)",
            },

            "[data-language]": {
              border: "red solid 1px",

              "&::before": {
                content: "attr(data-language)",
                display: "inline-block",
              },
            },
          }}
        />
        {/* HEADER STATE PROVIDER */}
        <HeaderStateProvider>
          <Header />
        </HeaderStateProvider>

        {/* '''''''''''''''''''' */}
        <Main>
          <Seo {...seo} />
          <Article updated={updated} body={body} />
        </Main>
        {/* <button
          sx={{
            variant: "myButton",
          }}
          type="button"
          >
          Press me
        </button> */}
        {/* </LayoutStateProvider> */}
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
