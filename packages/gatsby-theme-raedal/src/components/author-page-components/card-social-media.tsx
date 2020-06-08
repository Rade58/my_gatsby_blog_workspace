/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { FunctionComponent } from "react";

import { SocialMedia } from "../../templates/author-page-template";

const SocialMediaCard: FunctionComponent<SocialMedia> = (props) => {
  const { icon, url } = props;
  const { image, mediaType } = icon;

  return (
    <div
      className="social-media-card"
      css={css`
        height: 2em;
      `}
    >
      {url && (
        <Link to={url}>
          <img
            src={`data:${mediaType};base64,${image}`}
            alt="social media icon"
          />
        </Link>
      )}
    </div>
  );
};

export default SocialMediaCard;
