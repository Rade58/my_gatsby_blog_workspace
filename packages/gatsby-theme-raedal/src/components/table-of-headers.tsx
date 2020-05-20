/** @jsx jsx */
import { jsx } from "theme-ui";

import { Link } from "gatsby";
// import { AnchorLink } from "gatsby-plugin-anchor-links";

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

  const { headings, relativeLink } = useContext(blogPostContext);

  return (
    // OVO JE SAMO PROBNO IME KLASE (UKLONI OVO I DEFINISI PRAVU KLASU)
    <section
      style={{ display: headings.length ? "inline-block" : "none" }}
      className="adds"
      css={css`
        position: sticky;
        border: pink solid 8px;
        top: 14vh;
        height: min-content;
      `}
    >
      <ul>
        {headings &&
          headings.length !== 0 &&
          headings.map(({ depth, value }) => (
            <li key={`${value}-${depth}`}>
              <Link
                to={`${encodeURI(relativeLink)}#${encodeURI(value.toLowerCase())
                  .replace(/%20/g, "-")
                  .replace(/ /g, "-")}`}
              >
                {value}
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default TableOfHeadings;
