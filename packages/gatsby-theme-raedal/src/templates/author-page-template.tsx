import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";

import { LocationI } from "./group-page-template"; // NE KORITIM NI ZASTA, ALI DA ZNAM DA POSTOJI

export interface AuthorPageContextPropI {
  id: string;
}

export interface AuthorPageDataPropI {
  authorID: string;
}

export interface AuthorPageTemplatePropsI {
  pageContext: AuthorPageContextPropI;
  data: AuthorPageDataPropI;
  location: LocationI;
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
