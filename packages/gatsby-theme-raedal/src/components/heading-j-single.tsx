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
  setClickedId: Dispatch<SetStateAction<string>>;
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
    setClickedId,
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
        onClick={(e) => {
          // const val = `#${encodeURI(value)}`;

          const val = encodeURI(value);
          const hashVal = `#${val}`;
          const { hash } = window.location;

          if (hash === hashVal) {
            e.preventDefault(); // OVO SDPRECAVA DA SE ANIMACIJA PRKIDA KADA KLIKCEM UZASTOPNO NA ISTI LINK

            return;
          }

          // console.log(val1);
          setClickedId(val);

          // console.log(window.location);
          setTimeout(() => {
            /* console.log(`#${encodeURI(value)}`, intersectedDivId);
            console.log(setClickedId);
            console.log(val); */
            setShowComercial("comercialVis");
            setPigOpacityClassFunc("is-opaque");
          }, 600);
        }}
        // MISLIM DA JE onSubmit HANDLER BESPOTREBAN ALI NEKA GA ZA SADA
        onSubmit={(e) => {
          const val = `#${encodeURI(value)}`;
          const hashVal = `#${val}`;
          const { hash } = window.location;

          if (hash === hashVal) e.preventDefault();

          // if() e.preventDefault()
        }}
        // -----------------------------------------------------------
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
