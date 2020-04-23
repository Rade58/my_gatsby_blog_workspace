/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { MDXRenderer } from "gatsby-plugin-mdx";

import { FunctionComponent } from "react";

interface ArticlePropsI {
  updated: string;
  body: string;
}

const Article: FunctionComponent<ArticlePropsI> = ({ body, updated }) => {
  return (
    <article
      sx={{
        h2: {
          paddingTop: "58px",
          paddingBottom: "18px",
        },
      }}
      className="post-article"
      css={css`
        border: tomato solid 4px;
        margin-top: 48px;

        & > h1 {
          font-family: Oxygen, Ubuntu, Roboto, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
          font-weight: 300;
          color: #fff;
          margin: 0 auto;
          width: fit-content;
        }
      `}
    >
      <MDXRenderer>{body}</MDXRenderer>
      <p>This page was updated {updated}</p>
    </article>
  );
};

export default Article;
