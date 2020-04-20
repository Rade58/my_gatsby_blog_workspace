/** @jsx jsx */

import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";

import { FunctionComponent } from "react";

const NavInHeader: FunctionComponent = () => {
  const a = "";

  return (
    <nav
      className="blog-navigation-subjects"
      css={css`
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-content: space-between;
        align-items: center;
        margin-left: auto;
        margin-right: 2px;
        border: 2px solid pink;
        width: 38%;
        & a {
          color: white;
          border: pink solid 1px;
          text-decoration-line: none;
          font-family: Ubuntu, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

          &:hover {
            color: "blanchedalmond";
          }
        }
      `}
    >
      <Link to="/">React</Link>
      <Link to="/">GraphQL</Link>
      <Link to="/">Typescript</Link>
      <Link to="/">CSS</Link>
    </nav>
  );
};

export default NavInHeader;
