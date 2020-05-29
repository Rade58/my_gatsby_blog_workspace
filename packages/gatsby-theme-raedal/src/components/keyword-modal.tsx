/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { useContext, FunctionComponent } from "react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

export interface IndividualKeywordI {
  name: string;
  path: string;
  icon: string;
}

export interface KeywordModalPropsI {
  keywords: IndividualKeywordI[];
}

const KeywordModal: FunctionComponent<KeywordModalPropsI> = ({ keywords }) => {
  const {
    BLOG_POST_ACTION_TYPES_ENUM,
    blogPostContext,
  } = $_useBlogPostReducerState;

  const { reducedBlogPostState, blogPostDispatch } = useContext(
    blogPostContext
  );
  const { keywordModalIsShown } = reducedBlogPostState;

  return (
    <div
      style={{ display: keywordModalIsShown ? "block" : "none" }}
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        background-color: olive;
        z-index: 2000;
      `}
      tabIndex={-1}
      className="keywords-of-modal"
      role="button"
      onClick={() => {
        blogPostDispatch({
          type: BLOG_POST_ACTION_TYPES_ENUM.KEYWORD_MODAL_TOGGLE,
          payload: false,
        });
      }}
      onKeyPress={() => {
        blogPostDispatch({
          type: BLOG_POST_ACTION_TYPES_ENUM.KEYWORD_MODAL_TOGGLE,
          payload: false,
        });
      }}
    >
      <ul>
        {keywords.map(({ name, path, icon }) => (
          <Link to={path} key={name}>
            <span role="img" aria-label={name}>
              <img
                src={`data:image/svg+xml;base64,${icon}`}
                alt="subject icon"
              />
            </span>
            <span>{name}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default KeywordModal;
