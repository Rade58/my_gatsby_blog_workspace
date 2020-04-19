/** @jsx jsx */
// gatsby-image   KOMPONENTA
import GatsbyImage from "gatsby-image";

import { jsx, ThemeProvider } from "theme-ui";

import {
  Fragment,
  useState,
  useReducer,
  useRef,
  useEffect,
  // -->  types
  FunctionComponent,
  Reducer,
} from "react";

import { Global, css } from "@emotion/core";

import theme from "../gatsby-plugin-theme-ui/index";

// LOREM IPSUM
import LoremIpsum from "./dev-utility/lorem-ipsum";
//

import ScrollIndicator from "./scroll-indicator";

// IKONE (data: URI-EVI)
import gitHubIconUri from "../ICONS/AJ_using/github_full.svg";
//

// ********  REDUCER STUFF DOLE   ********************
// REDUCER CU KORISTITI ZA STATE KOJI SE NE MANJE FROM PAGE TO PAGE

enum ACTION_TYPES_ENUM {
  CHANGE_CURRENT_SCROLL = "CHANGE_CURRENT_SCROLL",
  SET_TO_SCROLL_UP_CLASS = "SET_TO_SCROLL_UP_CLASS",
  SET_TO_SCROLL_DOWN_CLASS = "SET_TO_SCROLL_DOWN_CLASS",
}

interface StateI {
  scrolled_class: "pull-up" | "pull-down";
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

  if (action.type === ACTION_TYPES_ENUM.SET_TO_SCROLL_DOWN_CLASS) {
    return { ...state, scrolled_class: "pull-up" };
  }

  if (action.type === ACTION_TYPES_ENUM.SET_TO_SCROLL_UP_CLASS) {
    return { ...state, scrolled_class: "pull-down" };
  }

  return state;
};

const defaultState: StateI = {
  scrolled_class: "pull-down",
  currentScroll: 0,
};

// ***************************************************
// ************       REDUCER STVARI GORE       ******
// ***************************************************

const Layout: FunctionComponent = ({ children }) => {
  // KORISCENJE REDUCER FUNKCIJE
  const [reducedState, dispatch] = useReducer(reducer, defaultState);

  ////////////////////////////////////////////////////////////////

  // REGULISE STA CU DEFINISATI U useEffect-u
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
          // console.log(currentScrollRef.current - windowEl.scrollY);
          //
          if (currentScrollRef.current - windowEl.scrollY < 0) {
            dispatch({ type: ACTION_TYPES_ENUM.SET_TO_SCROLL_DOWN_CLASS });
          } else {
            dispatch({ type: ACTION_TYPES_ENUM.SET_TO_SCROLL_UP_CLASS });
          }
        }

        const capturedScrollY = windowEl.scrollY;

        dispatch({
          type: ACTION_TYPES_ENUM.CHANGE_CURRENT_SCROLL,
          payload: capturedScrollY,
        });
      };

      //
      setScrollHandlerAttachedOnBody(true);
    }
  }, [scrollHandlerAttachedOnBody, reducedState.currentScroll]);

  ////////////////////////////////////////////////////////////////////////////

  /////////////////////******   CLENUP useEffect  (DA MOGUCE JE DEFINISATI MULTIPLE useEffects) */

  // ZASTO SAM OVDE DEFINISAO CLEANUPM PA TO JE ZATO STO SE RETURNED FUNKCIJA
  // IZ useEffecta RUNN-UJE SVAKU PUT KADA SE NEKI DEPENDANCY IZ DEPENDANCY NIZA
  // PROMENIO
  // ALI JA CU SADA OVDE STAVITI PRAZAN DEPENDANCY ARRAY
  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      console.log("Use Effect 2");

      const bodyEl = document.body || document.getElementsByTagName("body")[0];

      // OVO CE BITI TRUE, KADA SE PRVI PUT IZVRSI GORNJI
      if (scrollHandlerAttachedOnBody && bodyEl.onscroll) {
        bodyEl.onscroll = null;
      }
    };
  }, []); // MORA EMPTY ARRAY DA BI PRI UNMOUNTING-U ZAVAO GORNJI RETURNED CLEANUP CALLBACK
  ////////////////////////////////////////////////////////////////////////

  const { scrolled_class, currentScroll } = reducedState;

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Global
          styles={{
            body: {
              margin: "4px",
              backgroundColor: "rgb(27, 34, 39)",
              paddingTop: "56px",
            },
          }}
        />
        <header
          css={css`
            /* border-top: 14px solid purple; */

            display: flex;

            height: 58px;
            border-bottom: black 2px solid;

            background-color: #ffffff;

            background-image: linear-gradient(
              to right,
              rgb(63, 44, 56),
              rgb(38, 45, 59)
            );

            position: fixed;
            width: 100%;
            left: 0;

            /* transition */
            transition-property: top;
            transition-timing-function: ease-in;
            transition-duration: 0.2s;
            /* kada scroll-ujem down element treba da se digne above */
            &.pull-up {
              top: -56px;
            }
            /* u suprotnom se spusta (ODNOSNO VRACA U POCETNI POLOZAJ) */
            &.pull-down {
              top: 0;
            }
          `}
          className={scrolled_class}
        >
          <section
            className="solial-icons"
            css={css`
              display: flex;

              justify-content: center;
              align-items: center;

              border: pink solid 2px;
              width: 50%;
              margin-left: auto;

              & a {
                margin: 0 5%;
              }
            `}
          >
            <a href="https://twitter.com/ra_decodes">
              <img src={gitHubIconUri} alt="github logo" />
            </a>
            <a href="https://twitter.com/ra_decodes">
              <img src={gitHubIconUri} alt="github logo" />
            </a>
            <a href="https://twitter.com/ra_decodes">
              <img src={gitHubIconUri} alt="github logo" />
            </a>
          </section>

          <strong>Layout</strong>
          <ScrollIndicator
            bc="rgb(38, 45, 59)"
            fill="rgba(153, 67, 95, 0.74)"
            currentWindowScrollY={currentScroll}
            bcImg="linear-gradient(
              to right,
              rgba(63, 44, 56, 1),
              rgba(38, 45, 59, 1)
            )"
          />
        </header>
        <main>
          {children}
          {/* /////////-----------------------///////////////// */}
          <div
            css={css`
              font-size: 28px;
            `}
          >
            {currentScroll}
          </div>
          {/* /////////-----------------------///////////////// */}
          {/* SAMO TU DA STVORI PROSTOR */}
          <LoremIpsum />
          <LoremIpsum />
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
