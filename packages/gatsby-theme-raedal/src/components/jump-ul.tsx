import React, { FunctionComponent, SetStateAction } from "react";
import { Link } from "gatsby";

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
            <Link
              onClick={() => {
                // console.log("clicked");

                setIntersectedDivId(`#${encodeURI(value)}`);
              }}
              to={`${encodeURI(relativeLink)}#${encodeURI(value)}`}
            >
              {headingName}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default JumpUL;
