/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { useState, useContext, useEffect, FunctionComponent } from "react";
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
  const { keywordModalIsShown } = reducedBlogPostState; // OVO MOZDA I NECE TREBATI, JER SAM GA ISKORISTIO ON MOUNTING

  const [transitionClass, setTransitionClass] = useState<
    "make-transition-front" | "make-transition-back"
  >("make-transition-back");

  useEffect(() => {
    // === !== === !==      MOUNTING

    console.log("TABLE OF KEYWORDS");
    Promise.resolve().then(() => {
      setTransitionClass("make-transition-front");
    });
  });

  useEffect(() => {
    // === !== ===          CLAENING OUT
  }, []);

  return (
    <div
      className={`keywords-of-modal ${transitionClass}`}
      // style={{ display: keywordModalIsShown ? "block" : "none" }}
      css={css`
        /* transform: translateY(98%); */
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        /* width: 100%; */

        transition-property: transform;
        transition-duration: 2.8s;

        background-color: olive;
        z-index: 2000;

        &.make-transition-front {
          transform: translateY(0%);
        }

        &.make-transition-back {
          transform: translateY(98%);
        }
      `}
      tabIndex={-1}
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
