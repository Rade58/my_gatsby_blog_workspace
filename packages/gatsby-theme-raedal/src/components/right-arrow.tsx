/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import { useContext, FunctionComponent, Fragment } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

// ZAPAMTI DA MORAS HA HANDLE-UJES SITUACIJU
// KADA JE NEKA OD VREDNOSTI null

const RightArrow: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { prevAndNextPagePath, groupPage } = useContext(blogPostContext);
  const { nextPagePath } = prevAndNextPagePath;
  const { groupColor } = groupPage;

  return (
    <div
      className="arr-nav right-arrow"
      id="right-arr"
      css={css`
        & a {
          display: flex;

          align-items: center;
          align-content: center;

          text-decoration-line: none;

          & span.next {
            /* border: yellow solid 1px; */
            margin-right: 8px;
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
          /* align-content: stretch; */
          margin: 0;
          margin-right: 0.5rem;
          border: 1px solid crimson;
          border-radius: 4px;
          width: 5rem;
          justify-content: center;
          /* width: 6rem; */
          font-size: 14px;
          user-select: none;
          /* border: olive solid 4px; */
          padding: 0;
          color: #a82964;

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
      {!nextPagePath ? (
        <div className="disabled">
          <span
            role="img"
            aria-label="next tutorial"
            aria-labelledby="right-arr"
          >
            x{"        "}➡️
          </span>
        </div>
      ) : (
        // <Link to={nextPagePath}>Next Tutorial &rarr;</Link>
        <Fragment>
          <Link to={nextPagePath}>
            <span className="next">Next Tutorial</span>
          </Link>
          <span
            className="ic"
            role="img"
            aria-label="next tutorial"
            aria-labelledby="right-arr"
          >
            ➡️
          </span>
        </Fragment>
      )}
    </div>
  );
};

export default RightArrow;
