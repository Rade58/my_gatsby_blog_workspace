// https://github.com/Rade58/1_pure_react_project/blob/17_testing/src/useDropdown.js (ISPOSTAVILO SE NA KRAJU DA OVO NIJE POMOGLO JER JE
// IPAK REC O DRUGACIJEM PRINCIPU)

// KORISTIM DAKLE PRINICIM, KOJI JE PRIMENJEN U GORNJEM LINKU
// ZATO CU SADA DEFINISATI CUSTOM HOOK

// USTVARI PRINCIP JE SLICAN, JER PRINCIP SA LINKA, NE KORISTI
// REDUCER STATE, VEC SE U CUSTOM KOMPONENTI KORISTI, NJEN
// STATE PROVIDED BU      useState

// ALI JA CU SADA PROBATI OVDE DA KORISTIM useContext

/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import {
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  FunctionComponent,
} from "react";

import {
  $_useReducerState,
  // types  (  FOR    RETURNED ARRAY)
  /* HeaderStateI,
  HeaderContDispatch, */
} from "../context_n_reducers/context_n_reducer_header";

// KOMPONENTE
import NavInHeader from "../components/nav-header";
import ScrollIndicator from "../components/scroll-indicator";

//

import gitHubIconUri from "../ICONS/AJ_using/github_badge.svg";
import twitterIconUri from "../ICONS/AJ_using/twitter_circle.svg";

//

import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

//

export type UseHeaderCustomHookReturn = [
  // HeaderStateI,
  FunctionComponent
  // HeaderContDispatch
];

const useHeaderState: () => UseHeaderCustomHookReturn = () => {
  // KOMPONENTA

  const Header: FunctionComponent = () => {
    const { reducedHeaderState, headerDispatch } = useContext(
      $_useReducerState.headerContext
    );

    /* reducedHeaderState_$ = reducedHeaderState;
    headerDispatch_$ = headerDispatch; */

    const { scrolled_class, currentScroll, pigDisapear } = reducedHeaderState;

    // const currentScrollRef = useRef<number>(0);

    const [
      scrollHandlerAttachedOnBody,
      setScrollHandlerAttachedOnBody,
    ] = useState(false);

    // __ === __ !== __ __ === __ !== __/ __ === __ !== __ __ === __ !== __

    // eslint-disable-next-line
    useEffect(() => {
      // CLEANING UP ZATO RETURN-UJE FUNKCIJU
      return () => {
        // console.log("Use Effect 2");

        const bodyEl =
          document.body || document.getElementsByTagName("body")[0];

        if (scrollHandlerAttachedOnBody && bodyEl.onscroll) {
          bodyEl.onscroll = null;
        }

        console.log("!!!!HEADER IS UNMOUNTING!!!!");
      };
    }, []);
    ////////////////////////////////////////////////////////////////////////

    // PRACENJE MUTATION-A NA HEADER-U (TJ NJEGOVOG class ATRIBUTA)

    // UZECU BLOG POST REDUCER STATE IME TRENUTNE KLASE
    /*  const {
      blogPostContext,
      BLOG_POST_ACTION_TYPES_ENUM,
    } = $_useBlogPostReducerState;
    //
    const { blogPostDispatch } = useContext(blogPostContext);

    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (headerRef.current) {
        const headerMutationCallback: MutationCallback = (
          mutationsList,
          observer
        ) => {
          if (mutationsList[0].attributeName === "class") {
            console.log(mutationsList);
            if (headerRef.current && headerRef.current.classList) {
              if (headerRef.current.classList.contains("pull-down")) {
                blogPostDispatch({
                  type: BLOG_POST_ACTION_TYPES_ENUM.HEADER_PULL_CHANGE,
                  payload: "pulled-down",
                });
              } else if (headerRef.current.classList.contains("pull-up")) {
                blogPostDispatch({
                  type: BLOG_POST_ACTION_TYPES_ENUM.HEADER_PULL_CHANGE,
                  payload: "pulled-up",
                });
              }
            }
          }
        };

        const hederMutationObserver = new MutationObserver(
          headerMutationCallback
        );

        hederMutationObserver.observe(headerRef.current, { attributes: true });
      }
    }, [headerRef]); */

    return (
      <header
        css={css`
          /* border-top: 14px solid purple; */

          z-index: 100;
          display: flex;

          /* width: 100%; */

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
        <NavInHeader />

        <section
          className="solial-icons"
          css={css`
            display: flex;

            justify-content: center;
            align-items: center;

            border: pink solid 2px;
            width: 28%;
            margin-left: auto;

            & a {
              margin: 0 2%;
            }
          `}
        >
          {/* {currentScroll} */}
          <a href="https://twitter.com/ra_decodes">
            <img src={gitHubIconUri} alt="github logo" />
          </a>
          <a href="https://twitter.com/ra_decodes" target="blank">
            <img src={twitterIconUri} alt="twitter icon" />
          </a>
          <a href="https://github.com/Rade58" target="blank">
            <img src={gitHubIconUri} alt="github icon" />
          </a>
        </section>
        <ScrollIndicator
          bc="rgb(38, 45, 59)"
          fill="rgba(153, 67, 95, 0.74)"
          bcImg="linear-gradient(
      to right,
      rgba(63, 44, 56, 1),
      rgba(38, 45, 59, 1)
      )"
        />
      </header>
    );
  };

  // I SVI ONI IDU ZAJEDNO KAO, JEDAN HOOK

  return [Header];
};

export default useHeaderState;
