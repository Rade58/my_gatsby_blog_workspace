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
  useRef,
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
  path?: string;
}

const Layout: FunctionComponent<LayoutPropsI> = ({ body }) => {
  // === !==

  // === !==  LAYOUT REDUCER
  /* const [reducedLayoutState, dispatchToLayout] = useReducer(
    layoutReducer,
    defaultLayoutState
  ); */

  ////////////////////////////////////////////////////////////////
  const articleRef = useRef<HTMLElement>(null);
  //
  // PROVERA ARTICLE REF-A
  /*  useEffect(() => {
    console.log({ articleRef });

    console.log(articleRef.current);
  }, [articleRef]);
 */
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
          styles={css`
            /* DEFINISUCU OVDE     @font-face    NAMENJEN ZA CODE BLOCK  (ODNOSN OZA PRISM)    */

            @font-face {
              font-family: "Fira Code";
              src: url("../../fonts/fira/FiraCode-VariableFont_wght.ttf")
                format("ttf-variations");

              font-weight: 125 950;
              font-stretch: 75% 125%;
              font-style: oblique 0deg 20deg;
            }

            html {
              /*  */
              scroll-behavior: smooth;
            }

            body {
              /* PRIMETIO SAM DA JE JASON KADA JE DEFINISAO ZA BODY */
              /* USTVARI DODAO MARGINE 4px */
              /* PA SAM I JA DODAO; IAKO NE ZNAM ZASTO */

              margin: 4px;
              background-color: rgb(27, 34, 39);
              padding-top: 56px;

              border: pink solid 4px;

              /* OBRATI PAZNJU DA KADA DODAS MARGINE, TI CES IMATO OVERFLOW SCROLL */
              /* ZA BODY STO NIJE DOBRO */

              /*  */
              /* width: 100%; // DA NISAM DODAO MARGINE, MOGAO SAM */
              /* DEFINISATI width: 100% */

              /* width: "calc(100vw - 4px)", */
            }

            /** ZA CODE BLOCK (DISPLAY LANGUAGE-A, I DISPLAY PATH-A) */

            /*  ---------------------------------- */
          `}
        />
        {/* HEADER STATE PROVIDER */}
        <HeaderStateProvider>
          <Header />
        </HeaderStateProvider>

        {/* '''''''''''''''''''' */}
        <Main articleReference={articleRef}>
          <Seo {...seo} />
          <Article body={body} ref={articleRef} />
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
