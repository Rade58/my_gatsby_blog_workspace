/** @jsx jsx */
import { jsx } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { FunctionComponent } from "react";
import Layout from "./layout";

interface PageProp {
  body: string;
  updated: string;
  title: string;
}

const BlogPost: FunctionComponent<{
  page: PageProp;
}> = ({ page: { body, updated, title } }) => (
  <Layout>
    <h2>{title}</h2>
    <MDXRenderer>{body}</MDXRenderer>
    <p>This page was updated {updated}</p>
  </Layout>
);

export default BlogPost;
