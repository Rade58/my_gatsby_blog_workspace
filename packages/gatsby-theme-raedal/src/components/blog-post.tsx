/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
// import { MDXRenderer } from "gatsby-plugin-mdx";
import { FunctionComponent, useReducer } from "react";
import Layout from "./layout";
//
import Article from "./article";
import Seo, { SeoI } from "../seo/seo";
//
import { $_createBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

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
}> = ({ page: { body, updated, title, lang, description, themeColor } }) => {
  const {
    BlogPostStateProvider,
    defaultBlogPostState,
    blogPostReducer,
  } = $_createBlogPostReducerState;

  const [reducedBlogPostState, blogPostDispatch] = useReducer(
    blogPostReducer,
    defaultBlogPostState
  );

  return (
    <BlogPostStateProvider value={{ reducedBlogPostState, blogPostDispatch }}>
      <Layout>
        <Seo
          title={title}
          lang={lang}
          description={description}
          themeColor={themeColor}
        />
        {/* <h2>{title}</h2> */}
        <Article updated={updated} body={body} />
      </Layout>
    </BlogPostStateProvider>
  );
};

export default BlogPost;
