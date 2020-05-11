/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { useContext, FunctionComponent } from "react";

// KORISTICES CONTEXT DA BIH PROVIDE-OVAO NIZ
// OBJEKATA, KOJI IMAJU DATA RELATED TO ONE POST
import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

//
import Card from "./blog-post-card";
//

const Cards: FunctionComponent = () => {
  const { groupPageContext } = $_useGroupPageState;

  const { groupPage } = useContext(groupPageContext);

  const { blogPostPages } = groupPage;

  return (
    <section
      className="cards"
      css={css`
        margin: 8px 14px 0 14px;
      `}
    >
      {blogPostPages.map((blogPostData) => (
        <Card
          {...blogPostData}
          key={`${blogPostData.title}-${blogPostData.path}`}
        />
      ))}
    </section>
  );
};

export default Cards;
