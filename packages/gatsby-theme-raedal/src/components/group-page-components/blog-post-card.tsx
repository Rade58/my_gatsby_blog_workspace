/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { Link } from "gatsby";

import { Fragment, FunctionComponent } from "react";

// typescript PropS TYPE
import { BlogPostPageI } from "../../templates/group-page-template";
//
import { additionalStyles } from "../../common-styles";

interface BlogPostCardPropsI extends BlogPostPageI {
  keywordTextColor: string;
  keywordBorderColor: string;
}

const BlogPostCard: FunctionComponent<BlogPostCardPropsI> = (props) => {
  const {
    path,
    title,
    frontMatter,
    updated,
    // PORED updated UZIMAM I     createdAt     I       isUpdated
    createdAt,
    isUpdated,
    //
    keywordTextColor,
    keywordBorderColor,
  } = props;

  const { description, themeColor } = frontMatter;

  const { bodyBackgroundColor, cardBackgroundColor } = additionalStyles;

  return (
    <Fragment>
      <div
        sx={{
          // borderBottom: `${themeColor} solid 4px`,
          borderTop: "transparent solid 0px",
          borderLeft: `transparent solid 4px`,
          backgroundColor: `${cardBackgroundColor}`,
        }}
        css={css`
        display: flex;
        flex-direction: column;

        margin-bottom: 12px;
        position: relative;

        & {
          
          
          section.pubup{

            border: tomato solid 1px;

            /* width: 100%; */

            display: flex;
            flex-wrap: wrap;

            margin-right: 2rem;
            margin-left: 2rem;


            & .published, .updated {
              /* margin-left: auto; */
              white-space: nowrap;
              border: yellow solid 0px;
              width: max-content;
              margin-bottom: 4px;
            }

            & .published {
              align-self: flex-start;
              margin-right: auto;

              & span {
              /* text-decoration-line: underline; */

              }
              & time {
                
                text-decoration-line: underline;
                color: #e4cdc3;
              }

            }

            & .updated {
              align-self: flex-end;
              /* text-decoration-line: underline; */
              
              & span {
                
              }
              
              & time {
                
                text-decoration-line: underline;
                color: #e4cdc3;
              }

            }



          }
          a {
            text-decoration-line: none;
            border: 0px solid blanchedalmond;
            width: fit-content;
            color: white;
            margin-left: 12px;
            margin-right: 18px;

            h4 {
              font-size: 28px;
              border: 1px solid pink;
              transition-property: transform;
              transition-duration: 0.78s;
              width: fit-content;
              /* z-index: 200; */

              &:hover {
                text-decoration-line: underline;
              }

            }


          }

          div.styled-cont {
            /* background-color: ${themeColor}; */
            height: 1.8rem;
            width: 1.8rem;
            position: absolute;
            right: 0;

            background-color: #ffffff;

            background-image: linear-gradient(
              225deg,
              ${themeColor} 49%,
              ${cardBackgroundColor} 50%
              );
              /* #eed4d400 50% */

            border-radius: 100% 0% 100% 0% / 0% 100% 0% 100% ;

            transition-property: width height border-radius transform border-top-color border-bottom-color;
            transition-duration: 0.6s;

          }

          &:hover {

          /* border-left: ${themeColor} solid 4px; */

            border-left-color: ${themeColor};

            opacity: 0.48;
            /* border-bottom-color: transparent; */
            /* border-top-color: ${themeColor}; */

            div.styled-cont {

              height: 3.8rem;
              width: 3.8rem;
              border-radius: 0% 100% 0% 100% / 0% 0% 100% 100%  ;

            }

            h4 {
              transform: translate3d(18px, 28px, 18px);
            }

            & + hr {
              width: 100%
            }

          }


        }
      `}
      >
        <Link to={path}>
          <h4>{title}</h4>
          <p>{description}</p>
        </Link>
        <div className="styled-cont" />
        <section className="pubup">
          <div className="published">
            <span>Published: </span>
            <time>{createdAt}</time>
          </div>
          {isUpdated ? (
            <div className="updated">
              <span> updated:</span> <time>{updated}</time>
            </div>
          ) : null}
        </section>
      </div>
      <hr
        css={css`
          width: 80%;
          margin: 12px auto;
          transition-property: all;
          transition-duration: 0.6s;
        `}
      />
    </Fragment>
  );
};

export default BlogPostCard;
