/** @jsx jsx */
import { jsx } from "theme-ui";
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
        height: 3em;
        border: red solid 0px;
        width: fit-content;

        & img {
          height: 100%;
        }
      `}
    >
      {url && (
        <a href={url} target="__blank">
          <img
            src={`data:${mediaType};base64,${image}`}
            alt="social media icon"
          />
        </a>
      )}
    </div>
  );
};

export default SocialMediaCard;
