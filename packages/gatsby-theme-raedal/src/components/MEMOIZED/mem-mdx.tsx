import React, {
  Fragment,
  FunctionComponent,
  memo,
  useContext,
  useMemo,
} from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { $_useBlogPostReducerState } from "../../context_n_reducers/context_n_reducer_blog_post";

const MdxComponent: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { body } = useContext(blogPostContext);

  const Memoized = useMemo(() => <MDXRenderer>{body}</MDXRenderer>, []);

  return (
    <Fragment>
      {/* <MDXRenderer>{body}</MDXRenderer> */}
      {Memoized}
    </Fragment>
  );
};

export default memo(MdxComponent);
