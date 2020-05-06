import { Link } from "gatsby";

import React, { FunctionComponent } from "react";

import styled from "@emotion/styled";

// TYPE ZA KEYWORDS
import { PageKeywords } from "../../templates/group-page-template";
//

// STILIZOVACU LINK KROZ STYLED COMPONENT

const KeywordLink = styled(Link)`
  & {
    border: pink solid 1px;
  }
`;

const GpKeyword: FunctionComponent<PageKeywords> = (props) => {
  const { keyword, path } = props;

  return <KeywordLink to={path}>{keyword}</KeywordLink>;
};

export default GpKeyword;
