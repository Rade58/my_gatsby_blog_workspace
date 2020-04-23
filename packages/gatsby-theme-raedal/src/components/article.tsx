/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { MDXRenderer } from "gatsby-plugin-mdx";

import { useContext, FunctionComponent } from "react";

// OVDE ZELIM DA KORISTIM BLOG POST STATE (STO SAM I URADIO, DOLE U KOMPONENTI)
import { blogPostContext } from "../context_n_reducers/context_n_reducer_blog_post";
//

interface ArticlePropsI {
  updated: string;
  body: string;
}

const Article: FunctionComponent<ArticlePropsI> = ({ body, updated }) => {
  //
  const { reducedBlogPostState } = useContext(blogPostContext);
  //

  const { pigDisapear } = reducedBlogPostState;

  console.log({ pigDisapear });

  return (
    <article
      sx={{
        h2: {
          paddingTop: pigDisapear ? "58px" : "18px",
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
