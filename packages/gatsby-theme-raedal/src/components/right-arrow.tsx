/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import { useContext, FunctionComponent } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

// ZAPAMTI DA MORAS HA HANDLE-UJES SITUACIJU
// KADA JE NEKA OD VREDNOSTI null

const RightArrow: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { prevAndNextPagePath } = useContext(blogPostContext);
  const { nextPagePath } = prevAndNextPagePath;

  return (
    <div
      className="arr-nav right-arrow"
      id="right-arr"
      css={css`
        & a {
          display: flex;

          align-items: center;
          align-content: center;

          & span.next {
            /* border: yellow solid 1px; */
            margin-right: 8px;
          }
        }
      `}
    >
      {!nextPagePath ? (
        <button type="button" disabled>
          <span
            role="img"
            aria-label="next tutorial"
            aria-labelledby="right-arr"
          >
            x{"        "}➡️
          </span>
        </button>
      ) : (
        // <Link to={nextPagePath}>Next Tutorial &rarr;</Link>
        <Link to={nextPagePath}>
          <span className="next">Next Tutorial</span>
          <span
            role="img"
            aria-label="next tutorial"
            aria-labelledby="right-arr"
          >
            ➡️
          </span>
        </Link>
      )}
    </div>
  );
};

export default RightArrow;
