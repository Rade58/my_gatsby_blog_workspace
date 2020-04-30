// NE ZNAM DA LI OVO MORA DA BUDE
// AKO NE BUDEM MOGAO DA REFERENCIRAM OVU KOMPONENTU, KAO TY

import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";

import BlogPost from "../components/blog-post";

import { SeoI } from "../seo/seo";

export interface HeadingI {
  value: string;
  depth: number;
}

export type Headings = HeadingI[];

export interface PageContextI {
  headings: Headings;
  relativeLink: string;
}

interface BlogPostTemplateProps {
  pageContext: PageContextI;
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
}) => {
  // NAJBOLJE BI BIL ODA NE PROSLEDJUJES CEO PAGE CONTEXT
  // IPAK SE TAM ONALZAZI id I SLICNE STVARI

  // NE ZNAM DA LI GA JE DOBRO EXPOSE-OVATI ILI NE
  // ALI JA IPAK NECU

  /*  console.log("**********************************************");
  console.log("**********************************************");
  console.log("**********************************************");
  console.log("**********************************************");
  console.log(pageContext);
  console.log("**********************************************");
  console.log("**********************************************");
  console.log("**********************************************");
  console.log("**********************************************"); */

  // DAKLE IZDVAJACU ENTITET PO ENTITEK, KAKO MOJ BLOG MOZDA BUDE
  // KORISTIO NEKE DRUGE FEATURE-E KOJE PODESAVAM NA BACKEND-U,
  // PA CU IH "UVODITI", OVDE SA OVOG TEMPLATE-A

  // ZATO ZA SADA, SAMO IZDVAJAM     hedings  IZ   pageContext-A

  const { headings, relativeLink } = pageContext;

  return (
    <BlogPost
      page={{ ...frontMatter, body, title, updated, headings, relativeLink }}
    />
  );
};

export default BlogPostTemplate;
