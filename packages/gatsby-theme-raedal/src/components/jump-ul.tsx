import React, {
  FunctionComponent,
  SetStateAction,
  useEffect,
  useContext,
} from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";

import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

interface JumpULPropsI {
  normalizedHeadings: NormalizedHeadingsI;
  intersectedDivId: string;
  setIntersectedDivId: (value: SetStateAction<string>) => void;
  relativeLink: string;
}

interface NormalizedHeadingsI {
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
      {makeHeadingzArray(normalizedHeadings).map((heading) => {
        const [headingName, { value, depth }] = heading;

        return (
          <li
            className={`${
              intersectedDivId === encodeURI(value) ? "highlight" : ""
            }`}
            key={`${value}-${depth}`}
          >
            {/* <button
              type="button"
              onClick={() => {
                const element = document.querySelector(`#${encodeURI(value)}`);

                console.log(`#${encodeURI(value)}`);
                console.log(element);

                if (element) {
                  element.scrollIntoView();
                }
              }}
            >
              Pritisni
            </button> */}

            <Link
              onClick={() => {
                setTimeout(() => {
                  setShowComercial("comercialVis");
                  setPigOpacityClassFunc("is-opaque");
                }, 600);
              }}
              onSubmit={(e) => {
                // console.log("clicked");

                // const element = document.querySelector(`#${encodeURI(value)}`);

                console.log(`#${encodeURI(value)}`);
                // console.log(element);
                /* 
                if (element) {
                  element.scrollIntoView(); // OVO SAM SAMO STAVIO DA ISPROBAM (I DAALJE JE SCROLLING SPOR)
                } */

                const val = `#${encodeURI(value)}`;

                if (intersectedDivId === val) return e.preventDefault();

                setIntersectedDivId(val);
              }}
              to={`${encodeURI(relativeLink)}#${
                intersectedDivId !== `#${encodeURI(value)}`
                  ? encodeURI(value)
                  : encodeURI(
                      intersectedDivId.substr(1, intersectedDivId.length)
                    )
              }`}
            >
              {headingName}
            </Link>
            <div className="small-separ" />
          </li>
        );
      })}
    </ul>
  );
};

export default JumpUL;
