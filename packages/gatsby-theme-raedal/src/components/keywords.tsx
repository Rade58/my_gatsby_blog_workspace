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

const Keywords: FunctionComponent = () => {
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
          margin: 1rem auto;
          border-bottom: 1px solid ${themeColor};
        }

        & div.separator {
          width: 28%;
          border-top: 2px solid ${themeColor};
          /* transform: translateY(50%); */
          align-self: center;
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

            @media screen and (max-width: 1402px) {
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
          }

          & span.some_emo {
            margin-left: 4px;
            margin-right: auto;
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
        <div className="separator" />
        <Link to={path}>
          <img src={`data:image/svg+xml;base64,${icon}`} alt="group-icon" />
        </Link>
        <div className="separator" />
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
