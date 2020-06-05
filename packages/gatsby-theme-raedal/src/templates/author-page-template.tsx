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
      authorName
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
