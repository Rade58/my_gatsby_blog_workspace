/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { MDXRenderer } from "gatsby-plugin-mdx";
import { Router } from "@reach/router";

import { MDXProvider } from "@mdx-js/react";

import {
  useContext,
  FunctionComponent,
  useEffect,
  forwardRef,
  Fragment,
  memo,
} from "react";

import MemoMdxRendererComponent from "./MEMOIZED/mem-mdx";

// OVDE ZELIM DA KORISTIM BLOG POST STATE (STO SAM I URADIO, DOLE U KOMPONENTI)
import { blogPostContext } from "../context_n_reducers/context_n_reducer_blog_post";
//

// UVOZIM Heading KOMPONENTU
import Heading from "./heading-major";

// === !== === !== ===
//
// import Hero from "./hero";
// === !== === !== ===

import Code from "./mdx-theme-ui-overrides/code";

import getHeading from "./mdx-theme-ui-overrides/heading";

// === !== === !== ===
import CloudImage from "./mdx-theme-ui-overrides/cloud-image";
// === !== === !== ===

const H2Component: FunctionComponent<{ id: string }> = getHeading("h2");

// === !== === !== ===

interface ArticlePropsI {
  body?: string;
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
      console.log("~~~~~!! ARTICLE  UNMOUNTING !!~~~~~");

      if (document.body.onscroll) document.body.onscroll = null;
    },
    []
  );

  useEffect(() => {
    // console.log("=== !== ===  MOUNTING ARTICLE  !== === !==");
    // console.log({ body });
    // console.log("=== !== === !== === !==");
  }, []);

  return (
    <MDXProvider
      components={{
        pre: Code,
        h2: H2Component,
        h5: CloudImage,
      }}
    >
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
          color: #ffffee;

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
            /* font-weight: 300; */
            color: #fff;
            margin: 0 auto;
            width: fit-content;
            /* font-size: 58px; */
            /* font-weight: 200; */
          }

          & > div > h2 {
            transition-property: padding-top;
            transition-duration: 200ms;
          }

          & > p {
            font-size: 22px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 100;
            margin-bottom: 1.24rem;

            @media screen and (max-width: 648px) {
              font-size: 1.24em;
            }

            & > code {
              background-color: #a043845b;
              font-size: 1.3rem;
            }
          }

          & > ul {
            border: tomato solid 0px;
            list-style-type: none;

            & > li::before {
              content: "📋 ";
              display: inline-block;
              margin-bottom: 0.4em;
              font-size: 0.5em;
              color: crimson;
              margin-right: 0.5em;
              position: relative;
              bottom: 0.2em;
            }

            & > li {
              font-size: 20px;

              & > ul {
                list-style-type: none;
                border: red solid 0px;
                margin-top: 4px;
                margin-bottom: 8px;

                & > li::before {
                  content: "🌀 ";
                  display: inline-block;
                  font-size: 0.4em;
                  color: crimson;
                  margin-right: 0.4em;
                  position: relative;
                  bottom: 0.2em;
                }

                & li {
                  font-size: 0.9em;

                  color: blanchedalmond;

                  & ul {
                    list-style-type: none;
                    margin-top: 4px;
                    margin-bottom: 8px;

                    & li::before {
                      content: "⚜️ ";
                      font-size: 0.5em;
                      margin-right: 0.3em;
                      color: crimson;
                      position: relative;
                      bottom: 0.2em;
                    }
                  }

                  & li {
                    color: #e7d0e0;
                  }
                }
              }

              & ol {
                border: tomato solid 0px;
                list-style-type: none;
                margin-top: 4px;
                margin-bottom: 8px;

                counter-reset: ola;

                & > li {
                  font-size: 0.9em;
                  counter-increment: ola;

                  &::before {
                    color: crimson;
                    content: counter(ola, lower-alpha) ") " !important;
                  }
                }

                & ul {
                  list-style-type: none;
                  margin-top: 4px;
                  margin-bottom: 8px;

                  & li::before {
                    content: "⚜️ ";
                    font-size: 0.5em;
                    margin-right: 0.3em;
                    color: crimson;
                    position: relative;
                    bottom: 0.2em;
                  }
                }
              }
            }
          }

          & > ol {
            border: tomato solid 0px;

            list-style-type: none;

            list-style-position: inside;

            counter-reset: olcount;

            & > li {
              font-size: 20px;

              &::before {
                color: crimson;
                counter-increment: olcount;
                content: counter(olcount) " 🠒 " " ";
              }

              & ol {
                list-style-type: none;
                margin-top: 4px;
                margin-bottom: 8px;

                counter-reset: ol2;

                & li {
                  font-size: 0.9em;
                  counter-increment: ol2;

                  &::before {
                    color: crimson;
                    content: counter(ol2, lower-alpha) ") ";
                  }
                }
              }

              & ul {
                list-style-type: none;

                & > li::before {
                  content: "🌀 " !important;
                  display: inline-block;
                  font-size: 0.4em;
                  color: crimson;
                  margin-right: 0.4em;
                  position: relative;
                  bottom: 0.2em;
                }

                & ol {
                  list-style-type: none;
                  margin-top: 4px;
                  margin-bottom: 8px;

                  counter-reset: ol4;

                  & li {
                    font-size: 0.9em;
                    counter-increment: ol4;

                    &::before {
                      color: crimson;
                      content: counter(ol4, lower-alpha) ") ";
                    }
                  }
                }
              }
            }
          }

          & * {
            & em {
              color: #df9dbe;
              font-family: "Bad Script";
              font-weight: 100;
            }

            & strong {
              color: #bb99d1;
            }
          }
        `}
      >
        <Heading />
        {/* <Hero /> */}
        {/* <MDXRenderer>{body}</MDXRenderer> */}
        <MemoMdxRendererComponent />
      </article>
    </MDXProvider>
  );
};

export default Article;
