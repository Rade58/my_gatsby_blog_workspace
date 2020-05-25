/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { useContext, FunctionComponent } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

const RightArrow: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { prevAndNextPagePath } = useContext(blogPostContext);
  const { nextPagePath } = prevAndNextPagePath;

  return (
    <div className="left-arrow">
      <Link to={nextPagePath}>Next Tutorial &rarr;</Link>
    </div>
  );
};

export default RightArrow;
