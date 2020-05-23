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
            margin-left: auto;
            font-size: 55px;
            border: pink solid 1px;
            text-align: center;
          }
        }

        & div.times {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;

          & .mark-line {
            width: 10%;
            border-top: ${themeColor} solid 1px;
            align-self: center;

            @media screen and (max-width: 368px) {
              display: none;
            }
          }

          /* ------------------------------------------ */
          /* @media screen and (min-width: 918px) {
            h4.updated {
              width: fit-content;
            }
            
            h4.created {
              width: fit-content;
            }
          }
          
          @media screen and (min-width: 1100px) {
            h4.updated {
              width: max-content;
            }
            
            h4.created {
              width: max-content;
            }
          } */
          /* ------------------------------------- */
          & a {
            border: pink solid 0px;
            height: min-content;
            width: min-content;
            justify-self: center;
            /* margin-right: 0.2rem; */
            /* margin-right: auto; */
            /* margin-left: auto;  */
            margin-top: auto;
            margin-bottom: auto;
            transition-property: transform;
            transition-duration: 0.4s;

            margin-right: ${isUpdated ? 0 : "1em"};

            & img {
              height: 2rem;
            }

            &:hover {
              transform: scale(1.2);
            }
          }

          & time {
            color: #e4cdc3;
          }

          & h4.created {
            border: crimson solid 0px;
            margin-right: auto;
            margin-left: 1em;
            /* justify-self: flex-start; */
            width: min-content;
            font-weight: 400;

            @media screen and (min-width: 541px) {
              width: max-content;
            }

            & time {
              white-space: nowrap;
              text-decoration-line: underline;
            }

            & span {
            }
          }

          & h4.updated {
            border: tomato solid 0px;
            margin-right: 1em;
            margin-left: auto;
            width: min-content;
            font-weight: 400;

            @media screen and (min-width: 541px) {
              width: max-content;
            }

            & time {
              white-space: nowrap;
              text-decoration-line: underline;
            }

            & span {
            }
          }
        }
      `}
    >
      <div className="headingz">
        <h1 className="h-title">{title}</h1>
      </div>

      <div className="times">
        <h4 className="created">
          <span className="pubspan">Published</span>:<time> {createdAt}</time>
        </h4>
        {isUpdated ? <div className="mark-line" /> : null}
        <Link to={path}>
          <img src={`data:image/svg+xml;base64,${icon}`} alt="group-icon" />
        </Link>
        {isUpdated ? <div className="mark-line" /> : null}
        {isUpdated ? (
          <h4 className="updated">
            <span className="upspan">updated</span>:<time> {updated}</time>
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
