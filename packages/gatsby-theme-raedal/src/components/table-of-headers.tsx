/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import { useContext, FunctionComponent } from "react";

import { HeadingI } from "../templates/blog-post-template";

import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

// AKO NEKAD BUDES ZELEO DA PROSLEDIS PROPSE, MADA SADA
// TO NECU RADITI, JER KORISTIM CONTEXT
interface TableOfHeadingsProps {
  headings?: HeadingI[];
}

const TableOfHeadings: FunctionComponent<TableOfHeadingsProps> = (props) => {
  const { blogPostContext } = $_useBlogPostReducerState;

  // eslint-disable-next-line
  const { headings } = props.headings ? props : useContext(blogPostContext);

  return (
    // OVO JE SAMO PROBNO IME KLASE (UKLONI OVO I DEFINISI PRAVU KLASU)
    <section
      className="adds"
      css={css`
        position: sticky;
        top: 4px;
      `}
    >
      <ul>
        {headings &&
          headings.map(({ depth, value }) => (
            <li key={`${value}-${depth}`}>
              <a href={`#${encodeURI(value.toLowerCase())}`}>{value}</a>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default TableOfHeadings;
