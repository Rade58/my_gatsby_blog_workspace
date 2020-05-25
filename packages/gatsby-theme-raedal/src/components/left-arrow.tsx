/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { useContext, FunctionComponent } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

const LeftArrow: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { prevAndNextPagePath } = useContext(blogPostContext);
  const { prevPagePath } = prevAndNextPagePath;

  return (
    <div className="left-arrow">
      <Link to={prevPagePath}>&larr; Previous Tutorial</Link>
    </div>
  );
};

export default LeftArrow;
