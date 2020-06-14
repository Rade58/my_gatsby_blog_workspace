/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql, useStaticQuery } from "gatsby";
import { FunctionComponent } from "react";

import KeywordsModalGroup from "../components/group-page-components/keyword-modal-gr";

const TableOfKeywords: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query groupPagesKeywordsGR {
      groups: allGroupPage {
        nodes {
          icon
          name
          path
        }
      }
    }
  `);

  return <KeywordsModalGroup keywords={data.groups.nodes} />;
};

export default TableOfKeywords;
