/** @jsx jsx */
import { jsx } from "theme-ui";
import { useContext, FunctionComponent } from "react";
import { css } from "@emotion/core";
import { Link } from "gatsby";
// import styled from "@emotion/styled";
//
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";
//
import { additionalStyles } from "../common-styles";
//

const HeadingMajor: FunctionComponent = () => {
  const { headerBackgroundImage } = additionalStyles;
  const { blogPostContext } = $_useBlogPostReducerState;
  const { createdAt, isUpdated, updated, seo, groupPage, author } = useContext(
    blogPostContext
  );
  const { title, themeColor } = seo;

  const { authorName, path: authorPath } = author;

  let icon;
  let path;
  let groupColor;

  if (groupPage) {
    const { icon: ic, path: pa, groupColor: gk } = groupPage;
    icon = ic;
    path = pa;
    groupColor = gk;
  }

  return (
    <section
      className="major-heading"
      css={css`
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        align-content: stretch;

        & div.author {
          margin-bottom: 28px;
          margin-top: 1vh;

 

          & a {

            box-shadow:
  0 0.1px 0.7px -4px rgba(0, 0, 0, 0.135),
  0 0.3px 1.7px -4px rgba(0, 0, 0, 0.194),
  0 0.5px 3.1px -4px rgba(0, 0, 0, 0.24),
  0 0.9px 5.6px -4px rgba(0, 0, 0, 0.286),
  0 1.7px 10.4px -4px rgba(0, 0, 0, 0.345),
  0 4px 25px -4px rgba(0, 0, 0, 0.48)
;


            color: blanchedalmond;
            text-decoration-line: none;
            border: goldenrod outset 2px;
            border-radius: 6px;
            padding: 8px;
            background-color: #ceaae446;
            font-size: 14px;

            &:hover {
              /* text-decoration-line: underline; */
              background-color: #a2cf6760;
              color: white;
            }
            &::after {
              content: " 😁";
              font-size: 12px;
            }

            &:active {
              color: goldenrod;
            }
          }
        }

        & .headingz {
          display: flex;
          flex-direction: row;
          width: 100%;
          border: olive solid 0px;

          & h1.h-title {
            font-weight: 200;
            margin-right: auto;
            margin-left: auto;
            font-size: 58px;
            border: pink solid 0px;
            text-align: center;
            color: #eba119;
            padding: 0 3vh;
            /* color: blanchedalmond; */

            text-shadow: 1px 1px 1px #c93c8359;

            @media screen and (max-width: 600px) {
              font-size: 46px;
              font-weight: 300;
            }
          }
        }

        & div.times {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;

          & div.vertical-separator {
            height: 10vh;
            width: 2px;
            background-color: blanchedalmond;
            background-image: ${headerBackgroundImage};
          }

          & .mark-line {
            width: 10%;
            /* border-top: ${groupColor} solid 1px; */
            align-self: center;
            height: 1px;



            @media screen and (max-width: 368px) {
              display: none;
            }
          }

          & .mark-line-1 {

            background-image: linear-gradient(
              90deg,
              ${themeColor} 38%,
              rgba(26, 32, 33, 0) 78%
            );
            
          }

          & .mark-line-2 {
            background-image: linear-gradient(
              90deg,
              rgba(26, 32, 33, 0) 28%,
              ${themeColor} 68%
            );
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

            margin-right: ${isUpdated ? 0 : "1em"};

            & img {
              transition-property: transform;
              transition-duration: 0.4s;
              height: 2rem;
              margin: 0;
              padding: 0;
              &:hover {
                transform: scale3d(1.2, 1.2, 1.2);
              }
            }
          }

          & time {
            color: #e4cdc3;
          }

          & h4 {
            font-size: 14px;
          }

          & h4.created {
            border: crimson solid 0px;
            margin-right: auto;
            margin-left: 1em;
            /* justify-self: flex-start; */
            width: min-content;
            font-weight: 400;

            @media screen and (min-width: 560px) {
              width: max-content;
            }

            & time {
              display: block;
              white-space: nowrap;
              text-decoration-line: underline;

              @media screen and (min-width: 560px) {
                display: inline;
              }
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

            @media screen and (min-width: 560px) {
              width: max-content;
            }

            & time {
              display: block;
              white-space: nowrap;
              text-decoration-line: underline;

              @media screen and (min-width: 560px) {
                display: inline;
              }
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
        <div className="vertical-separator" />
        <h4 className="created">
          <span className="pubspan">Published</span>:&nbsp;&nbsp;
          <time> {createdAt}</time>
        </h4>
        {isUpdated ? <div className="mark-line mark-line-1" /> : null}
        {!icon || !path ? null : (
          <Link to={path}>
            <img src={`data:image/svg+xml;base64,${icon}`} alt="group-icon" />
          </Link>
        )}
        {isUpdated ? <div className="mark-line mark-line-2" /> : null}
        {isUpdated ? (
          <h4 className="updated">
            <span className="upspan">updated</span>:&nbsp;&nbsp;
            <time> {updated}</time>
          </h4>
        ) : null}
        <div className="vertical-separator" />
      </div>
      <div className="author">
        author: &nbsp;&nbsp;<Link to={encodeURI(authorPath)}>{authorName}</Link>
      </div>
      <div
        css={css`
          width: 80%;
          height: 2px;
          background-image: ${headerBackgroundImage};
          box-shadow: 0 3.2px 3.1px -4px rgba(0, 0, 0, 0.067),
            0 7.8px 6.7px -4px rgba(0, 0, 0, 0.117),
            0 14.7px 11.3px -4px rgba(0, 0, 0, 0.155),
            0 26.1px 18px -4px rgba(0, 0, 0, 0.243),
            0 48.9px 31.4px -4px rgba(0, 0, 0, 0.383),
            0 117px 80px -4px rgba(0, 0, 0, 0.54);
        `}
      />
    </section>
  );
};

export default HeadingMajor;
