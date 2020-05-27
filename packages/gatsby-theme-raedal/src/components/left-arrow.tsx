/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import { useContext, FunctionComponent, Fragment } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

// ZAPAMTI DA MORAS HA HANDLE-UJES SITUACIJU
// KADA JE NEKA OD VREDNOSTI null

const LeftArrow: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { prevAndNextPagePath, groupPage } = useContext(blogPostContext);
  const { prevPagePath } = prevAndNextPagePath;
  const { groupColor } = groupPage;

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

            &:hover {
              color: #d3a6c2;
              text-decoration-line: underline;
            }
          }
        }

        & span[role="img"].ic {
          color: ${groupColor};
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

          &:hover {
            cursor: not-allowed;
            /* text-decoration-line: overline; */
          }

          & span {
            color: #a82964;
            opacity: 0.4;
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
        <Fragment>
          <span
            className="ic"
            role="img"
            aria-label="previous tutorial"
            aria-labelledby="right-arr"
          >
            ⬅️
          </span>
          <Link to={prevPagePath}>
            <span className="prev">Previous Tutorial</span>
          </Link>
        </Fragment>
      )}
    </div>
  );
};

export default LeftArrow;
