/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";

import {
  Fragment,
  useState,
  useReducer,
  // -->   types
  FunctionComponent,
  Reducer,
  ReducerState,
  ReducerAction,
} from "react";
import { Global, css } from "@emotion/core";

//
import theme from "../gatsby-plugin-theme-ui/index";
//

// LOREM IPSUM
import LoremIpsum from "./dev-utility/lorem-ipsum";
//

// ********  REDUCER STUFF   ********************
// REDUCER CU KORISTITI ZA STATE KOJI SE NE MANJE FROM PAGE TO PAGE

enum ACTIONS_ENUM {
  SCROLL_UP = "SCROLL_UP",
  SCROLL_DOWN = "SCROLL_DOWN",
}

interface StateI {
  blah: string;
}

const reducer: Reducer<StateI, ACTIONS_ENUM> = (state, action) => {
  let placeholder;
  return state;
};

// ************   *************************************

const Layout: FunctionComponent = ({ children }) => {
  const state = useReducer(reducer, { blah: "" });

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Global
          styles={{
            body: {
              margin: "4px",
              backgroundColor: "olive",
              paddingTop: "56px",
            },
          }}
        />
        <header
          css={css`
            /* border-top: 14px solid purple; */

            height: 56px;
            border-bottom: black 2px solid;

            background-color: #ffffff;

            position: fixed;
            width: 100%;
            top: 0;
            left: 0;

            &.scroll-down {
              top: -52px;
            }
          `}
        >
          <strong>Blog Post Layout</strong>
        </header>
        <main>
          {children}
          {/* SAMO TU DA STVORI PROSTOR */}
          <LoremIpsum />
          {/* /////////////////////// */}
        </main>
        <button
          sx={{
            variant: "myButton",
          }}
          type="button"
        >
          Press me
        </button>
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
