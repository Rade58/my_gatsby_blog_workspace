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

        & button[disabled] {
          height: 20px;
          width: 6rem;
          font-size: 14px;
          /* border: olive solid 4px; */
          margin: 0;
          padding: 0;

          vertical-align: center;

          &:hover {
            cursor: not-allowed;
          }
        }
      `}
    >
      {!prevPagePath ? (
        <button type="button" disabled>
          <span
            role="img"
            aria-label="previous tutorial"
            aria-labelledby="left-arr"
          >
            ⬅️{"        "}x
          </span>
        </button>
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
