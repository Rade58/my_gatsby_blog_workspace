/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import { FunctionComponent } from "react";

// LOREM IPSUM
// import LoremIpsum from "./dev-utility/lorem-ipsum";
//

const Main: FunctionComponent = ({ children }) => {
  let a;

  /* "[h2, h3, h4, h5, h6]": {
    padding-top: "45px",

    padding-bottom: "18px",
  }
 */

  return (
    <main
      css={css`
        display: grid;

        width: 100vw;

        grid-template-columns: repeat(12, minmax(0, 1fr));

        @media screen and (min-width: 918px) {
          grid-template-areas:
            " . . a a a a . ."
            " . . a a a a b b"
            " . . a a a a b b"
            " . . a a a a t t"
            " . . a a a a t t";
        }
        @media screen and (min-width: 1100px) {
          grid-template-areas:
            " . . a a a a . . "
            " . . a a a a b b "
            " t t a a a a b b "
            " t t a a a a . . "
            " . . a a a a . . ";
        }

        grid-template-areas:
          " a a a a a a a a"
          " a a a a a a a a"
          " a a a a a a a a"
          " a a a a a a a a"
          " a a a a a a a a"
          " b b b b b b b b"
          " b b b b b b b b"
          " b b b b b b b b"
          " t t t t t t t t"
          " t t t t t t t t"
          " t t t t t t t t";

        & article {
          &.post-article {
            grid-area: a;
            /* width: 60vw; */

            display: flex;

            flex-direction: column;

            pre {
              /* width: 100%; */
            }
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
      {/* ZAMENI OVO KONKRETNIM KOMPONENTAMA, KADA IH BUDES NAPRAVIO */}
      <section className="adds">
        <h4>Adds</h4>
        <div>
          Donec pellentesque pharetra lectus, vel malesuada neque euismod id.
          Quisque porta aliquam augue non sagittis. Nulla dui nulla, efficitur
          eu sagittis ac, sollicitudin eu urna. Ut pretium, sapien eu
          scelerisque consequat, dolor felis cursus ipsum, in consectetur nulla
          nulla in ex. Vestibulum non diam imperdiet, ornare mauris at, aliquam
          est.
        </div>
      </section>
      <section className="social-posting">twitter instagram</section>
      {/* ------------------------------------------------------------- */}
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
  );
};

export default Main;
