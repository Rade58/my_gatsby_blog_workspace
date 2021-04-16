import React, { useContext, FunctionComponent } from "react";

import { Helmet } from "react-helmet";

import { $_useAuthorPageState } from "../context_n_reducers/author_page_con_red";
import { additionalStyles } from "../common-styles";

const AuthorSeo: FunctionComponent = () => {
  const { authorPageContext } = $_useAuthorPageState;
  const { authorPage } = useContext(authorPageContext);
  const { authorName, about, lang } = authorPage;
  const { bodyBackgroundColor } = additionalStyles;

  // console.log(authorPage);

  return (
    <Helmet>
      <html lang={lang} />
      <title>{`${authorName} <-- Author`}</title>
      <meta name="description" content={about} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content={bodyBackgroundColor} />
    </Helmet>
  );
};

export default AuthorSeo;
