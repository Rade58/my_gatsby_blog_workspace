/** @jsx jsx */
import { jsx } from "theme-ui";

import {
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
  Fragment,
  useRef,
} from "react";
// import { Link } from "gatsby";
import { css, keyframes } from "@emotion/core";

import HeadingSingle from "./heading-j-single";

import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

import { additionalStyles } from "../common-styles";

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
  const entries = Object.entries<{ value: string; depth: number }>(val);

  return entries;
};

const JumpUL: FunctionComponent<JumpULPropsI> = (props) => {
  const { headerBackgroundImage } = additionalStyles;

  const { blogPostContext } = $_useBlogPostReducerState;

  const { reducedBlogPostState, headingsLength } = useContext(blogPostContext);
  const { setShowComercial, setPigOpacityClassFunc } = reducedBlogPostState;

  //
  const [spinnerIsVisible, setSpinnerIsVisible] = useState<boolean>(true);

  // console.log(spinnerIsVisible);

  const spinnerContainerRef = useRef<HTMLDivElement>(null);

  if (typeof window !== "undefined") {
    if (spinnerIsVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }

  //

  const {
    normalizedHeadings,
    intersectedDivId,
    setIntersectedDivId,
    relativeLink,
  } = props;

  type hType = typeof normalizedHeadings;

  const headingzArray = makeHeadingzArray(normalizedHeadings);

  const moveSpinner = keyframes`
  from {
    transform: rotateZ(0deg);
  }


  to {
    transform: rotateZ(359deg);
  }
`;

  // console.log(spinnerContainerRef.current);

  return (
    <Fragment>
      <div
        className="modal-spinner-stuff"
        ref={spinnerContainerRef}
        onTransitionEnd={() => {
          setTimeout(() => {
            if (spinnerContainerRef && spinnerContainerRef.current) {
              spinnerContainerRef.current.style.display = "none";
            }
          }, 100);
        }}
        style={{
          transform: !spinnerIsVisible ? "translateY(-120%)" : "translateY(0%)",
        }}
        css={css`
          /* border: pink solid 4px; */
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #db81a679;
          background-image: ${headerBackgroundImage};
          z-index: 600;

          transition-property: transform;
          transition-duration: 0.8s;

          & div.sp-cont {
            width: 58px;
            height: 58px;
            border-radius: 10px;
            position: absolute;
            top: calc(50% - 34px);
            left: calc(50% - 34px);
            /* border: pink solid 1px; */
            animation: ${moveSpinner} 0.8s infinite linear;
            transform-origin: center;

            & > div.spinner {
              position: absolute;
              width: 20px;
              height: 20px;
              background-color: crimson;
              border-radius: 10px;
              left: 18px;
              top: 2px;

              &::before {
                content: "";
                display: block;
                position: absolute;
                width: 20px;
                height: 20px;
                background-color: crimson;
                border-radius: 10px;
                left: 18px;
                top: 28px;
              }

              &::after {
                content: "";
                display: block;
                position: absolute;
                width: 20px;
                height: 20px;
                background-color: crimson;
                border-radius: 10px;
                left: -18px;
                top: 28px;
              }
            }
          }
        `}
      >
        <div className="sp-cont">
          <div className="spinner" />
        </div>
      </div>
      <ul
        css={css`
          --scrollbarBackgroundColor: #d48ea5;
          --thumbBackgroundColor: #423b3d;

          &::-webkit-scrollbar {
            width: 6px;
          }

          border: crimson solid 0px;

          scrollbar-width: thin;
          scrollbar-color: var(--thumbBackgroundColor)
            var(--scrollbarBackgroundColor);
        `}
      >
        {headingzArray.map((heading, index) => {
          const [headingName, { value, depth }] = heading;

          if (index === 0 || index === headingsLength - 1) {
            return (
              <HeadingSingle
                headingsLength={headingsLength}
                setSpinnerIsVisible={setSpinnerIsVisible}
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
          }

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
    </Fragment>
  );
};

export default JumpUL;
