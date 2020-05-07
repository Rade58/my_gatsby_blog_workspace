import { Link } from "gatsby";

import React, { FunctionComponent } from "react";

import { css } from "@emotion/core";

import styled from "@emotion/styled";

// TYPE ZA KEYWORDS
import { PageKeywords } from "../../templates/group-page-template";
//

// STILIZOVACU LINK KROZ STYLED COMPONENT

const GpKeyword: FunctionComponent<PageKeywords> = (props) => {
  const { keyword, path, keywordColor, keywordTextColor } = props;

  const KeywordLink = styled(Link)`
    & {
      border: blanchedalmond solid 2px;
      border-radius: 4px;

      color: ${keywordTextColor};
      background-color: ${keywordColor};
    }
  `;

  return <KeywordLink to={path}>{keyword}</KeywordLink>;
};

export default GpKeyword;
