/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
// import { MDXRenderer } from "gatsby-plugin-mdx";
import { FunctionComponent, useReducer } from "react";
//
import { Router } from "@reach/router";
//
import Layout from "./layout";
//
// import Article from "./article";
import Seo, { SeoI } from "../seo/seo";
//
import { $_createBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

import HeaderStateProvider from "../context_n_reducers/context_providers/headerStateProvider";

import { Headings } from "../templates/blog-post-template";

interface PageProp extends SeoI {
  body: string;
  updated: string;
  title: string;
  headings: Headings;
  relativeLink: string;
}

// TI SI U OVOJ KOMPONENTI INDIREKTNO RENDER-OVAO     Helmet
// A Helmet CUSTOMLY ZA SVAKI PAGE INSERT-UJE head SECTION METADATA
// JER SAM TAKO DEFINISAO

const BlogPost: FunctionComponent<{
  page: PageProp;
}> = ({
  page: {
    body,
    updated,
    title,
    lang,
    description,
    themeColor,
    headings,
    relativeLink,
  },
}) => {
  const {
    BlogPostStateProvider,
    defaultBlogPostState,
    blogPostReducer,
  } = $_createBlogPostReducerState;

  console.log({ headings });

  const [reducedBlogPostState, blogPostDispatch] = useReducer(
    blogPostReducer,
    defaultBlogPostState
  );

  console.log(relativeLink);

  return (
    <BlogPostStateProvider
      value={{
        reducedBlogPostState,
        blogPostDispatch,
        headings,
        relativeLink,
        seo: { title, lang, description, themeColor },
      }}
    >
      <Router>
        <Layout path={encodeURI(relativeLink)} updated={updated} body={body} />
        {/* ZA NASLOVE */}
        {headings.map(({ value }) => (
          <Layout
            key={value + relativeLink}
            path={`${encodeURI(relativeLink)}#${encodeURI(value)}`}
            updated={updated}
            body={body}
          />
        ))}
      </Router>
    </BlogPostStateProvider>
  );
};

export default BlogPost;
