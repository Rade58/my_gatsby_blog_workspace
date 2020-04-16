// NE ZNAM DA LI OVO MORA DA BUDE
// AKO NE BUDEM MOGAO DA REFERENCIRAM OVU KOMPONENTU, KAO TY

import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";

import BlogPost from "../components/blog-post";

import { SeoI } from "../seo/seo";

interface BlogPostTemplateProps {
  pageContext: any;
  data: {
    page: {
      updated: string;
      title: string;
      body: string;

      frontMatter: SeoI;
    };
  };
}

export const query = graphql`
  query($id: String!) {
    page: blogPostPage(id: { eq: $id }) {
      updated(fromNow: true)
      title
      body

      frontMatter {
        themeColor
        description
        lang
      }
    }
  }
`;

const BlogPostTemplate: FunctionComponent<BlogPostTemplateProps> = ({
  pageContext,
  data: {
    page: { updated, title, body, frontMatter },
  },
}) => <BlogPost page={{ ...frontMatter, body, title, updated }} />;

export default BlogPostTemplate;
