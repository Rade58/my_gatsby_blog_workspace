/** @jsx jsx */
// gatsby-image   KOMPONENTA
// import GatsbyImage from "gatsby-image";

import { jsx, ThemeProvider } from "theme-ui";

import {
  Fragment,
  useState,
  useRef,
  useEffect,
  // -->  types
  FunctionComponent,
} from "react";

import { Global, css } from "@emotion/core";

import theme from "../gatsby-plugin-theme-ui/index";

// LOREM IPSUM
// import LoremIpsum from "./dev-utility/lorem-ipsum";
//

// ********  HEADER STATE PROVIDER   ********************
//
import HeaderStateProvider from "../context_n_reducers/context_providers/headerStateProvider";
// ********  useHeader CUSTOM HOOK   ********************
import useHeader from "../custom_hooks/useHeader";
// === !==  === !==  === !==  === !==  === !==  === !==

// console.log(theme.fontSizes);

const Layout: FunctionComponent = ({ children }) => {
  // === !==

  const [state, Header, dispatch] = useHeader();
  console.log(state);

  // === !==

  ////////////////////////////////////////////////////////////////

  // REGULISE STA CU DEFINISATI U useEffect-u
  const [
    scrollHandlerAttachedOnBody,
    setScrollHandlerAttachedOnBody,
  ] = useState(false);

  const currentScrollRef = useRef<number>();

  // OVA FUNKCIJA SE MORA TRIGGEROVATI, DA SE SCROLL HANDLER ZAKACI NA BODY (TO
  // SE DESAVA SAM OJEDNOM)

  /* useEffect(() => {
    const windowEl: Window = window || document.documentElement;
    const bodyEl: HTMLElement =
      document.body || document.getElementsByTagName("body")[0];

    
    currentScrollRef.current = reducedState.currentScroll;

    if (bodyEl && !scrollHandlerAttachedOnBody) {
      /

      bodyEl.onscroll = (e) => {
        if (currentScrollRef.current) {
          /
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
 */

  /* useEffect(() => {
    return () => {
      console.log("Use Effect 2");

      const bodyEl = document.body || document.getElementsByTagName("body")[0];

      if (scrollHandlerAttachedOnBody && bodyEl.onscroll) {
        bodyEl.onscroll = null;
      }
    };
  }, []); */
  ////////////////////////////////////////////////////////////////////////

  // const { scrolled_class, currentScroll } = reducedState;

  return (
    <Fragment>
      {/* <Provider value={{ dispatch, reducedState }}> */}
      <ThemeProvider theme={theme}>
        <Global
          styles={{
            body: {
              margin: "4px",
              backgroundColor: "rgb(27, 34, 39)",
              paddingTop: "56px",
              scrollBehavior: "revert",
            },
          }}
        />
        {/* HEADER STATE PROVIDER */}
        <HeaderStateProvider>
          <Header />
        </HeaderStateProvider>
        {/* '''''''''''''''''''' */}
        <main
          css={css`
            display: grid;

            @media screen and (min-width: 918px) {
              grid-template-areas:
                " . a a a a a . "
                " . a a a a a b "
                " . a a a a a b "
                " . a a a a a t "
                " . a a a a a . ";
            }
            @media screen and (min-width: 1100px) {
              grid-template-areas:
                " . a a a a . . "
                " . a a a a b b "
                " t a a a a b b "
                " t a a a a . . "
                " . a a a a . . ";
            }

            grid-template-areas:
              " a a a "
              " a a a "
              " a a a "
              " a a a "
              " a a a "
              " b b b "
              " t t t ";

            & article {
              &.post-article {
                grid-area: a;
              }
            }

            & section.adds {
              margin-top: 42px;

              grid-area: b;

              border: pink solid 4px;
            }

            & section.social-posting {
              grid-area: t;

              border: yellow solid 2px;
            }
          `}
        >
          {children}
          <section className="adds">
            <h4>Adds</h4>
            <div>
              Donec pellentesque pharetra lectus, vel malesuada neque euismod
              id. Quisque porta aliquam augue non sagittis. Nulla dui nulla,
              efficitur eu sagittis ac, sollicitudin eu urna. Ut pretium, sapien
              eu scelerisque consequat, dolor felis cursus ipsum, in consectetur
              nulla nulla in ex. Vestibulum non diam imperdiet, ornare mauris
              at, aliquam est.
            </div>
          </section>
          <section className="social-posting">twitter instagram</section>
          {/* /////////-----------------------///////////////// */}
          {/* <div
            css={css`
              font-size: 28px;
            `}
          /> */}
          {/* /////////-----------------------///////////////// */}
          {/* SAMO TU DA STVORI PROSTOR */}
          {/* <LoremIpsum /> */}
          {/* <LoremIpsum /> */}
          {/* <LoremIpsum /> */}
          {/* /////////////////////// */}
        </main>
        {/* <button
          sx={{
            variant: "myButton",
          }}
          type="button"
        >
          Press me
        </button> */}
      </ThemeProvider>
      {/* </Provider> */}
    </Fragment>
  );
};

export default Layout;
