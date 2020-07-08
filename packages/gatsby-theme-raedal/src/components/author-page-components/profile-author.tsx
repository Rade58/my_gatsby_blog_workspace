/** @jsx jsx */
import { jsx, Divider } from "theme-ui";
import { css } from "@emotion/core";
import { FunctionComponent, useContext } from "react";

import SocialMediaCard from "./card-social-media";
import LastTenPosts from "./posts-author";

import { $_useAuthorPageState } from "../../context_n_reducers/author_page_con_red";
import { additionalStyles } from "../../common-styles";

const Profile: FunctionComponent = () => {
  const { headerBackgroundImage } = additionalStyles;

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
        border: tomato solid 0px;
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

        & > div.author-image {
          border: blanchedalmond solid 0px;

          /* === !== === BORDER IMAGE !== === !== */
          /* border-image: ${headerBackgroundImage}; */

          /* === !== === !== === !== === !== === */




          /* border-radius: 50%; */
          overflow: hidden;
          width: 204px;
          height: 204px;
          align-self: center;
          margin-top: 10vh;
          position: relative;

          & > div {

            background-image: ${headerBackgroundImage};
            background-color: blanchedalmond;
            width: 198px;
            height: 198px;
            padding: 8px;
            margin: auto;

            border-radius: 50%;

            & img {
              width: 100%;
              border-radius: 50%;
              margin-top: 1px;
            }

          }


        }

        & div.about-author {
          border: olive solid 0px;
          width: 60vw;
          margin: 20px auto;
          text-align: center;

          @media screen and (max-width: 680px) {
            width: 90vw;
          }

        }

        & h1.author-name {
          border: yellow solid 0px;
          font-size: 2.8rem;
          font-weight: 200;
          align-self: center;
        }

        & div.social-media {
          border: orange solid 0px;
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
          border: tomato solid 0px;
        }

        & div.recent-heading {
          display: flex;
          justify-content: center;
          align-items: center;

          & h2 {
            color: blanchedalmond;
            margin-right: 2rem;
            margin-left: 2rem;
            
            @media screen and (max-width: 680px) {
              margin-right: 0.4rem;
              margin-left: 0.4rem;
            
            }

          }

          & span.separ {
            height: 2px;
            width: 28vw;
            background-color: blanchedalmond;
            background-image: ${headerBackgroundImage};

            @media screen and (max-width: 690px) {
              width: 48px;
            }

          }
        }
      `}
    >
      <div className="author-image">
        <div>
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
      <div className="recent-heading">
        <span className="separ" />
        <h2>Recent Posts</h2>
        <span className="separ" />
      </div>
      <LastTenPosts lastTenPosts={lastTenPosts} />
    </section>
  );
};

export default Profile;
