/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { FunctionComponent, useContext } from "react";

import { $_useAuthorPageState } from "../../context_n_reducers/author_page_con_red";

const Profile: FunctionComponent = () => {
  const { authorPageContext } = $_useAuthorPageState;

  const { authorPage } = useContext(authorPageContext);

  const { authorPlaceholderSvg, authorImage } = authorPage;
  const { image: iconBase64, mediaType: iconMediaType } = authorPlaceholderSvg;
  const {
    image: authorImageBase64,
    mediaType: authorImageMediaType,
  } = authorImage;

  return (
    <section
      className="profile"
      css={css`
        border: tomato solid 1px;
        display: flex;

        /* === !==  AMO PROBNO  === !==  === */
        /* & img {
          width: 250px;
        } */
        /* === !== === !== === !== */

        & div.author-image {
          border: blanchedalmond solid 4px;
          border-radius: 50%;
          overflow: hidden;
          width: 20vw;

          & img {
            width: 100%;
          }
        }
      `}
    >
      <div className="author-image">
        {authorImageBase64 ? (
          <img
            src={`data:${authorImageMediaType};base64,${authorImageBase64}`}
            alt="profile placeholder"
          />
        ) : (
          <img
            src={`data:${iconMediaType};base64,${iconBase64}`}
            alt="profile placeholder"
          />
        )}
      </div>
    </section>
  );
};

export default Profile;
