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

// UVESCU TYPE-OVE ZA       groupPage      I ZA        allBlogKeywords

import {
  Headings,
  GroupPagePickedI,
  PrevAndNextPagePathI,
} from "../templates/blog-post-template"; // OVDE SAM SAMO UVEZAO TYPE ZA
//                                                              groupPage  (TO JE ONAJ STO SAM SAMO PICK=OVAO STA M ITREBA, JER MI NE TREBA SVE)
// UVOZIM DAKLE ONAJ VEZAN ZA KEYWORDS
import { PageKeywords } from "../templates/group-page-template";

interface PageProp extends SeoI {
  // DODAO I OVO
  prevAndNextPagePath: PrevAndNextPagePathI; // TYPESCRIPT VISE NE YELL-UJE NA TEBE
  // JOS DVA NOVA PROP TYPE-A, PRE NEGO STO ODEM DA DODAJEM NOVE TYPE-OVE I DEFINISEM
  // ODGOVARAJUCE DEFAULT VREDNOSTI U CONTEXT-U
  createdAt: string;
  isUpdated: boolean;
  //
  body: string;
  updated: string;
  title: string;
  headings: Headings;
  relativeLink: string;
  // PROSIRUJEM PROP TYPE-OVE
  groupPage: GroupPagePickedI;
  allBlogKeywords: PageKeywords[]; // SAD SE MOZES VRATITI U TEMPLATE DA PROSLEDIS SVE STA TREBA,
  //                                  ZA OVU KOMPONENTU,  A VIDECES ERROR AKO TO NA URADIS JER NI JEDAN OD OFIELD-OVA NIJE OPTIONAL
}

// TI SI U OVOJ KOMPONENTI INDIREKTNO RENDER-OVAO     Helmet
// A Helmet CUSTOMLY ZA SVAKI PAGE INSERT-UJE head SECTION METADATA
// JER SAM TAKO DEFINISAO

const BlogPost: FunctionComponent<{
  page: PageProp;
}> = ({
  page: {
    prevAndNextPagePath,
    //
    createdAt,
    isUpdated,
    //
    body,
    // EVO GA updated I NJEGA PROSLEDJUJEM U CONTEXT PROVIDER-A
    updated,
    //
    title,
    lang,
    description,
    themeColor,
    headings,
    relativeLink,
    // uzimam i ovo
    allBlogKeywords,
    groupPage,
  },
}) => {
  const {
    BlogPostStateProvider,
    defaultBlogPostState,
    blogPostReducer,
  } = $_createBlogPostReducerState;

  // console.log({ headings });

  const [reducedBlogPostState, blogPostDispatch] = useReducer(
    blogPostReducer,
    defaultBlogPostState
  );

  // console.log(relativeLink);

  return (
    <BlogPostStateProvider
      value={{
        prevAndNextPagePath,
        reducedBlogPostState,
        blogPostDispatch,
        headings,
        relativeLink,
        seo: { title, lang, description, themeColor },
        allBlogKeywords,
        groupPage,
        createdAt,
        isUpdated,
        updated, // ALI POSTO SI GA PROSLEDIO, MORAS DA ODES U context_n_reducer_blog_post.ts
        //            DA GA I TAMO TYPE-UJES, I PROSLEDIS DEFAULT, JER OVDE TYPESCRIPT YELL-UJE NA TEBE JER NISI TO ODRADIO
      }}
    >
      {/* <HeaderStateProvider> */}
      {/* <Layout body={body} updated={updated} /> */}

      <Router>
        <Layout path={encodeURI(relativeLink)} body={body} />

        {headings.map(({ value }) => (
          <Layout
            key={value + relativeLink}
            path={`${encodeURI(relativeLink)}#${encodeURI(value)
              .replace(/%20/g, "-")
              .replace(/ /g, "-")}`}
            body={body}
          />
        ))}
      </Router>
      {/* </HeaderStateProvider> */}
    </BlogPostStateProvider>
  );
};

export default BlogPost;
