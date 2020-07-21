import React, {
  FunctionComponent,
  SetStateAction,
  useEffect,
  useContext,
} from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";

import HeadingSingle from "./heading-j-single";

import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

interface JumpULPropsI {
  normalizedHeadings: NormalizedHeadingsI;
  intersectedDivId: string;
  setIntersectedDivId: (value: SetStateAction<string>) => void;
  relativeLink: string;
}

export interface NormalizedHeadingsI {
  [key: string]: { value: string; depth: number };
}

const makeHeadingzArray = function (
  val: NormalizedHeadingsI
): [string, { value: string; depth: number }][] {
  let b;

  const entries = Object.entries<{ value: string; depth: number }>(val);

  return entries;
};
const JumpUL: FunctionComponent<JumpULPropsI> = (props) => {
  const { blogPostContext } = $_useBlogPostReducerState;

  const { reducedBlogPostState } = useContext(blogPostContext);
  const { setShowComercial, setPigOpacityClassFunc } = reducedBlogPostState;

  const {
    normalizedHeadings,
    intersectedDivId,
    setIntersectedDivId,
    relativeLink,
  } = props;

  type hType = typeof normalizedHeadings;

  const headingzArray = makeHeadingzArray(normalizedHeadings);

  return (
    <ul
      css={css`
        --scrollbarBackgroundColor: #d48ea5;
        --thumbBackgroundColor: #423b3d;

        &::-webkit-scrollbar {
          width: 6px;
        }

        border: crimson solid 2px;

        scrollbar-width: thin;
        scrollbar-color: var(--thumbBackgroundColor)
          var(--scrollbarBackgroundColor);
      `}
    >
      {headingzArray.map((heading, index) => {
        const [headingName, { value, depth }] = heading;

        return (
          <HeadingSingle
            key={`${value}-${depth}`}
            depth={depth}
            headingName={headingName}
            index={index}
            intersectedDivId={intersectedDivId}
            relativeLink={relativeLink}
            setIntersectedDivId={setIntersectedDivId}
            setPigOpacityClassFunc={setPigOpacityClassFunc}
            setShowComercial={setShowComercial}
            value={value}
          />
        );
      })}
    </ul>
  );
};

export default JumpUL;
