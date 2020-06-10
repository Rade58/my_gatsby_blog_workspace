/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import {
  useContext,
  useRef,
  FunctionComponent,
  createRef,
  RefObject,
} from "react";

import TableOfHeadings from "./table-of-headers";

// SADA UVOZIM Keyword KOMPONENTU, KOJ UZELIM DA RENDER-UJEM KAO DEO GRID-A
import Keywords from "./keywords";

// UVOZIM DVA ARROW-A
import LeftArrow from "./left-arrow";
import RightArrow from "./right-arrow";

// LOREM IPSUM
// import LoremIpsum from "./dev-utility/lorem-ipsum";
//

// === !==  TABLE OF KEYWORDS, NESTOVACU USLOVNO U ODNOSU NA DEO REDUCER STATE-A
import TableOfKeywords from "../static_query_components/table-of-keywords";
// === !== BICE USLOVNO RENDERED NA SAMOM DNU MAIN-A

import JumperArrows from "./jumper-h";

import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

interface MainPropsI {
  articleReference?: RefObject<HTMLElement>;
}

const Main: FunctionComponent<MainPropsI> = ({ children }) => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { reducedBlogPostState } = useContext(blogPostContext);
  const { keywordModalIsShown } = reducedBlogPostState;

  const mainRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={mainRef}
      css={css`
        /* position: relative; */

        display: grid;

        /* width: 100vw; */

        /* === !== === !== === === !== === !== === */
        /* === !== === !== === === !== === !== === */
        & > aside.jumper-cont {
          & ul {
            overflow-y: auto;
            height: 24vh;
          }
        }

        /* === !== === !== === === !== === !== === */
        /* === !== === !== ===GRID STUFF AND BREAKPOINTS === !== === !== === */

        grid-template-columns: repeat(10, minmax(0, 1fr));

        grid-template-areas:
          ". . . l . . r . . ."
          "a a a a a a a a a a"
          "t t t t t t t t t t"
          "k k k k k k k k k k"
          "s s s s s s s s s s"
          ". . . . j . . . . .";

        /*==============================*/

        /* & > aside.jumper-cont {
          grid-area: j;

          width: 100%;
          border: pink olid 4px;
        } */

        & > aside.jumper-cont {
          margin-left: 18px;
          grid-area: t;
        }
        & > section.keywords {
          grid-area: k;
        }
        & > section.social-posting {
          grid-area: s;
        }

        & > article {
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

        /* & > div.left-arrow {
          grid-area: l;
        }

        & > div.right-arrow {
          grid-area: r;
        } */

        /*==============================*/

        @media screen and (min-width: 918px) {
          grid-template-areas:
            " a a a a a a a a s s"
            " a a a a a a a a k k"
            " a a a a a a a a t t"
            " a a a a a a a a . ."
            " a a a a a a a a . .";

          & > aside.jumper-cont {
            /* bottom: 12vh; */
            position: sticky;
            /* top: 12px; */
            border: tomato solid 1px;
            top: 50vh;
          }
          & > section.keywords {
            position: sticky;
            top: 8vh;
          }
          & > section.social-posting {
            position: sticky;
          }

          /* === !== === !== */

          /* ipak ne zelim da ih prikazujem na ovoj sirini */
          /* & > div.right-arrow,
          & > div.left-arrow {
            position: sticky;
            top: 80vh;
            font-size: 12px;
            display: none;
          } */

          /* & > div.right-arrow {
            border: olive solid 1px;
          }
          & > div.left-arrow {
            border: tomato solid 1px;
          } */
          /* === !== === !== */
        }

        @media screen and (min-width: 1200px) {
          grid-template-areas:
            " k k a a a a a a s s"
            " k k a a a a a a t t"
            " . . a a a a a a . ."
            " . . a a a a a a . ."
            " . . a a a a a a . .";

          & > aside.jumper-cont {
            position: sticky;
            top: 48vh;
            /* height: max-content; */
            border: pink solid 1px;
            width: fit-content;

            /* ------------------------- */
            /* position: fixed;

            right: 10px;
            height: 60%; */
            /* ------------------------- */

            /* align-self: stretch; */
          }

          & > section.keywords {
            position: sticky;

            top: 48vh;
          }

          & > section.social-posting {
            border: yellow solid 2px;
          }

          /* & > div.left-arrow {
            position: sticky;
            top: 14vh;
            display: none;
          }

          & > div.right-arrow {
            position: sticky;
            top: 14vh;
            display: none;
          } */
        }
      `}
    >
      {children}
      {/* ------------------------- */}
      {/* <TableOfHeadings />   NE KORITIM GA JER CE SVE IMPLEMENTIRATI SLEDECA KOMPONENTA     */}
      <JumperArrows mainReference={mainRef} />
      {/* EVO OVDE MOZES RENDER-OVATI Keywords */}
      <Keywords />
      {/* <LeftArrow />
      <RightArrow /> */}
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
      {keywordModalIsShown ? <TableOfKeywords /> : null}
    </main>
  );
};

export default Main;
