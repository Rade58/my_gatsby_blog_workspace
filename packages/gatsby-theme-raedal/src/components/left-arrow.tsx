/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import { useContext, FunctionComponent } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

// ZAPAMTI DA MORAS HA HANDLE-UJES SITUACIJU
// KADA JE NEKA OD VREDNOSTI null

const LeftArrow: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { prevAndNextPagePath } = useContext(blogPostContext);
  const { prevPagePath } = prevAndNextPagePath;

  return (
    <div
      className="arr-nav left-arrow"
      id="right-arr"
      css={css`
        & a {
          display: flex;

          align-items: center;
          align-content: center;

          text-decoration-line: none;

          & span.prev {
            /* border: yellow solid 1px; */
            margin-left: 8px;
          }
        }

        & div.disabled {
          display: flex;
          /* align-items: center; */
          /* align-items: center; */
          margin: 0;
          margin-left: 2rem;
          border: 1px solid crimson;
          border-radius: 4px;

          width: 4rem;
          justify-content: center;
          /* width: 6rem; */
          font-size: 14px;
          user-select: none;
          /* border: olive solid 4px; */
          padding: 0;
          color: #a82964;

          &:hover {
            cursor: not-allowed;
            text-decoration-line: overline;
          }
        }
      `}
    >
      {!prevPagePath ? (
        <div className="disabled">
          <span
            role="img"
            aria-label="previous tutorial"
            aria-labelledby="left-arr"
          >
            ⬅️{"        "}x
          </span>
        </div>
      ) : (
        // <Link to={prevPagePath}>&larr; Previous Tutorial</Link>
        <Link to={prevPagePath}>
          <span
            role="img"
            aria-label="previous tutorial"
            aria-labelledby="right-arr"
          >
            ⬅️
          </span>
          <span className="prev">Previous Tutorial</span>
        </Link>
      )}
    </div>
  );
};

export default LeftArrow;
