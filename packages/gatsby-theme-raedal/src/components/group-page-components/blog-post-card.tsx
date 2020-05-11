/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { Link } from "gatsby";

import { Fragment, FunctionComponent } from "react";

// typescript PropS TYPE
import { BlogPostPageI as BlogPostCardPropsI } from "../../templates/group-page-template";
//
import { additionalStyles } from "../../common-styles";

const BlogPostCard: FunctionComponent<BlogPostCardPropsI> = (props) => {
  const { path, title, frontMatter, updated } = props; // EVO KORISTIM I updated

  const { description, themeColor } = frontMatter;

  const { bodyBackgroundColor } = additionalStyles;

  return (
    <Fragment>
      <div
        sx={{
          // borderBottom: `${themeColor} solid 4px`,
          borderTop: "transparent solid 4px",
          borderLeft: `${themeColor} solid 4px`,
        }}
        css={css`
        display: flex;

        margin-bottom: 12px;
        position: relative;

        & {
          
          h4 {
            font-size: 28px;
            border: 1px solid black;
            transition-property: transform;
            transition-duration: 1.2s;
          }

          time {
            align-self: flex-end;
            margin-left: auto;
            white-space: nowrap;
            border: yellow solid 0px;
            width: max-content;
            margin-bottom: 0;
          }

          a {
            text-decoration-line: none;
            border: 0px solid blanchedalmond;
            width: fit-content;
            color: white;
            margin-left:12px;
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
              ${bodyBackgroundColor} 50%
            );

            border-radius: 100% 0% 100% 0% / 0% 100% 0% 100% ;

            transition-property: width height border-radius transform border-top-color border-bottom-color;
            transition-duration: 0.6s;

          }

          &:hover {

            opacity: 0.48;
            /* border-bottom-color: transparent; */
            /* border-top-color: ${themeColor}; */

            div.styled-cont {

              height: 3.8rem;
              width: 3.8rem;
              border-radius: 0% 100% 0% 100% / 0% 0% 100% 100%  ;

            }

            h4 {
              transform: translateX(28px)
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
        <time>{updated}</time>
      </div>
      <hr
        css={css`
          width: 80%;
          margin: 12px auto;
          transition-property: all;
          transition-duration: 1.2s;
        `}
      />
    </Fragment>
  );
};

export default BlogPostCard;
