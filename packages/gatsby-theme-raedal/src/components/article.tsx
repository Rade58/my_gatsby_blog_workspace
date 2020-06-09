/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { MDXRenderer } from "gatsby-plugin-mdx";
import { Router } from "@reach/router";

import {
  useContext,
  FunctionComponent,
  useEffect,
  forwardRef,
  Fragment,
  memo,
} from "react";

// OVDE ZELIM DA KORISTIM BLOG POST STATE (STO SAM I URADIO, DOLE U KOMPONENTI)
import { blogPostContext } from "../context_n_reducers/context_n_reducer_blog_post";
//

// UVOZIM Heading KOMPONENTU
import Heading from "./heading-major";
//

interface ArticlePropsI {
  body: string;
}

const Article: FunctionComponent<ArticlePropsI> = ({ body }) => {
  //
  const { reducedBlogPostState } = useContext(blogPostContext);
  //

  const { pigDisapear /* , header_pull_class */ } = reducedBlogPostState;

  // console.log(header_pull_class);

  // console.log({ pigDisapear });

  useEffect(
    () => () => {
      console.log("~~~~~!! ARTICLE UNMOUNTED !!~~~~~");

      if (document.body.onscroll) document.body.onscroll = null;
    },
    []
  );

  useEffect(() => {
    console.log("=== !== ===  MOUNTING ARTICLE  !== === !==");
    // console.log({ body });
    console.log("=== !== === !== === !==");
  }, []);

  return (
    <article
      id="my-article"
      sx={
        {
          // border: { variant: "borders.headerBorder" },
          /* h2: {
          paddingTop: !pigDisapear ? "58px" : "18px",
          paddingBottom: "18px",
        },
          /* display: "flex",
        flexDirection: "column", */
        }
      }
      // style={{ display: "flex" }}
      className={`post-article ${
        !pigDisapear ? "pig-reapeard" : "pig-disapeard"
      }`}
      css={css`
        @media screen and (min-width: 918px) {
          /* padding-top: calc(38px + 58px); */

          /* padding-top: 28px; */

          margin-top: 0px;
        }

        border: tomato solid 0px;
        /* margin-top: 48px; */

        /* &.pig-reapeard {
          margin-top
        }  */

        /* &.pig-disapeard {
          
        }
        */

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

        & > p {
          font-size: 24px;
          font-weight: 100;
        }
      `}
    >
      <Heading />
      <MDXRenderer>{body}</MDXRenderer>
    </article>
  );
};

export default Article;
