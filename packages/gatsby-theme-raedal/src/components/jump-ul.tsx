import React, { FunctionComponent, SetStateAction, useEffect } from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";

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
  let a;

  const {
    normalizedHeadings,
    intersectedDivId,
    setIntersectedDivId,
    relativeLink,
  } = props;

  type hType = typeof normalizedHeadings;

  return (
    <ul>
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
              onClick={(e) => {
                // console.log("clicked");

                const element = document.querySelector(`#${encodeURI(value)}`);

                console.log(`#${encodeURI(value)}`);
                console.log(element);

                if (element) {
                  element.scrollIntoView(); // OVO SAM SAMO STAVIO DA ISPROBAM (I DAALJE JE SCROLLING SPOR)
                }

                setIntersectedDivId(`#${encodeURI(value)}`);
              }}
              to={`${encodeURI(relativeLink)}#${encodeURI(value)}`}
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
