/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import { FunctionComponent } from "react";

import TableOfHeadings from "./table-of-headers";

// SADA UVOZIM Keyword KOMPONENTU, KOJ UZELIM DA RENDER-UJEM KAO DEO GRID-A
import Keywords from "./keywords";

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

        /* width: 100vw; */

        grid-template-columns: repeat(8, minmax(0, 1fr));

        @media screen and (min-width: 918px) {
          grid-template-areas:
            " . a a a a a b b"
            " k a a a a a b b"
            " k a a a a a b b"
            " . a a a a a t t"
            " . a a a a a . .";
        }
        @media screen and (min-width: 1100px) {
          grid-template-areas:
            " . a a a a a a b "
            " k a a a a a a b "
            " . t a a a a a b "
            " . t a a a a a t "
            " . k a a a a a t ";
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
          " t t t t t t t t"
          " k k k k k k k k"
          " k k k k k k k k";

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

          /* align-self: stretch; */
        }

        & section.social-posting {
          grid-area: t;

          border: yellow solid 2px;
          position: sticky;

          top: 38vh;
        }

        & section.keywords {
          grid-area: k;
          position: sticky;
          top: 58vh;
        }
      `}
    >
      {children}
      {/* ZAMENI OVO KONKRETNIM KOMPONENTAMA, KADA IH BUDES NAPRAVIO */}
      <TableOfHeadings />
      {/* EVO OVDE MOZES RENDER-OVATI Keywords */}
      <Keywords />
      {/* <section className="adds">
        <h4>Adds</h4>
        <div>
          Donec pellentesque pharetra lectus, vel malesuada neque euismod id.
          Quisque porta aliquam augue non sagittis. Nulla dui nulla, efficitur
          eu sagittis ac, sollicitudin eu urna. Ut pretium, sapien eu
          scelerisque consequat, dolor felis cursus ipsum, in consectetur nulla
          nulla in ex. Vestibulum non diam imperdiet, ornare mauris at, aliquam
          est.
        </div>
      </section> */}
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
