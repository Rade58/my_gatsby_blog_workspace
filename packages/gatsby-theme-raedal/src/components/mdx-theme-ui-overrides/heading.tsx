/** @jsx jsx */

import { jsx } from "theme-ui";
import { useContext, FunctionComponent } from "react";
import { css } from "@emotion/core";

import { Link } from "gatsby";
import { $_useBlogPostReducerState } from "../../context_n_reducers/context_n_reducer_blog_post";

type HeadingsI = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// PRAVIM FUNKCIJU KOJA OUTPUT-UJE KOMPONENTU
// DAKE U PITANJU JE HIGHER ORDER COMPONENT PRINCIP

// OVE KOMPONENTE CE DAKEL KORISTITI MDX JER SAM NAVEO
// PLUGIN, KOJI CE EMBEDOVATI ANCHORE OKO HEDINGS-A,
// UPRAVO U CONFIG FAJLU UZ KONFIGURIRANJE MDX PLUGINA

const giveHeading: (Tag: HeadingsI) => FunctionComponent<{ id: string }> = (
  Tag
) => (props) => {
  if (!props.id) return <Tag {...props} />;

  // KORISTICU I CONTEXT

  const { blogPostContext } = $_useBlogPostReducerState;

  const { relativeLink } = useContext(blogPostContext);

  return (
    <Tag
      {...props}
      id={undefined}
      css={css`
        position: relative;
        z-index: 50;

        border: blanchedalmond solid 1px;
        margin-left: auto;
        margin-right: auto;
        width: max-content & > a {
          text-decoration-line: none;
          color: inherit;
          margin-left: 10%;

          /* box-sizing: border-box; */

          border: pink solid 1px;
          position: relative;
        }

        &:hover > a::before {
          content: "🔗";
          font-size: 1.8rem;
          position: absolute;
          left: -30px;
        }
      `}
    >
      <div
        id={props.id}
        css={css`
          border: tomato solid 1px;

          padding-top: calc(30px + 58px);

          @media screen and (min-width: 918px) {
            padding-top: calc(38px + 58px);
          }
        `}
      />
      <Link to={`${encodeURI(relativeLink)}#${props.id}`}> </Link>
      {props.children}
    </Tag>
  );
};

export default giveHeading;
