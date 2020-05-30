/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import Octicon, { getIconByName } from "@primer/octicons-react";
import { useContext, FunctionComponent } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

const Kebab: FunctionComponent = () => {
  const {
    blogPostContext,
    BLOG_POST_ACTION_TYPES_ENUM,
  } = $_useBlogPostReducerState;
  const { blogPostDispatch } = useContext(blogPostContext);
  const kebab = getIconByName("kebab-horizontal");

  return (
    <div
      onClick={() => {
        blogPostDispatch({
          type: BLOG_POST_ACTION_TYPES_ENUM.KEYWORD_MODAL_TOGGLE,
          payload: true,
        });
      }}
      onKeyPress={() => {
        blogPostDispatch({
          type: BLOG_POST_ACTION_TYPES_ENUM.KEYWORD_MODAL_TOGGLE,
          payload: true,
        });
      }}
      role="button"
      tabIndex={0}
      className="kebab"
      aria-label="kebab"
      css={css`
        cursor: pointer;
        display: inline-block;
      `}
    >
      <Octicon icon={kebab} size="medium" />
    </div>
  );
};

export default Kebab;
