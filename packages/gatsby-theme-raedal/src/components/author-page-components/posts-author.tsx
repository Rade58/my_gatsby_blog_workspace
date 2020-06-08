/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { FunctionComponent } from "react";

import { LastTenPostsType } from "../../templates/author-page-template";

import { additionalStyles } from "../../common-styles";

interface PropsLastTenPostsI {
  lastTenPosts: LastTenPostsType;
}

const LastTenPosts: FunctionComponent<PropsLastTenPostsI> = (props) => {
  const { lastTenPosts } = props;
  const { cardBackgroundColor } = additionalStyles;

  console.log(lastTenPosts);

  return (
    <section
      className="last-ten-posts"
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 340px));
        grid-template-rows: auto;

        justify-content: center;

        width: 78vw;
        margin-right: auto;
        margin-left: auto;

        & div.card {
          background-color: ${cardBackgroundColor};
          border: olive solid 1px;
          margin-left: 4px;
          margin-right: 4px;
          margin-bottom: 8px;
        }
      `}
    >
      {/* {JSON.stringify(lastTenPosts, null, 2)} */}
      {lastTenPosts.map((post) => {
        const { title, description, createdAt, updated } = post;

        return (
          <div className="card">
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="times">
              <div>{createdAt}</div>
              <div>{updated}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default LastTenPosts;
