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

  const { cardBackgroundColor, headerBackgroundImage } = additionalStyles;

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

            box-shadow:
              0 0px 1.3px rgba(0, 0, 0, 0.07),
              0 0px 2.4px rgba(0, 0, 0, 0.057),
              0 0px 3.3px rgba(0, 0, 0, 0.041),
              0 0px 4px rgba(0, 0, 0, 0.021)
            ;
            



        border-radius: 2px;

        display: flex;
        flex-direction: column;

        margin-bottom: 12px;
        position: relative;

        & {
          
          
          section.pubup{

            border: tomato solid 0px;

            /* width: 100%; */

            display: flex;
            flex-wrap: wrap;

            margin-top: 18px;
            margin-right: 2rem;
            margin-left: 2rem;

            font-size: 0.9rem;





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
          
          & a {
            text-decoration-line: none;
            border: 0px solid blanchedalmond;
            width: fit-content;
            color: white;
            margin-left: 12px;
            margin-right: 18px;


            &:active {
              & h4{
                color: goldenrod;
              }
            }



            & p {
              margin-left: 20%;
            }
            
            & div.card-separ {
              height: 2px;
              width: 80%;
              /* background-color: blanchedalmond; */
              /* background-image: ${headerBackgroundImage}; */
              background-image: linear-gradient(to right, #fa709941 0%, #fee1402f 100%);
              margin-right: auto;
              margin-left: auto;
            }


            h4 {
              font-size: 28px;
              border: 0px solid pink;
              transition-property: transform;
              transition-duration: 0.78s;
              width: fit-content;
              margin-left: 3rem;
              margin-right: 0.2rem;
              /* z-index: 200; */

              margin-bottom: 0.4em;
              margin-top: 0.6em;

              font-weight: 200;

              text-decoration-color: ${themeColor};

              &:hover {
                text-decoration-line: underline;
              }


              @media screen and (max-width: 918px) {
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

            /* opacity: 0.48; */
            /* border-bottom-color: transparent; */
            /* border-top-color: ${themeColor}; */

            /* div.styled-cont {

              height: 3.8rem;
              width: 3.8rem;
              border-radius: 0% 100% 0% 100% / 0% 0% 100% 100%  ;

            } */

            h4 {
              /* transform: translateX(-28px); */
            }

            & + hr {
              /* width: 100% */
            }

          }


        }
      `}
      >
        <Link to={path}>
          <h4>{title}</h4>
          <div className="card-separ" />
          <p>{description}</p>
          <div className="card-separ" />
        </Link>
        <div className="styled-cont" />
        <section className="pubup">
          <div className="published">
            <span>Published: &nbsp;&nbsp;</span>
            <time>{createdAt}</time>
          </div>
          {isUpdated ? (
            <div className="updated">
              <span> updated:</span> &nbsp;&nbsp;<time>{updated}</time>
            </div>
          ) : null}
        </section>
      </div>
      <hr
        css={css`
          width: 69%;
          margin: 12px auto;
          transition-property: all;
          transition-duration: 0.6s;
        `}
      />
    </Fragment>
  );
};

export default BlogPostCard;
