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
      /* border: ${keywordBorderColor} solid 0.2px; */
      border-radius: 2px;
      /* box-shadow: 0.2px 0.2px 0.2px ${keywordBorderColor}; */
      font-size: 14px;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      text-decoration: none;
      padding: 4px;
      margin: 4px;
      color: ${keywordTextColor};
      background-color: ${keywordColor};
    }

    &:hover {
      opacity: 0.8;
    }

    box-shadow:
  0 0.3px 0.7px rgba(0, 0, 0, 0.42),
  0 0.8px 1.8px rgba(0, 0, 0, 0.29),
  0 1.6px 3.7px rgba(0, 0, 0, 0.234),
  0 3.3px 7.7px rgba(0, 0, 0, 0.186),
  0 9px 21px rgba(0, 0, 0, 0.13)
;

  `;

  return <KeywordLink to={path}>{keyword}</KeywordLink>;
};

export default GpKeyword;
