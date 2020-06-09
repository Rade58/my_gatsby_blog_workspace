/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { FunctionComponent } from "react";

import { additionalStyles } from "../../common-styles";

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

        & a {
          color: blanchedalmond;
        }
      `}
    >
      <Link to="/">
        <span role="img" aria-label="home">
          🏡
        </span>
      </Link>
    </header>
  );
};

export default Header;
