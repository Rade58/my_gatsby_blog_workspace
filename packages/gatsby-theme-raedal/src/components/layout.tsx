/** @jsx jsx */
// gatsby-image   KOMPONENTA
// import GatsbyImage from "gatsby-image";

import { jsx, ThemeProvider } from "theme-ui";

import {
  Fragment,
  useReducer,
  // useState,
  // useRef,
  // -->  types
  FunctionComponent,
} from "react";

import { Global, css } from "@emotion/core";

import theme from "../gatsby-plugin-theme-ui/index";

// ********  HEADER STATE PROVIDER   ********************
//
import HeaderStateProvider from "../context_n_reducers/context_providers/headerStateProvider";
// ********  useHeader CUSTOM HOOK   ********************
import useHeader from "../custom_hooks/useHeader";
// === !==  === !==  === !==  === !==  === !==  === !==

import Main from "./main";
// === !==  === !==  === !==  === !==  === !==  === !==

// CONTEXT ZA Layout LEVEL
import { $_createLayoutReducerState } from "../context_n_reducers/context_n_reducer_layout";

// === !==  === !==  === !==  === !==  === !==  === !==
const {
  LayoutStateProvider,
  layoutReducer,
  defaultLayoutState,
} = $_createLayoutReducerState;
// === !==  === !==  === !==  === !==  === !==  === !==

// console.log(theme.fontSizes);
// import { ACTION_TYPES_ENUM } from "../context_n_reducers/context_n_reducer_header";
//

const Layout: FunctionComponent = ({ children }) => {
  // === !==

  const [Header] = useHeader();

  // === !==  LAYOUT REDUCER
  const [reducedLayoutState, dispatchToLayout] = useReducer(
    layoutReducer,
    defaultLayoutState
  );

  ////////////////////////////////////////////////////////////////

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        {/*  ODAVDE MOZE DA IDE   Layout  STATE  PROVIDER   */}
        <LayoutStateProvider
          value={{ reducedLayoutState, layoutDispatch: dispatchToLayout }}
        >
          <Global
            styles={{
              body: {
                margin: "4px",
                backgroundColor: "rgb(27, 34, 39)",
                paddingTop: "56px",
                scrollBehavior: "smooth",
              },
            }}
          />
          {/* HEADER STATE PROVIDER */}
          <HeaderStateProvider>
            <Header />
          </HeaderStateProvider>
          {/* '''''''''''''''''''' */}
          <Main>{children}</Main>
          {/* <button
          sx={{
            variant: "myButton",
          }}
          type="button"
          >
          Press me
        </button> */}
        </LayoutStateProvider>
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
