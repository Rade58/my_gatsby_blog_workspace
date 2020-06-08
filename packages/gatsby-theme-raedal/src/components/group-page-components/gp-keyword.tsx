import { Link } from "gatsby";

import React, { FunctionComponent } from "react";

import { css } from "@emotion/core";

import styled from "@emotion/styled";

// TYPE ZA KEYWORDS
import { PageKeywords } from "../../templates/group-page-template";
//

// STILIZOVACU LINK KROZ STYLED COMPONENT

const GpKeyword: FunctionComponent<PageKeywords> = (props) => {
  const {
    keyword,
    path,
    keywordColor,
    keywordTextColor,
    keywordBorderColor,
  } = props;

  const KeywordLink = styled(Link)`
    & {
      /* border: ${keywordBorderColor} solid 1px; */
      border-radius: 4px;
      box-shadow: 0.5px 0.5px 0.5px ${keywordBorderColor};
      font-size: 14px;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      text-decoration: none;
      padding: 4px;
      margin: 4px;
      color: ${keywordTextColor};
      background-color: ${keywordColor};
    }
  `;

  return <KeywordLink to={path}>{keyword}</KeywordLink>;
};

export default GpKeyword;
