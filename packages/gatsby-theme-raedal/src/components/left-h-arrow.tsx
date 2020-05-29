/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import Octicon, { getIconByName } from "@primer/octicons-react";
import { useContext, FunctionComponent } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

const LeftHArrow: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { prevAndNextPagePath, groupPage } = useContext(blogPostContext);
  const { prevPagePath } = prevAndNextPagePath;
  const { groupColor } = groupPage;

  const octicon = getIconByName("arrow-left");

  return (
    <section
      className="left-h-arr"
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
            margin-left: 0.4rem;

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
      {!prevPagePath ? (
        "no"
      ) : (
        <Link to={prevPagePath}>
          <span role="img" aria-label="previous tutorial">
            {/* ⬅️ */}
            <Octicon icon={octicon} size="medium" />
          </span>
          <span className="arr-words">Prev Tut</span>
        </Link>
      )}
    </section>
  );
};

export default LeftHArrow;
