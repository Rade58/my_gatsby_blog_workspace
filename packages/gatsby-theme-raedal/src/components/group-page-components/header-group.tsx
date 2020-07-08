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

        box-shadow: 0 2.4px 1.3px rgba(0, 0, 0, 0.22),
          0 5.8px 2.4px rgba(0, 0, 0, 0.178),
          0 10.5px 3.3px rgba(0, 0, 0, 0.128), 0 14px 4px rgba(0, 0, 0, 0.067);

        & div.home {
          margin: 8px 0;
          border: solid pink 0px;

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
          margin: 8px 0;
        }
      `}
    >
      <div className="home">
        <Link to="/">
          <span role="img" aria-label="home">
            🏡 Home
          </span>
        </Link>
      </div>
      <Kebab />
      <div className="algolia-placeholder" />
    </header>
  );
};

export default Header;
