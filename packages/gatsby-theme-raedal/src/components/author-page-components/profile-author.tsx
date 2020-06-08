/** @jsx jsx */
import { jsx, Divider } from "theme-ui";
import { css } from "@emotion/core";
import { FunctionComponent, useContext } from "react";

import SocialMediaCard from "./card-social-media";
import LastTenPosts from "./posts-author";

import { $_useAuthorPageState } from "../../context_n_reducers/author_page_con_red";

const Profile: FunctionComponent = () => {
  const { authorPageContext } = $_useAuthorPageState;

  const { authorPage } = useContext(authorPageContext);

  const {
    authorPlaceholderSvg,
    lastTenPosts,
    authorImage,
    about,
    authorName,
    github,
    twitter,
    instagram,
    facebook,
    youtube,
    linkedin,
    personalWebsite,
  } = authorPage;
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
        flex-direction: column;
        flex-wrap: nowrap;
        width: 100%;

        & > * {
          margin-top: 4px;
          margin-bottom: 4px;
        }

        /* === !==  AMO PROBNO  === !==  === */
        /* & img {
          width: 250px;
        } */
        /* === !== === !== === !== */

        & div.author-image {
          border: blanchedalmond solid 4px;
          border-radius: 50%;
          overflow: hidden;
          width: 10vw;
          align-self: center;
          margin-top: 10vh;

          & img {
            width: 100%;
          }
        }

        & div.about-author {
          border: olive solid 1px;
        }

        & h1.author-name {
          border: yellow solid 1px;
          font-size: 2.8rem;
          font-weight: 200;
          align-self: center;
        }

        & div.social-media {
          border: orange solid 1px;
          display: flex;
          justify-content: center;

          & > * {
            margin-left: 4px;
            margin-right: 4px;

            &.personal-site {
              background-color: blanchedalmond;
            }
          }
        }

        & section.last-ten-posts {
          border: tomato solid 4px;
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
      <h1 className="author-name">{authorName}</h1>
      <div className="about-author">{about}</div>
      <div className="social-media">
        {twitter.url && <SocialMediaCard {...twitter} />}
        {linkedin.url && <SocialMediaCard {...github} />}
        {github.url && <SocialMediaCard {...github} />}
        {facebook.url && <SocialMediaCard {...facebook} />}
        {instagram.url && <SocialMediaCard {...instagram} />}
        {youtube.url && <SocialMediaCard {...youtube} />}
        {personalWebsite && (
          <div className="personal-site">
            <a href={personalWebsite} about="__blank">
              Website
            </a>
          </div>
        )}
      </div>
      <LastTenPosts lastTenPosts={lastTenPosts} />
    </section>
  );
};

export default Profile;
