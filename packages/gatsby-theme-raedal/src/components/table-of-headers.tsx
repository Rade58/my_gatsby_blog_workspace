/** @jsx jsx */
import { jsx } from "theme-ui";

import { FunctionComponent } from "react";

import { HeadingI } from "../templates/blog-post-template";

interface TableOfHeadingsProps {
  headings: HeadingI[];
}

const TableOfHeadings: FunctionComponent<TableOfHeadingsProps> = ({
  headings,
}) => (
  <section>
    <ul>
      {headings.map(({ depth, value }) => (
        <li>{value}</li>
      ))}
    </ul>
  </section>
);

export default TableOfHeadings;
