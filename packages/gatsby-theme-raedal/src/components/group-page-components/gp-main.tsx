/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { FunctionComponent } from "react";

// NEKA MAIN BUDE GRID (A TU CU LOGIKU, KASNIJE DODATI)

const MainGp: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <main
      css={css`
        border: crimson solid 1px;
        display: grid;
        padding: 10px;

        width: 100%;

        grid-template-columns: repeat(8, minmax(0, 1fr));

        grid-template-areas:
          "s s h h h h a a"
          "k k c c c c a a"
          ". . c c c c . ."
          ". . c c c c . ."
          ". . l l l l . ."
          ". . l l l l . ."
          ". . l l l l . .";

        & .lorem {
          grid-area: l;
          display: flex;
          flex-direction: column;
        }

        & div.heading-major {
          grid-area: h;
          & h1 {
            border: tomato solid 0px;
            color: #fff;
            height: min-content;
          }
        }

        & section {
          display: flex;

          &.cards {
            flex-direction: column;
            grid-area: c;
          }

          &.keywords {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            align-content: flex-start;
            position: sticky;
            top: 20px;

            grid-area: k;

            & > * {
              margin: 4px;
            }
          }
        }

        & aside {
          display: flex;

          &.adds {
            grid-area: a;
            flex-direction: column;

            position: sticky;
            top: 10px;
          }

          &.courses {
            grid-area: s;
          }
        }
      `}
    >
      {children}
    </main>
  );
};

export default MainGp;
