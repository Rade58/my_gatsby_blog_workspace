/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { FunctionComponent, useContext } from "react";
import { css } from "@emotion/core";
import { additionalStyles } from "../../common-styles";
import { $_useAuthorPageState } from "../../context_n_reducers/author_page_con_red";

const Header: FunctionComponent = () => {
  const { headerBackgroundImage, bodyBackgroundColor } = additionalStyles;
  const { authorPageContext } = $_useAuthorPageState; // ZA SADA NE PTREBA A MOGUCE DA CE NEKAD U BUDUCNOSTI ZATREBATI KADA PROSIRIM DATA ZA QUEYING

  return (
    <header
      css={css`
        height: fit-content;
        width: 100%;
        background-color: ${bodyBackgroundColor};
        background-image: ${headerBackgroundImage};
      `}
    >
      <div className="home">
        <Link to="/">
          <span role="img" aria-label="home">
            🏡
          </span>{" "}
          Home
        </Link>
      </div>
    </header>
  );
};

export default Header;
