/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import { useEffect, FunctionComponent, SetStateAction, Dispatch } from "react";
import { BLOG_POST_ACTION_TYPES_ENUM } from "../context_n_reducers/context_n_reducer_blog_post";

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
  blogPostDispatch: Dispatch<{
    type: BLOG_POST_ACTION_TYPES_ENUM;
    payload?: any;
  }>;
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
    blogPostDispatch,
  } = props;

  useEffect(() => {
    let canceled = false;

    if (canceled) return;

    if (setSpinnerIsVisible && headingsLength) {
      if (index === 0) {
        setTimeout(() => {
          setSpinnerIsVisible(true);
        }, 10);
      }
      if (index === headingsLength - 1) {
        setTimeout(() => {
          setSpinnerIsVisible(false);
        }, 18);
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
            console.log(`#${encodeURI(value)}`, intersectedDivId);
            const val = `#${encodeURI(value)}`;
            setIntersectedDivId(val);
            setShowComercial("comercialVis");
            setPigOpacityClassFunc("is-opaque");
          }, 600);
        }}
        onSubmit={(e) => {
          const val = `#${encodeURI(value)}`;

          if (intersectedDivId === val) return e.preventDefault();
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
