import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";

import { LocationI } from "./group-page-template"; // NE KORITIM NI ZASTA, ALI DA ZNAM DA POSTOJI

export interface AuthorPageContextPropI {
  id: string;
}

export interface AuthorPageTemplatePropsI {
  pageContext: AuthorPageContextPropI;
  data: AuthorPageDataPropI;
  location: LocationI;
}

export interface AuthorPageDataPropI {
  authorID: string;
  authorName: string;
  about: string;
  lang: string;

  authorImage: AuthorImageI;
  authorPlaceholderSvg: AuthorImageI;
  github: SocialMedia;
  twitter: SocialMedia;
  instagram: SocialMedia;
  linkedin: SocialMedia | null;
  youtube: SocialMedia | null;
  facebook: SocialMedia | null;

  personalWebsite: string | null;
}

export interface AuthorImageI {
  image: string;
  mediaType: string;
}

export interface SocialMedia {
  network: string;
  url: string;
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

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AuthorPageTemplate;
