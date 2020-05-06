/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { useContext, FunctionComponent } from "react";

import Keyword from "./gp-keyword";

import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

const Keywords: FunctionComponent = () => {
  const { groupPageContext } = $_useGroupPageState;

  const { groupPage } = useContext(groupPageContext);

  const { allBlogKeywords } = groupPage;

  return (
    <section
      className="keywords"
      css={css`
        display: flex;
        border: pink solid 1px;
        padding: 6px;
      `}
    >
      {allBlogKeywords.map((member) => (
        <Keyword {...member} key={`${member.keyword}-${member.path}`} />
      ))}
    </section>
  );
};

export default Keywords;
