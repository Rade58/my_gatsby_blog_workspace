/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";

import {
  Fragment,
  useState,
  useReducer,
  useRef,
  useLayoutEffect,
  FunctionComponent,
  Reducer,
  ReducerState,
  ReducerAction,
  useEffect,
  createRef,
  RefObject,
} from "react";

//
// import { createPortal } from "react-dom";

//

import { Global, css } from "@emotion/core";

//
import theme from "../gatsby-plugin-theme-ui/index";
//

// LOREM IPSUM
import LoremIpsum from "./dev-utility/lorem-ipsum";
//

// ********  REDUCER STUFF DOLE   ********************
// REDUCER CU KORISTITI ZA STATE KOJI SE NE MANJE FROM PAGE TO PAGE

enum ACTION_TYPES_ENUM {
  CHANGE_CURRENT_SCROLL = "CHANGE_CURRENT_SCROLL",
}

interface StateI {
  scrolled_up: boolean;
  currentScroll: number;
}

const reducer: Reducer<StateI, { type: ACTION_TYPES_ENUM; payload?: any }> = (
  state,
  action
) => {
  let placeholder;

  if (action.type === ACTION_TYPES_ENUM.CHANGE_CURRENT_SCROLL) {
    return { ...state, currentScroll: action.payload };
  }

  return state;
};

const defaultState: StateI = {
  scrolled_up: false,
  currentScroll: 0,
};

// ***************************************************
// ************       REDUCER STVARI GORE       ******
// ***************************************************

const Layout: FunctionComponent = ({ children }) => {
  // KORISCENJE REDUCER FUNKCIJE
  const [reducedState, dispatch] = useReducer(reducer, defaultState);

  //
  ////////////////////////////////////////////////////////////////

  const [
    scrollHandlerAttachedOnBody,
    setScrollHandlerAttachedOnBody,
  ] = useState(false);

  const currentScrollRef = useRef<number>();

  // OVA FUNKCIJA SE MORA TRIGGEROVATI, DA SE SCROLL HANDLER ZAKACI NA BODY (TO
  // SE DESAVA SAM OJEDNOM)

  useEffect(() => {
    const windowEl: Window = window || document.documentElement;
    const bodyEl: HTMLElement =
      document.body || document.getElementsByTagName("body")[0];

    // OVO JE MORALO OVAKO, ODNOSNO REFERENCA SE STALNO MENJA KADA
    // SE TRIGGER-UJE OVAJ EFFECT CALLBACK
    currentScrollRef.current = reducedState.currentScroll;

    if (bodyEl && !scrollHandlerAttachedOnBody) {
      // POSTARAO SAM SE DA    scrollHandlerAttachedOnBody  BUDE       false    SAMO NA POCETKU (DOLE SAM ZVAO NJEGOVU PROMENU)
      bodyEl.onscroll = (e) => {
        if (currentScrollRef.current) {
          console.log(currentScrollRef.current - windowEl.scrollY);

          //
        }

        const capturedScrollY = windowEl.scrollY;

        dispatch({
          type: ACTION_TYPES_ENUM.CHANGE_CURRENT_SCROLL,
          payload: capturedScrollY,
        });
      };

      setScrollHandlerAttachedOnBody(true);
    }

    /* return function cleanup() {
      if (bodyEl.onscroll && scrol) {
        console.log("CLEANING UP");
        bodyEl.onscroll = null;
      }
    };
 */
    // console.log({ windowEl, bodyEl });
  }, [scrollHandlerAttachedOnBody, reducedState.currentScroll]);

  ////////////////////////////////////////////////////////////////////////////

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
            left: 0;

            /* transition */
            transition-property: top;
            transition-timing-function: ease-in;
            transition-duration: 0.8s;
            /* kada scroll-ujem down element treba da se digne above */
            &.scroll-down {
              top: -52px;
            }
            /* u suprotnom se spusta */
            &.scroll-up {
              top: 0;
            }
          `}
          // className={headerScrollClass}
        >
          <strong>Blog Post Layout</strong>
        </header>
        <main>
          {children}
          {/* /////////-----------------------///////////////// */}
          <div
            css={css`
              font-size: 28px;
            `}
          >
            {reducedState.currentScroll}
          </div>
          {/* /////////-----------------------///////////////// */}
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
