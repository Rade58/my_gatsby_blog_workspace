/** @jsx jsx */
import { jsx } from "theme-ui";
import { useContext, FunctionComponent } from "react";
import { css } from "@emotion/core";
import { Link } from "gatsby";
// import styled from "@emotion/styled";
//
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";
//

const HeadingMajor: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { createdAt, isUpdated, updated, seo, groupPage } = useContext(
    blogPostContext
  );
  const { title, themeColor } = seo;
  const { icon, path } = groupPage;

  return (
    <section
      className="major-heading"
      css={css`
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        align-content: stretch;

        & .headingz {
          display: flex;
          flex-direction: row;
          width: 100%;
          border: olive solid 1px;

          & h1.h-title {
            font-weight: 400;
            margin-right: auto;
            font-size: 55px;
            border: pink solid 1px;
            text-align: center;
          }

          & a {
            height: min-content;
            margin-right: 0.2rem;
            margin-left: auto;
            margin-top: auto;
            margin-bottom: auto;
            transition-property: transform;
            transition-duration: 0.4s;

            &:hover {
              transform: scale(1.2);
            }
          }

          & img {
            height: 2rem;
          }
        }

        & div.times {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;

          & h4.created {
            border: crimson solid 1px;
            margin-right: auto;
            margin-left: 1em;
            justify-self: flex-start;

            & time {
              white-space: nowrap;
            }
          }

          & h4.updated {
            border: tomato solid 1px;
            margin-right: 1em;
            width: min-content;

            & time {
              white-space: nowrap;
            }
          }
        }
      `}
    >
      <div className="headingz">
        <Link to={path}>
          <img src={`data:image/svg+xml;base64,${icon}`} alt="group-icon" />
        </Link>
        <h1 className="h-title">{title}</h1>
      </div>

      <div className="times">
        <h4 className="created">
          <span>Published: </span>
          <time>{createdAt}</time>
        </h4>
        {isUpdated ? (
          <h4 className="updated">
            <span>updated: </span>
            <time>{updated}</time>
          </h4>
        ) : null}
      </div>
      <div
        css={css`
          border-top: ${themeColor} solid 2px;
          width: 80%;
          height: 0px;
        `}
      />
    </section>
  );
};

export default HeadingMajor;
