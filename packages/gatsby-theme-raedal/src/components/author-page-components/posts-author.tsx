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
  const { cardBackgroundColor } = additionalStyles;

  console.log(lastTenPosts);

  return (
    <section
      className="last-ten-posts"
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 360px));
        grid-template-rows: auto;

        justify-content: center;

        width: 68vw;
        margin-right: auto;
        margin-left: auto;

        & div.card {
          background-color: ${cardBackgroundColor};
          border: olive solid 0px;
          margin-left: 4px;
          margin-right: 4px;
          margin-bottom: 8px;
          border-radius: 2px;

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

              &:hover {
                text-decoration-line: underline;
                text-decoration-color: blanchedalmond;
              }
            }
          }

          & hr {
            width: 50%;
            color: crimson;
          }

          & p.descr {
            margin: 10px;
            text-align: center;
          }

          & div.times {
            margin-top: auto;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            border: olive solid 1px;

            & time {
              font-size: 0.8rem;
              text-decoration-line: underline;
              color: blanchedalmond;
            }

            & > div {
              width: max-content;
              font-size: 0.8rem;
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
            <hr />
            <p className="descr">{description}</p>
            <hr />
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
