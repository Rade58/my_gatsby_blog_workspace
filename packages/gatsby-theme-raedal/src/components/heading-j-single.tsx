/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { FunctionComponent, SetStateAction } from "react";

interface HeadingSinglePropsI {
  intersectedDivId: string;
  index: number;
  value: string;
  depth: number;
  headingName: string;
  relativeLink: string;
  setShowComercial: (
    value: SetStateAction<"comercialVis" | "comercialHid">
  ) => void;
  setPigOpacityClassFunc: (
    value: SetStateAction<"is-opaque" | "not-opaque">
  ) => void;
  setIntersectedDivId: (value: SetStateAction<string>) => void;
}

const HeadingSingle: FunctionComponent<HeadingSinglePropsI> = (props) => {
  const {
    index,
    relativeLink,
    headingName,
    setShowComercial,
    intersectedDivId,
    setPigOpacityClassFunc,
    setIntersectedDivId,
    value,
    depth,
  } = props;

  console.log(index);

  return (
    <li
      className={`${intersectedDivId === encodeURI(value) ? "highlight" : ""}`}
    >
      <Link
        onClick={() => {
          setTimeout(() => {
            setShowComercial("comercialVis");
            setPigOpacityClassFunc("is-opaque");
          }, 600);
        }}
        onSubmit={(e) => {
          console.log(`#${encodeURI(value)}`);

          const val = `#${encodeURI(value)}`;

          if (intersectedDivId === val) return e.preventDefault();

          setIntersectedDivId(val);
        }}
        to={`${encodeURI(relativeLink)}#${
          intersectedDivId !== `#${encodeURI(value)}`
            ? encodeURI(value)
            : encodeURI(intersectedDivId.substr(1, intersectedDivId.length))
        }`}
      >
        {headingName}
      </Link>
      <div className="small-separ" />
    </li>
  );
};

export default HeadingSingle;
