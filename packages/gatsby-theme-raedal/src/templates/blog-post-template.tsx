// NE ZNAM DA LI OVO MORA DA BUDE
// AKO NE BUDEM MOGAO DA REFERENCIRAM OVU KOMPONENTU, KAO TY

import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";

import BlogPost from "../components/blog-post";

interface BlogPostTemplateProps {
  pageContext: any;
  data: {
    page: {
      updated: string;
      title: string;
      body: string;
    };
  };
}

export const query = graphql`
  query($id: String!) {
    page: blogPostPage(id: { eq: $id }) {
      updated(fromNow: true)
      title
      body
    }
  }
`;

const BlogPostTemplate: FunctionComponent<BlogPostTemplateProps> = ({
  pageContext,
  data: { page },
}) => <BlogPost page={page} />;

export default BlogPostTemplate;
