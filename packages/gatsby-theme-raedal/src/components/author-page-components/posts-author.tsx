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

          & h1 {
            & a {
              color: blanchedalmond;
              text-decoration-line: none;

              &:hover {
                text-decoration-line: underline;
                text-decoration-color: blanchedalmond;
              }
            }
          }

          & div.group-icon {
            & a {
              & img {
                height: 2rem;
                &:hover {
                  transform: scale3d(1.1, 1.1, 1.1);
                }
              }
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
            <h1>
              <Link to={encodeURI(postPath)}>{title}</Link>
            </h1>
            <div className="group-icon">
              <Link to={encodeURI(path)}>
                <img src={`data:image/svg+xml;base64,${icon}`} alt={name} />
              </Link>
            </div>
            <p>{description}</p>
            <div className="times">
              <div>published: {createdAt}</div>
              <div>updated: {updated}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default LastTenPosts;
