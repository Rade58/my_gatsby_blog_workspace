import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";
import AuthorPage from "../components/author-page-components/author-page";

import { LocationI } from "./group-page-template"; // NE KORITIM NI ZASTA, ALI DA ZNAM DA POSTOJI

export interface AuthorPageContextPropI {
  id: string;
}

export interface AuthorPageTemplatePropsI {
  pageContext: AuthorPageContextPropI;
  data: { authorPage: AuthorPageDataI };
  location: LocationI;
}

export interface AuthorPageDataI {
  authorID: string;
  authorName: string;
  about: string;
  lang: string;

  authorImage: AuthorImageI;
  authorPlaceholderSvg: AuthorImageI;
  github: SocialMedia;
  twitter: SocialMedia;
  instagram: SocialMedia;
  linkedin: SocialMedia;
  youtube: SocialMedia;
  facebook: SocialMedia;

  personalWebsite: string;
}

export interface AuthorImageI {
  image: string;
  mediaType: string;
}

export interface SocialMedia {
  network: string;
  /**
   * @description OBRATI PAZNJU DA URL MOZE BITI NULL (OVO SAM ZADAO ZBOG CONTEXTA AK OSE SECAS A VEROVATN OSE NE SECAS (PROBLE MSA CONTEXT-OM KOJ ISAM RESIO))
   */
  url?: string | null;
  icon: AuthorImageI;
}

export const TakeOneAuthorPage = graphql`
  query getAythorPage($id: String!) {
    authorPage(id: { eq: $id }) {
      authorID
      authorName
      lang
      about

      authorImage {
        image
        mediaType
      }
      authorPlaceholderSvg {
        image
        mediaType
      }

      github {
        network
        url
        icon {
          image
          mediaType
        }
      }
      twitter {
        network
        url
        icon {
          image
          mediaType
        }
      }
      instagram {
        network
        url
        icon {
          image
          mediaType
        }
      }
      linkedin {
        network
        url
        icon {
          image
          mediaType
        }
      }
      youtube {
        network
        url
        icon {
          image
          mediaType
        }
      }
      facebook {
        network
        url
        icon {
          image
          mediaType
        }
      }

      personalWebsite
    }
  }
`;

const AuthorPageTemplate: FunctionComponent<AuthorPageTemplatePropsI> = (
  props
) => {
  const { pageContext, data } = props;
  const { authorPage } = data;

  return <AuthorPage authorPage={authorPage} />;
};

export default AuthorPageTemplate;
