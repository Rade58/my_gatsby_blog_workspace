/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { MDXRenderer } from "gatsby-plugin-mdx";

import { useContext, FunctionComponent, useEffect } from "react";

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

  const { pigDisapear, header_pull_class } = reducedBlogPostState;

  console.log(header_pull_class);

  console.log({ pigDisapear });

  useEffect(
    () => () => {
      console.log("~~~~~!! ARTICLE UNMOUNTED !!~~~~~");

      if (document.body.onscroll) document.body.onscroll = null;
    },
    []
  );

  return (
    <article
      sx={
        {
          // border: { variant: "borders.headerBorder" },
          /* h2: {
          paddingTop: !pigDisapear ? "58px" : "18px",
          paddingBottom: "18px",
        }, */
          /* display: "flex",
        flexDirection: "column", */
        }
      }
      // style={{ display: "flex" }}
      className={`post-article ${
        !pigDisapear ? "pig-reapeard" : "pig-disapeard"
      } ${header_pull_class}`}
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

        & > div > h2 {
          transition-property: padding-top;
          transition-duration: 200ms;
        }
      `}
    >
      <MDXRenderer>{body}</MDXRenderer>
      <p>This page was updated {updated}</p>
    </article>
  );
};

export default Article;
