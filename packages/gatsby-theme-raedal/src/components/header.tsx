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
  }, []);
  ////////////////////////////////////////////////////////////////////////

  // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==
  // MUTATION OBSERVER WILL TRIGGER ON ANY DISPATCH
  // ZBOG PROMENE ATRIBUT NA REF-U

  // === !== === !== === !== === !== === !== === !== === !== === !== === !== === !==

  return (
    <header
      className={scrolled_class}
      // className="pull-up"
      sx={{
        backgroundImage: additionalStyles.headerBackgroundImage,
      }}
      css={css`
        /* border-top: 14px solid purple; */

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
          top: -56px;
        }
        /* u suprotnom se spusta (ODNOSNO VRACA U POCETNI POLOZAJ) */
        &.pull-down {
          top: 0;
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
      <RightHArrow />
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
