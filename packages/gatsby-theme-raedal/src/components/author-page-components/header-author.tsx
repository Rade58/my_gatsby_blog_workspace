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

        box-shadow: 0 2.4px 1.4px rgba(0, 0, 0, 0.07),
          0 5.8px 1.8px rgba(0, 0, 0, 0.057),
          0 10.5px 2.8px rgba(0, 0, 0, 0.041), 0 14px 4px rgba(0, 0, 0, 0.021);

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        & div.home {
          margin: 8px 0;

          border: blanchedalmond solid 0px;
          & a {
            color: blanchedalmond;
            text-decoration-line: none;
            &:hover {
              text-decoration-line: underline;
            }
          }
        }

        & div.algolia-search-placeholder {
          width: 20vw;
          height: auto;
          margin: 10px;
          border: pink solid 1px;
        }
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
      <div className="algolia-search-placeholder" />
    </header>
  );
};

export default Header;
