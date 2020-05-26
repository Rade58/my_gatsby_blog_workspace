/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  useLayoutEffect,
  useContext,
  useState,
  useRef,
  FunctionComponent,
} from "react";
import { css } from "@emotion/core";

import Pig from "./pig";

import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

import {
  $_useReducerState,
  ACTION_TYPES_ENUM,
} from "../context_n_reducers/context_n_reducer_header";
import LeftArrow from "./left-arrow";
import RightArrow from "./right-arrow";

//
// import { blogContext, ACTION_TYPES_ENUM } from "./layout";
//

//
/* import { $_useReducerState } from "../context_n_reducers/context_n_reducer_header"; */

interface ScrollIndicatorProps {
  bc: string;
  fill: string;
  bcImg: string;
  pigDirection?: "to-left" | "to-right";
}

const ScrollIndicator: FunctionComponent<ScrollIndicatorProps> = ({
  bc = "tomato",
  fill = "olive",
  bcImg = `linear-gradient(
    to right,
    rgb(63, 44, 56),
    rgb(38, 45, 59)
  )`,
}) => {
  // const { ACTION_TYPES_ENUM } = $_useReducerState;

  /* const { reducedHeaderState, headerDispatch } = useContext(
    $_useReducerState.headerContext
  ); */

  const {
    BLOG_POST_ACTION_TYPES_ENUM,
    blogPostContext,
  } = $_useBlogPostReducerState;

  const { blogPostDispatch, reducedBlogPostState } = useContext(
    blogPostContext
  );

  // const { pigDisapear } = reducedBlogPostState;

  // const resizingDivRef = useRef<HTMLDivElement>(null);

  const { reducedHeaderState, headerDispatch } = useContext(
    $_useReducerState.headerContext
  );

  const { pigDisapear, scrolled_class, bodyHeight } = reducedHeaderState;

  const windowRef = useRef<Window>();
  const bodyRef = useRef<HTMLElement>();

  const [useScrollAnimation, setUseScrollAnimation] = useState(true);

  useLayoutEffect(() => {
    if (!windowRef.current) {
      windowRef.current = window || document.documentElement;
    }
    if (!bodyRef.current) {
      bodyRef.current = document.body;
    }

    if (windowRef.current && bodyRef.current) {
      // console.log( / windowRef.current.innerHeight);
      // console.log(windowRef.current.scrol, windowRef.current.innerHeight);
      if (bodyRef.current.scrollHeight / windowRef.current.innerHeight < 2) {
        setUseScrollAnimation(false);
      } else {
        setUseScrollAnimation(true);
      }
    }
  }, [windowRef, bodyRef]);

  return (
    <div
      style={{
        display: useScrollAnimation ? "block" : "none",
      }}
      css={css`
        background-image: ${bcImg};

        background-color: ${bc};

        width: 100%;
        height: 4px;
        position: absolute;
        bottom: -4px;
        left: 0;
        margin: 0;
        padding: 0;

        & > div.resizer {
          background-color: ${fill};

          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}
    >
      {/* eslint-disable-next-line */}
      <div
        role="img"
        onClick={() => {
          headerDispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });

          blogPostDispatch({
            type: BLOG_POST_ACTION_TYPES_ENUM.PIG_AND_TRACK_DISAPEARD,
          });
        }}
        onKeyDown={() => {
          headerDispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });

          blogPostDispatch({
            type: BLOG_POST_ACTION_TYPES_ENUM.PIG_AND_TRACK_DISAPEARD,
          });
        }}
        css={css`
          @media screen and (min-width: 918px) {
            height: 38px;
          }
          width: 100%;
          /* -------------------------------------------------------  */
          /* height: 38px; */
          height: 30px;
          /* -------------------------------------------------------  */
          border: pink solid 0px;
          background-image: linear-gradient(
            to right,
            rgb(63, 44, 56),
            rgb(38, 45, 59)
          );
          /* rgb(27, 34, 39) */
          padding: 0;
          margin: 0;
        `}
        style={{
          display: `${pigDisapear ? "none" : "block"}`,
        }}
      />
      {/* <LeftArrow /> */}
      <Pig />
      {/* <RightArrow /> */}
    </div>
  );
};

export default ScrollIndicator;
