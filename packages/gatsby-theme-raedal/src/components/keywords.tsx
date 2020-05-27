/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import { useContext, FunctionComponent } from "react";

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
        border: pink solid 1px;
        padding: 6px;
        flex-wrap: wrap;
        align-content: flex-start;
        height: min-content;

        /* & > a {
          margin: 4px;
        } */

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
            border-radius: 4px;
            &:hover {
              transform: scale(1.2);
              border: ${themeColor} solid 0.5px;
            }
          }
        }

        & div.arrows {
          width: 100%;

          display: none;

          @media screen and (min-width: 1100px) {
            display: flex;
            justify-content: center;
            justify-items: space-between;
            justify-content: space-between;
            align-content: stretch;
          }

          @media screen and (max-width: 1342px) {
            justify-content: space-around;
            border: pink solid 1px;
          }

          & div.left-arrow,
          & div.right-arrow {
            font-size: 14px;

            display: flex;
            align-items: center;

            @media screen and (max-width: 1342px) {
              width: min-content;
            }

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
            border: tomato solid 0px;
            flex-basis: content;
            flex-grow: 0;
            /* MORACU DA VIDIM KAK OVO DA DEFINISEM NA PRAVI NACIN */
          }

          & div.right-arrow {
            /* mozda i ne trebas koristiti width sa flex item-ima */
            /* width: fit-content; */
            /*  */
            /* margin-left: auto; */
            border: olive solid 0px;
            flex-basis: content;
            flex-grow: 0;
          }
        }
      `}
    >
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
    </section>
  );
};

export default Keywords;
