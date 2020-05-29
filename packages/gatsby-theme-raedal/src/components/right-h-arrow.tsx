/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import Octicon, { getIconByName } from "@primer/octicons-react";
import { useContext, FunctionComponent } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

const RightHArrow: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { prevAndNextPagePath } = useContext(blogPostContext);
  const { nextPagePath } = prevAndNextPagePath;

  const octicon = getIconByName("arrow-right");

  return (
    <section
      className="right-h-arr"
      css={css`
        /* color: blanchedalmond; */
      `}
    >
      <Link to={nextPagePath}>
        <span role="img" aria-label="next tutorial">
          {/* ➡️ */}
          <Octicon icon={octicon} size="medium" />
        </span>
      </Link>
    </section>
  );
};

export default RightHArrow;
