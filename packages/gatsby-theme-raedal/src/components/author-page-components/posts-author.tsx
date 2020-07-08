/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { FunctionComponent } from "react";

import { LastTenPostsType } from "../../templates/author-page-template";

import { additionalStyles } from "../../common-styles";

interface PropsLastTenPostsI {
  lastTenPosts: LastTenPostsType;
}

const LastTenPosts: FunctionComponent<PropsLastTenPostsI> = (props) => {
  const { lastTenPosts } = props;
  const { cardBackgroundColor, headerBackgroundImage } = additionalStyles;

  console.log(lastTenPosts);

  return (
    <section
      className="last-ten-posts"
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, 100%);
        grid-template-rows: auto;

        justify-content: center;

        /* ---------------------- */

        /* ---------------------- */

        width: 100%;

        @media screen and (min-width: 700px) {
          width: 88vw;
          grid-template-columns: repeat(auto-fit, minmax(200px, 520px));
        }

        @media screen and (min-width: 910px) {
          width: 78vw;
          grid-template-columns: repeat(auto-fit, minmax(200px, 460px));
        }

        @media screen and (min-width: 1086px) {
          width: 68vw;
          grid-template-columns: repeat(auto-fit, minmax(200px, 360px));
        }

        margin-right: auto;
        margin-left: auto;

        & div.card {
          background-color: ${cardBackgroundColor};
          border: olive solid 0px;
          margin-left: 4px;
          margin-right: 4px;
          margin-bottom: 8px;
          border-radius: 2px;

          @media screen and (max-width: 680px) {
            margin-left: 8px;
            margin-right: 8px;
            /* ------------------------------------------- */
            box-shadow: 0 0px 15px -22px rgba(0, 0, 0, 0.157),
              0 0px 16.9px -22px rgba(0, 0, 0, 0.225),
              0 0px 18.2px -22px rgba(0, 0, 0, 0.293),
              0 0px 30px -22px rgba(0, 0, 0, 0.45);

            /* ------------------------------------------- */
          }

          display: flex;
          flex-direction: column;

          position: relative;

          & div.group-icon {
            position: absolute;

            /* margin-left: auto; */

            right: 4px;

            width: 10%;

            border: pink solid 0px;

            margin-right: 6px;
            margin-top: 6px;

            & a {
              & img {
                height: 2rem;
                &:hover {
                  transform: scale3d(1.1, 1.1, 1.1);
                }
              }
            }
          }

          & h1 {
            width: 78%;

            margin-top: 5px;
            margin-left: 6px;

            & a {
              color: blanchedalmond;
              text-decoration-line: none;
              font-weight: 400;

              &:hover {
                text-decoration-line: underline;
                text-decoration-color: blanchedalmond;
              }

              @media screen and (max-width: 680px) {
                text-decoration-line: underline;
              }
            }
          }

          & div.separ-post {
            height: 2px;
            width: 80%;
            background-color: blanchedalmond;
            background-image: ${headerBackgroundImage};
            margin-top: auto;
            margin-right: auto;
            margin-left: auto;
          }

          & p.descr {
            margin: 10px;
            text-align: center;
          }

          & div.times {
            margin-top: 8px;

            margin-bottom: 4px;
            margin-left: 6px;
            margin-right: 6px;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            border: olive solid 0px;

            & time {
              font-size: 0.85rem;
              text-decoration-line: underline;
              color: blanchedalmond;

              @media screen and (max-width: 680px) {
                text-decoration-line: none;
                color: #dd8ab8;
              }
            }

            & > div {
              width: max-content;
              font-size: 0.85rem;
            }

            & > div:nth-of-type(1) {
              margin-right: auto;
            }
            & > div:not(:nth-of-type(1)) {
              margin-left: auto;
            }
          }
        }
      `}
    >
      {/* {JSON.stringify(lastTenPosts, null, 2)} */}
      {lastTenPosts.map((post) => {
        const {
          title,
          description,
          createdAt,
          updated,
          group,
          path: postPath,
          themeColor,
        } = post;

        const { icon, path, underlineColor, name } = group;

        return (
          <div className="card" key={title}>
            <div className="group-icon">
              <Link to={encodeURI(path)}>
                <img src={`data:image/svg+xml;base64,${icon}`} alt={name} />
              </Link>
            </div>
            <h1>
              <Link to={encodeURI(postPath)}>{title}</Link>
            </h1>
            <div className="separ-post" />
            <p className="descr">{description}</p>
            <div className="separ-post" />
            <div className="times">
              <div>
                published: <time>{createdAt}</time>
              </div>
              <div>
                updated: <time>{updated}</time>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default LastTenPosts;
