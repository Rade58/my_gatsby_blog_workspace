// NE ZNAM DA LI OVO MORA DA BUDE
// AKO NE BUDEM MOGAO DA REFERENCIRAM OVU KOMPONENTU, KAO TY

import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";

import BlogPost from "../components/blog-post";

import { SeoI } from "../seo/seo";

// IMAM VEC PRIPREMLJENE NEKE TYPE-OVE, TAKO DA CU NEKE ISKORISTITI ALI VECINOM CU
// PRAVITI ONE NOVE KOJI CE IMATI SAMO ONO STA MI TREBA (A UVEK IH ONDA MOGU PROSRITI)
// DA KRENEM OD ZAJEDNICKIH

import { PageKeywords } from "./group-page-template";

// A SADA CU KREIRATI JEDAN TYPE VEZAN ZA GROUP PAGE
// IMACE DAKEL SAMO ON OSTA M ITREBA I ZATO NECU UVOZITI ONAJ VEC POSTOJECI INTERFACE
export interface GroupPagePickedI {
  name: string;
  path: string;
  icon: string;
  groupColor: string;
}

export interface HeadingI {
  // OVO JE USTVARI INTERFACE, NAMENJEN ZA ONE HEDINGSE KOJI FORMIRAJU BLOG PAGE BASED TABLE OF CONTENT
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

      // A SADA CU DA PROSIRIM I OVAJ TYPE (MOZDA BESPOTREBNO JER ZELI MDA SPRED-UJEM PROPS A MZODA I NIJE BESPOTREBNO)
      // ALI MOZDA JE DOBRO SPRED-OVATI KAK OBI VIDEO STA USTVARI IMAM OD PODATAKA

      allBlogKeywords: PageKeywords[];

      groupPage: GroupPagePickedI;
    };
  };
}

export const query = graphql`
  query TakeBlogPostPagzus($id: String) {
    page: blogPostPage(id: { eq: $id }) {
      title
      updated(fromNow: true) # TREBA MI I DALJE fromNow
      body

      frontMatter {
        lang
        description
        themeColor
      }

      # UZECU I RELATED GROUP PAGE JER ZELIM DA LOGO GRUPE WRAPP-UJEM U ANCHOR
      # KOJI VODI DO GROUP PAGE-A
      groupPage {
        name
        path

        # I TO BAS ANCHOR TREBA DA BUDE OKO ICONA, ODNONO LOG-AO GROUP SUBJECT-A
        icon
        groupColor
      }

      # DAKLE ZELIM DA IMAM SVE KEYWORD-OVE, KAO NA GROUP PAGE-U
      # U OVOM SLUCAJU, NECU IZOSTAVLJATI TRENUTNU GRUPU
      allBlogKeywords {
        keyword
        path
        keywordColor
        keywordTextColor
        keywordBorderColor
      }

      # DOBRA STVAR JE STO TI VEC I IMAS KRIRANO POMENUTU KOMPONENTU NAMENJENU RENDERINGU
      # KEYWORD-OVA
    }
  }
`;

const BlogPostTemplate: FunctionComponent<BlogPostTemplateProps> = ({
  pageContext,
  data,
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

  // IZDVOJICU I      groupPage      I          allBlogKeywords

  const {
    updated,
    title,
    body,
    frontMatter,
    groupPage,
    allBlogKeywords,
  } = data.page;

  //  I NJIH CU     ZADATI DOLE U page      PROP, ALI MORAM DA PROSIRIM I PROP TYPES ZA   BlogPost   KOMPONENTU

  return (
    <BlogPost
      page={{
        ...frontMatter,
        body,
        title,
        updated,
        headings,
        relativeLink,
        //  PROSLEDIO SAM I OSTATAK, A DA NISAM TYPESCRIPT BI YELL-OVAO NA MENE
        allBlogKeywords,
        groupPage,
        // POSTO SAM ZAVRSI OSA OVIM VREME JE DA PROSIRIM I CONTEXT TYPE-OVE
        // TAKODJE DA CONTEXT-U PROSLEDIM DEFAULT-OVE U SKLADU SA TI MTYPE-OVIMA
      }}
    />
  );
};

export default BlogPostTemplate;
