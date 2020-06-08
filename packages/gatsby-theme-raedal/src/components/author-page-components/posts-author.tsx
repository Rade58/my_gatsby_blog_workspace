/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { FunctionComponent } from "react";

import { LastTenPostsType } from "../../templates/author-page-template";

interface PropsLastTenPostsI {
  lastTenPosts: LastTenPostsType;
}

const LastTenPosts: FunctionComponent<PropsLastTenPostsI> = (props) => {
  const { lastTenPosts } = props;

  console.log(lastTenPosts);

  return (
    <section
      className="last-ten-posts"
      css={css`
        display: grid;
        width: 80vw;
        margin-right: auto;
        margin-left: auto;
      `}
    >
      {/* {JSON.stringify(lastTenPosts, null, 2)} */}
      {lastTenPosts.map((post) => (
        <div>{post.title}</div>
      ))}
    </section>
  );
};

export default LastTenPosts;
