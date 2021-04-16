/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql, useStaticQuery } from "gatsby";
import { FunctionComponent } from "react";

import KeywordModal from "../components/keyword-modal";

const TableOfKeywords: FunctionComponent = () => {
  const data = useStaticQuery(graphql`
    query groupPagesKeywords {
      groups: allGroupPage {
        nodes {
          icon
          name
          path
        }
      }
    }
  `);

  return <KeywordModal keywords={data.groups.nodes} />;
};

export default TableOfKeywords;
