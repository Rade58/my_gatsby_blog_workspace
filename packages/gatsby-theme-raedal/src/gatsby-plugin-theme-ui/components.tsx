/** @jsx jsx */

import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";

import Code from "../components/mdx-theme-ui-overrides/code";

type HeadingsI = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// PRAVIM FUNKCIJU KOJA OUTPUT-UJE KOMPONENTU
// DAKE U PITANJU JE HIGHER ORDER COMPONENT PRINCIP

// OVE KOMPONENTE CE DAKEL KORISTITI MDX JER SAM NAVEO
// PLUGIN, KOJI CE EMBEDOVATI ANCHORE OKO HEDINGS-A,
// UPRAVO U CONFIG FAJLU UZ KONFIGURIRANJE MDX PLUGINA

const heading: (Tag: HeadingsI) => FunctionComponent<{ id: string }> = (
  Tag
) => (props) => {
  if (!props.id) return <Tag {...props} />; // eslint-disable-line

  return (
    <Tag
      // eslint-disable-next-line
      {...props}
      css={css`
        position: relative;
        z-index: 50;

        & > a {
          text-decoration-line: none;
          color: inherit;
          margin-left: 10%;

          /* box-sizing: border-box; */

          border: pink solid 1px;

          &:hover::before {
            content: "🔗";
            font-size: 1.2rem;
            position: absolute;
            top: 2px;
            left: 5px;
          }
        }
      `}
    >
      <a href={`#${props.id}`}>{props.children}</a>
    </Tag>
  );
};

const components = {
  // h1: heading("h1"),
  h2: heading("h2"),
  /* h3: heading("h3"),
  h4: heading("h4"),
  h5: heading("h5"),
  h6: heading("h6"), */
  pre: Code,
};

export default components;
