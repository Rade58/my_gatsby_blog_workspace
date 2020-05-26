/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import { FunctionComponent } from "react";

import TableOfHeadings from "./table-of-headers";

// SADA UVOZIM Keyword KOMPONENTU, KOJ UZELIM DA RENDER-UJEM KAO DEO GRID-A
import Keywords from "./keywords";

// UVOZIM DVA ARROW-A
import LeftArrow from "./left-arrow";
import RightArrow from "./right-arrow";

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

        grid-template-columns: repeat(10, minmax(0, 1fr));

        grid-template-areas:
          "a a a a a a a a a a"
          "t t t t t t t t t t"
          "k k k k k k k k k k"
          "s s s s s s s s s s"
          "l r . . . . . . . .";

        /*==============================*/
        & section.tofh2 {
          grid-area: t;
        }
        & section.keywords {
          grid-area: k;
        }
        & section.social-posting {
          grid-area: s;
        }

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

        & div.left-arrow {
          grid-area: l;

          border: tomato solid 4px;
        }

        & div.right-arrow {
          grid-area: r;
          border: olive solid 4px;
        }

        /*==============================*/

        @media screen and (min-width: 918px) {
          grid-template-areas:
            " a a a a a a a a k k"
            " a a a a a a a a s s"
            " a a a a a a a a t t"
            " a a a a a a a a l r"
            " a a a a a a a a . .";

          & section.tofh2 {
            /* bottom: 12vh; */
            position: sticky;
            /* top: 12px; */
            border: tomato solid 1px;
            top: 50vh;
          }
          & section.keywords {
            position: sticky;
          }
          & section.social-posting {
            position: sticky;
          }
        }

        @media screen and (min-width: 1100px) {
          grid-template-areas:
            " k k a a a a a a s s"
            " k k a a a a a a t t"
            " l r a a a a a a . ."
            " . . a a a a a a . ."
            " . . a a a a a a . .";

          & section.tofh2 {
            position: sticky;

            top: 38vh;

            border: pink solid 1px;
            width: fit-content;
            height: max-content;

            /* align-self: stretch; */
          }

          & section.keywords {
            position: sticky;

            top: 14vh;
          }

          & section.social-posting {
            border: yellow solid 2px;
          }

          & div.left-arrow {
            position: sticky;
            top: 80vh;
          }

          & div.right-arrow {
            position: sticky;
            top: 60vh;
          }
        }
      `}
    >
      {children}
      {/* ZAMENI OVO KONKRETNIM KOMPONENTAMA, KADA IH BUDES NAPRAVIO */}
      <TableOfHeadings />
      {/* EVO OVDE MOZES RENDER-OVATI Keywords */}
      <Keywords />
      <LeftArrow />
      <RightArrow />
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
