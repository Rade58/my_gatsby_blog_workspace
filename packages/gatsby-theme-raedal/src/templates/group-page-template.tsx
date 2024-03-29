import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";

// OVO JE KOMPONENTA KOJU CU DA POPULATE-UJEM
import GroupPage from "../components/group-page-components/group-page";

// UVESCU KOMPONENTU, KADA JE NAPRAVIM
// A SADA CU NAPRAVITI QUERY
// DAKLE VODIM RACUAN STA M ISVE TREBA, IAKO MISLIM DA BI TREBA
// SVE

export interface GroupPageContextPropI {
  id: string;
}

export interface PageKeywords {
  keyword: string;
  path: string;
  keywordColor: string;
  keywordTextColor: string;
  keywordBorderColor: string;
}

export type keywordsArray = PageKeywords[];

export interface BlogPostPageI {
  title: string;
  path: string;
  updated: string;
  // JOS MI TREBAJU DVE STVARI
  createdAt: string;
  isUpdated: boolean;
  //

  frontMatter: {
    description: string;
    themeColor: string;
  };
}

export type blogPostPageArray = BlogPostPageI[];

export interface LocationI {
  // OVO SU SAMO NEKI KOJI POSTOJE na location PROPU (ALI ZA SADA MENI ONI NISU
  // BITNI, VEC SAMO POKAZUJEM DA SU DOSTUPNI)
  href: string;
  origin: string;
  protocol: "http:" | "https:";
  host: string;
  hostname: string;
  port: string;
}

export interface GroupPageI {
  // DODAJEM icon
  icon: string;
  //

  // DODAJEM DVA DODATNA FIELDA
  lang: string;
  description: string;
  //

  // id: string;
  name: string;
  path: string;
  groupColor: string;
  // OVO SAM DODAO
  keywordTextColor: string;
  keywordBorderColor: string;
  underlineColor: string;
  //
  updated?: string;
  blogPostPages: blogPostPageArray;
  allBlogKeywords: keywordsArray;
}

export interface GroupPageDataPropI {
  groupPage: GroupPageI;
}

export interface GroupPageTemplatePropsI {
  pageContext: GroupPageContextPropI;
  data: GroupPageDataPropI;
  location: LocationI;
}

export const TakeOneGroupPage = graphql`
  query TakeOneGroupPage($id: String!) {
    groupPage(id: { eq: $id }) {
      # QUERY-UJEM    icon    ALI I   description   I lang   (KOJE SAM RANIJE ZABORAVIO)

      icon
      lang
      description

      # PRVO PODACI POTREBNI ZA KONKRETAN GROUP PAGE
      id
      name
      path
      groupColor

      #    DAKLE ZELIM DA QUERY-UJEM I ZA COLORIM KARKTERISTICNIM ZA TRENUTNI SUBJECT
      #    GROUP PAGE-A
      keywordTextColor
      keywordBorderColor
      #

      underlineColor

      # updated(fromNow: true)    # OVO NIJE POTREBNO

      # EVO KAO STO VIDIS PRILIKOM QUERYING SAM ZADAO ARGUMENTE

      blogPostPages(sort: { fields: updated, order: DESC }) {
        # OVO JE SVE STO TI TREBA DA U JEDNOM CARDU
        # NA GroupPage-U, PRIKAZES I DA LINKUJES BLOG POST PAGE
        title
        path

        # ON OSTO JE QUERY-EOVAO   updated     SADA QUERY-UJE     createdAt

        createdAt(formatString: "MMM Do, Y")
        updated(fromNow: true) #   A OVDE KORISTI MSADA     fromNow
        # I TRAZIM JOS JEDAN FIELD
        isUpdated

        # updatedFns(MMMMDoyyyy: true)   (ISPRAVKA OVO SAM DEPRECATE-OVAO)

        # POSTO CES KREIRATI CARD-OVE TVOJI BLOG POSTOVA
        # TREBACE TI DESCRIPTION (MOZDA IKORISTIS BAS TAJ DESCRIPTION)

        frontMatter {
          description
          themeColor # I BOJA MOZE BITI POTREBNA DA SE OZNACI CARD
        }
      }
      ###############  REKAO SAM DA CU IMATI I LINKED KEYWORDS
      # POTREBNO ZA SEO (ukljucujuci gornji description)
      # ALI I ZA LINKING DO OSTALIH GROUP PAGE-OVA
      # ODRAICU GOTOVO ISTU STVAR KAKAVA JE NA
      # FLAVIO COPES SITE-U
      allBlogKeywords {
        keyword
        path
        keywordColor
        keywordTextColor
        keywordBorderColor
      }
    }
  }
`;

// SADA MOZES DA SE POSVETIS PRAVLJENU KOMPONENTE ZA TVOJ PAGE
// DAKLE QUERY CE UNDER THE HOOD
// I REFERENCIRANJEM KOMPONENTA KOJA TREBA SVE QUERIED PODATKE
// DA RENDER-UJE

const GroupPageTemplate: FunctionComponent<GroupPageTemplatePropsI> = (
  props
) => {
  // pageContext    NECES UPOTREBLAVATI, ALI ZNAJ DA TI JE OVDE DOSTUPAN ONAJ
  //                                    id   (ODNOSNO QUERY VARIJABLA)
  const { pageContext } = props;

  // props.data.groupPage    (OVDE SU TI SVI TVOJI PODACI)

  return <GroupPage {...props} />;
};

// NARAVNO TI KOMPONENTU EXPORT-UJES KAO DEFAULT
// I ONDA SE VRACAS U         packages/gatsby-theme-raedal/gatsby-node.js
// DA SPECIFICIRAS OVU KOMPONENTU

// TADA CES DEFINISATI I CONTEXT, ONDNO PROSLEDICES, UPRAVO id BAS TADA
// A TAJ ID JESTE QUERY VARIJABLA, KOJA CE BITI POTREBNA DA SE NAPRAVI
// QUERY, KOJI SAM DEFINISAO U OVOM FAJLU

export default GroupPageTemplate;
