/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import Octicon, { getIconByName } from "@primer/octicons-react";
import { useContext, FunctionComponent } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

const RightHArrow: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { prevAndNextPagePath, groupPage } = useContext(blogPostContext);
  const { nextPagePath } = prevAndNextPagePath;
  const { groupColor } = groupPage;

  const octicon = getIconByName("arrow-right");

  return (
    <section
      className="right-h-arr"
      css={css`
        /* color: blanchedalmond; */

        & a {
          margin-top: 10%;

          display: flex;
          align-content: center;
          justify-content: space-between;

          text-decoration-line: none;

          border: tomato solid 1px;

          & span.arr-words {
            display: inline-block;
            font-size: 0.8rem;
            width: min-content;
            align-self: center;
            margin-right: 0.4rem;

            color: blanchedalmond;
            font-weight: 500;
          }

          & span[role="img"] {
            color: ${groupColor};
            align-self: center;
          }
        }
      `}
    >
      {!nextPagePath ? (
        "no"
      ) : (
        <Link to={nextPagePath}>
          <span className="arr-words">Next Tut</span>
          <span role="img" aria-label="next tutorial">
            {/* ➡️ */}
            <Octicon icon={octicon} size="medium" />
          </span>
        </Link>
      )}
    </section>
  );
};

export default RightHArrow;
