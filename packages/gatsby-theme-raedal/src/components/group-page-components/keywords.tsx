/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { useContext, FunctionComponent } from "react";

import Keyword from "./gp-keyword";

import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

const Keywords: FunctionComponent = () => {
  const { groupPageContext } = $_useGroupPageState;

  const { groupPage } = useContext(groupPageContext);

  const { allBlogKeywords, groupColor, keywordTextColor } = groupPage;

  return (
    <section
      className="keywords"
      css={css`
        display: flex;
        border: pink solid 0px;
        padding: 6px;

        & div.separator {
          display: block;
          width: 100%;
          margin-right: 12%;
          margin-left: 12%;
          margin-top: 1vh;
          margin-bottom: 1vh;
          height: 1px;
          /* background-color: crimson; */

          &.separator-1 {
            background-image: linear-gradient(
              90deg,
              rgba(158, 90, 106, 1) 18%,
              rgba(83, 139, 148, 0.16290266106442575) 80%
            );
          }

          &.separator-2 {
            background-image: linear-gradient(
              90deg,
              rgba(83, 139, 148, 0.16290266106442575) 18%,
              rgba(158, 90, 106, 1) 80%
            );
          }
        }
        & a:nth-of-type(1) {
          margin-left: 4%;
        }
      `}
    >
      {/* ---separator--- */}
      <div className="separator separator-1" />
      {allBlogKeywords.map((member) => (
        <Keyword {...member} key={`${member.keyword}-${member.path}`} />
      ))}
      <div className="separator separator-2" />
    </section>
  );
};

export default Keywords;
