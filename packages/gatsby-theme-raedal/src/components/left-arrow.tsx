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
    <div className="left-arrow" id="right-arr">
      {!prevPagePath ? (
        <button type="button" disabled>
          x
        </button>
      ) : (
        // <Link to={prevPagePath}>&larr; Previous Tutorial</Link>
        <Link to={prevPagePath}>
          <span
            role="img"
            aria-label="previous tutorial"
            aria-labelledby="right-arr"
          >
            ⬅️{" "}
          </span>
          Previous Tutorial
        </Link>
      )}
    </div>
  );
};

export default LeftArrow;
