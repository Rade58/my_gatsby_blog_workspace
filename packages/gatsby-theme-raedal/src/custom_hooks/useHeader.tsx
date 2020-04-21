// https://github.com/Rade58/1_pure_react_project/blob/17_testing/src/useDropdown.js

// KORISTIM DAKLE PRINICIM, KOJI JE PRIMENJEN U GORNJEM LINKU
// ZATO CU SADA DEFINISATI CUSTOM HOOK

// USTVARI PRINCIP JE SLICAN, JER PRINCIP SA LINKA, NE KORISTI
// REDUCER STATE, VEC SE U CUSTOM KOMPONENTI KORISTI, NJEN
// STATE PROVIDED BU      useState

// ALI JA CU SADA PROBATI OVDE DA KORISTIM useContext

import { css } from "@emotion/core";

import React, { useContext, FunctionComponent } from "react";

import {
  $_useReducerState,
  // types  (  FOR    RETURNED ARRAY)
  HeaderStateI,
  HeaderContDispatch,
} from "../context_n_reducers/context_n_reducer_header";

export type UseHeaderCustomHookReturn = [
  HeaderStateI,
  FunctionComponent,
  HeaderContDispatch
];

const useHeaderState: () => UseHeaderCustomHookReturn = () => {
  // REDUCER STATE
  const { reducedHeaderState, headerDispatch } = useContext(
    $_useReducerState.headerContext
  );

  const { scrolled_class } = reducedHeaderState;

  // KOMPONENTA

  const Header: FunctionComponent = ({ children }) => (
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
      {children}
      {/* <TableOfContent />
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
          pigDirection={scrolled_class === "pull-up" ? "to-left" : "to-right"}
          bc="rgb(38, 45, 59)"
          fill="rgba(153, 67, 95, 0.74)"
          currentWindowScrollY={currentScroll}
          bcImg="linear-gradient(
      to right,
      rgba(63, 44, 56, 1),
      rgba(38, 45, 59, 1)
      )"
        /> */}
    </header>
  );

  // I SVI ONI IDU ZAJEDNO KAO, JEDAN HOOK

  return [reducedHeaderState, Header, headerDispatch];
};

export default useHeaderState;
