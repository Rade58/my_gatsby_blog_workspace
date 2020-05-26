/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
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

  // SAMO MI TREBAJU allBlogKeywords
  const { allBlogKeywords } = useContext(blogPostContext);

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
          width: 100%;
        }

        & div.arrows {
          width: 100%;
          align-self: flex-end;

          display: flex;

          & div.left-arrow,
          & div.right-arrow {
            font-size: 14px;
          }

          & div.left-arrow {
            width: fit-content;
            margin-right: auto;
          }

          & div.right-arrow {
            width: fit-content;
          }
        }
      `}
    >
      {allBlogKeywords.map((member) => (
        <Keyword {...member} key={`${member.keyword}-${member.path}`} />
      ))}
      <div className="separator">
        <hr />
      </div>
      <div className="arrows">
        <LeftArrow />
        <RightArrow />
      </div>
    </section>
  );
};

export default Keywords;
