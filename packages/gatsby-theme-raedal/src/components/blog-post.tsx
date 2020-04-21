/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { FunctionComponent } from "react";
import Layout from "./layout";
//
import Seo, { SeoI } from "../seo/seo";
//

interface PageProp extends SeoI {
  body: string;
  updated: string;
  title: string;
}

// TI SI U OVOJ KOMPONENTI INDIREKTNO RENDER-OVAO     Helmet
// A Helmet CUSTOMLY ZA SVAKI PAGE INSERT-UJE head SECTION METADATA
// JER SAM TAKO DEFINISAO

const BlogPost: FunctionComponent<{
  page: PageProp;
}> = ({ page: { body, updated, title, lang, description, themeColor } }) => (
  <Layout>
    <Seo
      title={title}
      lang={lang}
      description={description}
      themeColor={themeColor}
    />
    {/* <h2>{title}</h2> */}
    <article
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

        & > h2,
        h3,
        h4,
        h5,
        h6 {
          & > a {
            text-decoration-line: none;
            color: inherit;
          }
        }
      `}
    >
      <MDXRenderer>{body}</MDXRenderer>
      <p>This page was updated {updated}</p>
    </article>
  </Layout>
);

export default BlogPost;
