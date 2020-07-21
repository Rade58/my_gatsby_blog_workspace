/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { useEffect, FunctionComponent, SetStateAction, Dispatch } from "react";

interface HeadingSinglePropsI {
  intersectedDivId: string;
  index: number;
  value: string;
  depth: number;
  headingName: string;
  headingsLength?: number;
  relativeLink: string;
  setShowComercial: (
    value: SetStateAction<"comercialVis" | "comercialHid">
  ) => void;
  setPigOpacityClassFunc: (
    value: SetStateAction<"is-opaque" | "not-opaque">
  ) => void;
  setIntersectedDivId: (value: SetStateAction<string>) => void;
  setSpinnerIsVisible?: Dispatch<React.SetStateAction<boolean>>;
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
    setSpinnerIsVisible,
    headingsLength,
  } = props;

  useEffect(() => {
    let canceled = false;

    if (canceled) return;

    if (setSpinnerIsVisible && headingsLength) {
      if (index === 0) {
        setSpinnerIsVisible(true);
      }
      if (index === headingsLength - 1) {
        setSpinnerIsVisible(false);
      }
    }

    return () => {
      canceled = true;
    };
  }, []);

  // console.log(index);

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
