import React, {
  Fragment,
  FunctionComponent,
  memo,
  useContext,
  useMemo,
} from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { $_useBlogPostReducerState } from "../../context_n_reducers/context_n_reducer_blog_post";
import Code from "../mdx-theme-ui-overrides/code";
import headingFunc from "../mdx-theme-ui-overrides/heading";

const Heading2 = headingFunc("h2");

const MdxComponent: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { body } = useContext(blogPostContext);

  const Memoized = useMemo(
    () => (
      <MDXRenderer
        components={{
          h2: Heading2,
          pre: Code,
        }}
      >
        {body}
      </MDXRenderer>
    ),
    [body]
  );

  return (
    <Fragment>
      {/* <MDXRenderer>{body}</MDXRenderer> */}
      {Memoized}
    </Fragment>
  );
};

export default memo(MdxComponent);
