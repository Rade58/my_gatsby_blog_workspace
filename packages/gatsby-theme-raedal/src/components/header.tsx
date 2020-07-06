/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import { Link } from "gatsby";
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
import NavInHeader from "./nav-header";
import ScrollIndicator from "./scroll-indicator";

//

import gitHubIconUri from "../ICONS/AJ_using/github_badge.svg";
import twitterIconUri from "../ICONS/AJ_using/twitter_circle.svg";

//

import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

//

import { additionalStyles } from "../common-styles";

// === !== === !== === !== === !== === !==
// import RightArrow from "./right-arrow";
// import LeftArrow from "./left-arrow";
import RightHArrow from "./right-h-arrow";
import LeftHArrow from "./left-h-arrow";
// === !== === !== === !== === !== === !==

// =======================================================
// import TableOfKeywords from "../static_query_components/table-of-keywords";
import Kebab from "./kebab";
// =======================================================

/* export type UseHeaderCustomHookReturn = [
  // HeaderStateI,
  FunctionComponent
  // HeaderContDispatch
]; */

// KOMPONENTA

const Header: FunctionComponent = () => {
  const { reducedHeaderState /* , headerDispatch  */ } = useContext(
    $_useReducerState.headerContext
  );

  const { blogPostContext } = $_useBlogPostReducerState;

  const { reducedBlogPostState } = useContext(blogPostContext);

  const { setJumpersSlidingClass, pigDisapear } = reducedBlogPostState;

  const {
    scrolled_class /* , currentScroll, pigDisapear  */,
  } = reducedHeaderState;

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

      const bodyEl = document.body || document.getElementsByTagName("body")[0];

      if (scrollHandlerAttachedOnBody && bodyEl.onscroll) {
        bodyEl.onscroll = null;
      }

      console.log("!!!!HEADER IS UNMOUNTING!!!!");
    };
  }, [scrollHandlerAttachedOnBody]);
  ////////////////////////////////////////////////////////////////////////

  // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==
  // MUTATION OBSERVER WILL TRIGGER ON ANY DISPATCH
  // ZBOG PROMENE ATRIBUT NA REF-U

  // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==

  useEffect(() => {
    setJumpersSlidingClass(
      scrolled_class === "pull-down" ? "slide-left" : "slide-right"
    );
  });

  return (
    <header
      // style={{backgroundColor: pigDisapear?"":"inherit"}}
      className={scrolled_class}
      // className="pull-up"

      css={css`
        /* border-top: 14px solid purple; */

        box-shadow: 0 0px 2.2px rgba(0, 0, 0, 0.55),
          0 0.1px 5.3px rgba(0, 0, 0, 0.434), 0 0.2px 10px rgba(0, 0, 0, 0.382),
          0 0.5px 17.9px rgba(0, 0, 0, 0.355),
          0 0.9px 33.4px rgba(0, 0, 0, 0.326), 0 2px 80px rgba(0, 0, 0, 0.262);
        background-image: ${additionalStyles.headerBackgroundImage};

        padding-top: 6px;

        z-index: 100;
        display: flex;

        justify-content: space-between;

        /* width: 100%; */

        height: 58px;
        border-bottom: black 2px solid;

        background-color: #ffffff;

        /* background-image: linear-gradient(
          to right,
          rgb(63, 44, 56),
          rgb(38, 45, 59)
        ); */

        position: fixed;
        width: 100%;
        left: 0;

        /* transition */
        transition-property: top;
        transition-timing-function: ease-in;
        transition-duration: 0.2s;
        /* kada scroll-ujem down element treba da se digne above */
        &.pull-up {
          top: -60px;
        }
        /* u suprotnom se spusta (ODNOSNO VRACA U POCETNI POLOZAJ) */
        &.pull-down {
          top: -4px;
        }

        /* SAMO MENJAM VEREDNOSTI ZA KLASE AKO JE REC O MANJEM EKRANU */

        @media screen and (min-width: 918px) {
          &.pull-down {
            top: -56px;
          }
          &.pull-up {
            top: -56px;
          }
        }

        /* === !== HEADER ARROWS === !==*/

        & section.left-h-arr,
        & section.right-h-arr {
          & a {
            & span[role="img"] {
              /* color: blanchedalmond; */
              /* font-size: 38px; */
            }
          }
        }

        /* & section.left-h-arr {
          font-size: 34px;
        }

        & section.right-h-arr {
          font-size: 34px;
        } */

        /* =================== */

        & div.home-link {
          border: tomato solid 1px;

          display: flex;
          align-items: center;

          & a {
            color: blanchedalmond;
            font-size: 1.4em;
          }
        }
      `}
    >
      {/* <NavInHeader /> */}

      {/* <section
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
        <a href="https://twitter.com/ra_decodes">
          <img src={gitHubIconUri} alt="github logo" />
        </a>
        <a href="https://twitter.com/ra_decodes" target="blank">
          <img src={twitterIconUri} alt="twitter icon" />
        </a>
        <a href="https://github.com/Rade58" target="blank">
          <img src={gitHubIconUri} alt="github icon" />
        </a>
      </section> */}

      {/* <RightArrow /> */}
      {/* <LeftArrow /> */}
      <LeftHArrow />
      <div className="home-link">
        <Link to="/">
          <span role="img" aria-label="home">
            🏡
          </span>
        </Link>
      </div>
      {/* === !== ALGOLIA PLACEHOLDER === !== */}
      <div
        className="alg-placehold"
        css={css`
          display: flex;
          & > div {
            width: 3rem;
            border: blanchedalmond 2px inset;
            height: 1rem;
            margin: auto;
          }
        `}
      >
        <div />
      </div>
      {/* =====ALG GORE==== */}
      <Kebab />
      <RightHArrow />
      {/* <TableOfKeywords /> */}
      {/* === !== === !== */}

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

export default Header;
