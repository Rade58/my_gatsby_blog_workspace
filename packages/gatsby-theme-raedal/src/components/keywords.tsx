/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import { useContext, FunctionComponent, Fragment } from "react";

// NAIME JA SAM CEO OVAJ FAJL PREKOPIRAO (packages/gatsby-theme-raedal/src/components/group-page-components/keywords.tsx)
// A SADA SAMO TREBAM SREDITI JEDAN PATH, I KORISTITI BLOG POST CONTEXT, UMESTO GROUP PAGE CONTEXT-A

// EVO OVA KOMPONENTA JE SE KORISTI U FORMIRANJU GROUP PAGE STRANICE, A MOGU JE KORISTITI I OVDE
import Keyword from "./group-page-components/gp-keyword";

// E A SADA KORISTIM DRUGI CONTEXT
// import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";
import LeftArrow from "./left-arrow";
import RightArrow from "./right-arrow";

import { additionalStyles } from "../common-styles";

const Keywords: FunctionComponent = () => {
  const { headerBackgroundImage, bodyBackgroundColor } = additionalStyles;

  const { blogPostContext } = $_useBlogPostReducerState;

  // SAMO MI TREBAJU allBlogKeywords      ALI ZELI MDA PRIKAZEM I IKONU
  const { allBlogKeywords, groupPage, seo } = useContext(blogPostContext);
  const { icon, name, path, groupColor } = groupPage;
  const { themeColor } = seo;
  // SVE OSTALO JE ISTO

  return (
    <section
      className="keywords"
      css={css`

          /*       box-shadow:
                  0 3.1px 7.7px -28px rgba(0, 0, 0, 0.091),
                  0 5.8px 19.5px -28px rgba(0, 0, 0, 0.132),
                  0 8.1px 36.4px -28px rgba(0, 0, 0, 0.163),
                  0 10px 59.4px -28px rgba(0, 0, 0, 0.19),
                  0 11.6px 89.3px -28px rgba(0, 0, 0, 0.217),
                  0 13.2px 124.4px -28px rgba(0, 0, 0, 0.248),
                  0 15.4px 157.5px -28px rgba(0, 0, 0, 0.289),
                  0 19px 179px -28px rgba(0, 0, 0, 0.38)
                ; */


                /* box-shadow:
            0 0.1px 5.3px rgba(0, 0, 0, 0.51),
            0 0.5px 17.9px rgba(0, 0, 0, 0.355),
            0 2px 80px rgba(0, 0, 0, 0.302)
          ; */

          & > a:nth-of-type(1) {
            margin-left: 18px;
          }



          box-shadow:
            0 0.1px 6.9px -7px rgba(0, 0, 0, 0.087),
            0 0.1px 11.5px -7px rgba(0, 0, 0, 0.187),
            0 0.3px 15.2px -7px rgba(0, 0, 0, 0.357),
            0 0.4px 19.1px -7px rgba(0, 0, 0, 0.43),
            0 0.8px 25.2px -7px rgba(0, 0, 0, 0.477),
            0 2px 40px -7px rgba(0, 0, 0, 0.52)
          ;






      border-radius: 8px;


        display: flex;
        border: pink solid 0px;
        padding: 6px;
        flex-wrap: wrap;
        align-content: flex-start;
        height: min-content;

        @media screen and (max-width: 918px) {
          display: none;
        }

        /* & > a {
          margin: 4px;
        } */

        & div.bigger-separator {
          width: 80%;
          margin: 1.2rem auto;
          /* border-bottom: 1px solid ${themeColor}; */
          height: 2px;
          background-color: ${themeColor};
          background-image: ${headerBackgroundImage};
        }

        & div.separator {
          width: 28%;
          /* border-top: 2px solid ${themeColor}; */
          /* transform: translateY(50%); */
          align-self: center;
          height: 2px;
          background-color: ${themeColor};

          &.separator-1 {
            background-image:  linear-gradient(90deg, ${themeColor} 26%, ${bodyBackgroundColor} 76%);
          }
          
          &.separator-2 {
            background-image:  linear-gradient(90deg, ${bodyBackgroundColor} 26%, ${themeColor} 76%);
          }


        }

        & div.icon-image {
          margin-top: 8px;
          display: flex;
          justify-content: center;
          border: tomato solid 0px;
          width: 100%;

          & img {
            margin: auto;
            height: 1.4em;
            transition-property: transform border;
            transition-duration: 0.2s;
            border-radius: 2px;
            &:hover {
              transform: scale3d(1.2, 1.2, 1.2);
              border: ${themeColor} solid 0.2px;
              border-radius: 8px;
            }
          }
        }

        & div.arrows {
          width: 100%;

          display: none;

          @media screen and (min-width: 918px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            justify-items: space-between;
            justify-content: space-between;
            align-content: stretch;
          }
          @media screen and (min-width: 1100px) {
            display: flex;
            flex-direction: row;
            justify-content: center;
            justify-items: space-between;
            justify-content: space-around;
            align-content: stretch;
          }

          @media screen and (max-width: 1342px) {
            justify-content: space-around;
            border: pink solid 0px;
          }

          & div.left-arrow,
          & div.right-arrow {
            font-size: 14px;

            display: flex;
            align-items: center;

            @media screen and (max-width: 1458px) {
              width: min-content;
              border: crimson solid 0px;
            }
            @media screen and (max-width: 1100px) {
              width: max-content;
              /* font-size: 8px; */
              border: yellow solid 0px;
            }

            /* width: min-content; */

            /* @media screen and (max-width: 1342px) {
              width: min-content;
            } */

            & a {
              color: #e0c8ce;

              /* &:hover {
                color: #d3a6c2;
                text-decoration-line: underline;
              } */
            }
          }

          & div.left-arrow {
            /* mozda i ne trebas koristiti width sa flex item-ima */
            /* width: fit-content; */
            /*  */
            /* margin-right: auto; */
            /* border: tomato solid 0px; */
            /* flex-basis: content; */
            flex-grow: 0;
            /* MORACU DA VIDIM KAK OVO DA DEFINISEM NA PRAVI NACIN */

            @media screen and (max-width: 1100px) {
              align-self: flex-start;
              margin-bottom: 4px;
            }
          }

          & div.right-arrow {
            /* mozda i ne trebas koristiti width sa flex item-ima */
            /* width: fit-content; */
            /*  */
            /* margin-left: auto; */
            /* border: olive solid 0px; */
            /* flex-basis: content; */
            flex-grow: 0;

            @media screen and (max-width: 1100px) {
              align-self: flex-end;
              margin-top: 4px;
            }
          }
        }

        
        
      `}
    >
      <div
        className="home-btn"
        css={css`
          border: crimson solid 0px;
          width: 100%;
          display: flex;
          justify-content: space-around;
          flex-wrap: nowrap;

          & a {
            color: white;
            border: olive solid 0px;
            margin-right: 0px;
            text-decoration-line: none;
            font-weight: 400;
            font-size: 1rem;

            &:hover {
              text-decoration-line: underline;
              text-decoration-color: ${themeColor};
              text-decoration-style: solid;
            }
          }

          & span[role="img"] {
            margin-right: 2px;
            margin-left: auto;
            user-select: none;
            color: blanchedalmond;
          }

          & span.some_emo {
            margin-left: 4px;
            margin-right: auto;
            color: blanchedalmond;
          }
        `}
      >
        <span role="img" aria-label="go back to home page">
          🏡
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/">Home</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="some_emo" role="img" aria-label="random emoji">
          🐗
        </span>
      </div>
      <div className="bigger-separator" />
      {allBlogKeywords.map((member) => {
        if (member.keyword !== name) {
          return (
            <Keyword {...member} key={`${member.keyword}-${member.path}`} />
          );
        }
        return null;
      })}
      {/* <div className="separator">
        <hr />
      </div> */}
      <div className="icon-image">
        <div className="separator separator-1" />
        <Link to={path}>
          <img src={`data:image/svg+xml;base64,${icon}`} alt="group-icon" />
        </Link>
        <div className="separator separator-2" />
      </div>
      <div className="arrows">
        <LeftArrow />
        <RightArrow />
      </div>
      <div className="bigger-separator" />
    </section>
  );
};

export default Keywords;
