/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { FunctionComponent, useContext } from "react";

import TableOfKeywords from "../../static_query_components/gr-table-of-keywords";
import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

// NEKA MAIN BUDE GRID (A TU CU LOGIKU, KASNIJE DODATI)

const MainGp: FunctionComponent = (props) => {
  const { children } = props;

  const { groupPageContext } = $_useGroupPageState;
  const { reducedState } = useContext(groupPageContext);
  const { keywordsModalIsOpen } = reducedState;

  return (
    <main
      css={css`
        border: crimson solid 1px;
        display: grid;
        padding: 10px;

        width: 100%;

        grid-template-columns: repeat(8, minmax(0, 1fr));

        & .lorem {
          grid-area: l;
          display: flex;
          flex-direction: column;
        }

        & div.heading-major {
          grid-area: h;
          & h1 {
            /* border: tomato solid 0px; */
            /* color: #fff; */
            /* height: min-content; */
          }
        }

        & section.keywords {
          display: none;
        }

        & aside.adds {
          position: static;
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
            /* 
            & > * {
              margin: 4px;
            } */
          }
        }

        & aside {
          display: flex;

          &.adds {
            grid-area: a;
            flex-direction: column;

            /* position: sticky; */
            top: 10px;
          }

          &.courses {
            grid-area: s;
          }
        }

        @media screen and (min-width: 918px) {
          grid-template-areas:
            "s h h h h h . ."
            ". c c c c c a a"
            ". c c c c c k k"
            ". c c c c c . ."
            ". . l l l l . ."
            ". . l l l l . ."
            ". . l l l l . .";

          & section.keywords {
            display: flex;
          }

          & aside.adds {
            position: static;
          }

          & aside.courses {
            /* grid-area: s; */
            position: sticky;
            top: 8px;
          }
        }

        @media screen and (min-width: 1100px) {
          grid-template-areas:
            "s s h h h h a a"
            "k k c c c c a a"
            ". . c c c c . ."
            ". . c c c c . ."
            ". . l l l l . ."
            ". . l l l l . ."
            ". . l l l l . .";

          & section.keywords {
            display: flex;
          }

          & aside.courses {
            /* grid-area: s; */
            position: static;
            /* top: 8px; */
          }
        }

        grid-template-areas:
          "h h h h h h h h"
          "c c c c c c c c"
          "c c c c c c c c"
          "c c c c c c c c"
          ". . s s s s . ."
          ". . s s s s . ."
          ". . k k k k . ."
          ". . k k k k . ."
          ". . a a a a . ."
          ". . l l l l . .";
      `}
    >
      {children}
      {keywordsModalIsOpen ? <TableOfKeywords /> : null}
    </main>
  );
};

export default MainGp;
