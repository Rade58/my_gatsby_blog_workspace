/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { FunctionComponent } from "react";

import { additionalStyles } from "../../common-styles";

import Kebab from "./kebab-gr";

const Header: FunctionComponent = () => {
  let a;

  return (
    <header
      sx={{
        // variant: "borders.primary",
        backgroundImage: additionalStyles.headerBackgroundImage,
      }}
      css={css`
        display: flex;
        justify-content: space-evenly;

        & div.home {
          border: solid pink 1px;

          & a {
            color: blanchedalmond;
            text-decoration-line: none;
            font-size: 1.2rem;

            &:hover {
              text-decoration-line: underline;
            }
          }
        }

        & div.algolia-placeholder {
          width: 10vw;
          height: auto;
          border: blanchedalmond solid 1px;
        }
      `}
    >
      <div className="home">
        <Link to="/">
          <span role="img" aria-label="home">
            🏡
          </span>
        </Link>
      </div>
      <Kebab />
      <div className="algolia-placeholder" />
    </header>
  );
};

export default Header;
