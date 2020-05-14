/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import { FunctionComponent, useContext } from "react";

import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

const HeadingMajor: FunctionComponent = () => {
  const { groupPageContext } = $_useGroupPageState;

  const { groupPage } = useContext(groupPageContext);

  const { name, groupColor, keywordBorderColor, keywordTextColor } = groupPage; // NAME CE BITI ONO STA JE U TITLE-U
  // DOBRA IDEJA JE DA OVDE STAVIS I EMOJI
  // ODNOSNO SVAKI PAGE TREBA DA IMA KARAKTERISTICAN EMOJI

  // console.log({ keywordBorderColor, keywordTextColor });

  return (
    <div
      className="heading-major"
      css={css`
        display: flex;
      `}
    >
      <h1
        css={css`
          margin-left: auto;
          margin-right: auto;

          & span {
            &.group-name-span {
              text-decoration-line: overline underline;
              text-decoration-style: solid;
              text-decoration-color: ${groupColor};
              /* border-right: ${groupColor} medium groove; */
              /* border-left: ${groupColor} medium double; */
              font-family: - -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }

            &.emo {
              border-right: groove ${groupColor} thick;
              border-left: groove ${groupColor} thick;
              /* padding: 4.8px; */
              
            }
          }
        `}
      >
        All <span className="group-name-span">{name}</span> tutorials
        &nbsp;&nbsp;{" "}
        <span className="emo" role="img" aria-label="img">
          ⬇️
        </span>
      </h1>
    </div>
  );
};

export default HeadingMajor;
