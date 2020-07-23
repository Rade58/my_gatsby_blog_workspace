/** @jsx jsx */

import { jsx } from "theme-ui";
import {
  useContext,
  useEffect,
  useRef,
  FunctionComponent,
  memo,
  useState,
  useCallback,
} from "react";
import { css } from "@emotion/core";

import { Link } from "gatsby";
import { $_useBlogPostReducerState } from "../../context_n_reducers/context_n_reducer_blog_post";
import { additionalStyles } from "../../common-styles";

type HeadingsI = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// PRAVIM FUNKCIJU KOJA OUTPUT-UJE KOMPONENTU
// DAKE U PITANJU JE HIGHER ORDER COMPONENT PRINCIP

// OVE KOMPONENTE CE DAKEL KORISTITI MDX JER SAM NAVEO
// PLUGIN, KOJI CE EMBEDOVATI ANCHORE OKO HEDINGS-A,
// UPRAVO U CONFIG FAJLU UZ KONFIGURIRANJE MDX PLUGINA

const giveHeading: (Tag: HeadingsI) => FunctionComponent<{ id: string }> = (
  Tag
) => (props) => {
  if (!props.id) return <Tag {...props} />;

  const { headerBackgroundImage, bodyBackgroundColor } = additionalStyles;

  // console.log(props.id);

  // KORISTICU I CONTEXT

  const {
    blogPostContext,
    BLOG_POST_ACTION_TYPES_ENUM,
  } = $_useBlogPostReducerState;

  const {
    relativeLink,
    reducedBlogPostState,
    blogPostDispatch,
    groupPage,
    headings,
    headingsLength,
  } = useContext(blogPostContext);

  /* console.log("=== !== === !== === !== === !== ===");
  console.log({ headingsLength, headings, id: props.id });
  // console.log({});
  console.log("=== !== === !== === !== === !== ==="); */

  /* console.log({ propsId: props.id, headings });
  console.log(
    `${encodeURI(headings[0].value.toLowerCase())
      .replace(/%20/g, "-")
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .replace(/\)/g, "")}`.trim() === props.id
  );
 */
  const { groupColor } = groupPage;

  const {
    pigDisapear,
    setIntersectedHeadingDivFunc,
    setShowComercial,
    setHeadingIsGoingUp,
  } = reducedBlogPostState;

  // console.log({ comercialIsVisible });

  // === !== === !== === !== ===
  const [thatIsFirstHeading, setThatIsFirstHeading] = useState<boolean>(false);

  useEffect(() => {
    let canceled = false;
    if (canceled) return;

    if (
      `${encodeURI(headings[0].value.toLowerCase())
        .replace(/%20/g, "-")
        .replace(/ /g, "-")
        .replace(/'/g, "")
        .replace(/\)/g, "")}`.trim() === props.id
    ) {
      setThatIsFirstHeading(true);
    }

    return () => {
      canceled = true;
    };
  }, [setThatIsFirstHeading]);
  // === !== === !== === !== ===

  const headingDivRef = useRef<HTMLDivElement>(null);
  const interObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let canceled = false;

    if (canceled) return;

    if (headingDivRef.current && "IntersectionObserver" in window) {
      // console.log(IntersectionObserver);

      if (setIntersectedHeadingDivFunc) {
        // if (interObserver.current) {
        interObserver.current?.unobserve(headingDivRef.current);

        interObserver.current = new IntersectionObserver(
          (entries, observer) => {
            // console.log(entries[0].target.id);

            // console.log({ entries, observer });
            // console.log(observer.thresholds);
            // console.log(entries[0].rootBounds);
            /* if (thatIsFirstHeading) {
              setShowComercial("comercialVis");
            } */

            /* console.log("--------------------------");
            console.log("NOT INTERSECTING");
            console.log(entries[0]);
            console.log("--------------------------"); */

            // console.log(entries[0].intersectionRect);

            /* if (
              entries[0].intersectionRect.top === 0 ||
              entries[0].intersectionRect.top < 0
            ) {
              setHeadingIsGoingUp(true);
            } */
            if (thatIsFirstHeading) {
              setTimeout(() => {
                setShowComercial("comercialVis");
              }, 20);
            }

            if (entries[0].isIntersecting) {
              // console.log(entries[0].intersectionRect);

              /* console.log("***************************");
              console.log("INTERSECTING");
              console.log(entries[0]);
              console.log("****************************"); */

              /* blogPostDispatch({
                type: BLOG_POST_ACTION_TYPES_ENUM.INTERSECTION,
                payload: entries[0].target.id,
              }); */

              // setTimeout(() => {
              // console.log(entries[0].target.id);

              if (entries[0].boundingClientRect.top > 0) {
                // console.log("going up");
                // setHeadingIsGoingUp(true);
                setIntersectedHeadingDivFunc(entries[0].target.id);
              }
              setHeadingIsGoingUp(false);

              // }, 100);

              /* if (!(entries[0].intersectionRect.top > 0)) {
                setHeadingIsGoingUp(true);
                console.log(entries[0].intersectionRect);
              } else { */
              // console.log(entries[0].intersectionRect);
              // }

              // console.log(thatIsFirstHeading);

              /* if (thatIsFirstHeading) {
                setTimeout(() => {
                  setShowComercial("comercialVis");
                }, 200);
              } */

              /* console.log(setIntersectedHeadingDivFunc);
              console.log(entries[0]);
              */
              // console.log(entries[0].target.id);

              // console.log({ if: entries[0].intersectionRatio });
            } else {
              // -------------------------------------------
              /* eslint-disable-next-line */
              if (entries[0].boundingClientRect.y >= 0) {
                // console.log("going up");
                setHeadingIsGoingUp(true);

                // console.log(entries[0]);
              }
              // -------------------------------------------
            }

            /* if (thatIsFirstHeading) {
            setShowComercial("comercialHid");
          } */
          },
          {
            root: null,
            threshold: [0.25],
            rootMargin: "0px",
          }
        );
        interObserver.current.observe(headingDivRef.current);
        // }
      }
    }

    return () => {
      canceled = true;
    };

    // eslint-disable-next-line
  }, [
    setIntersectedHeadingDivFunc,
    interObserver.current,
    headingDivRef,
    setShowComercial,
    setHeadingIsGoingUp,
  ]);

  useEffect(
    () => () => {
      console.log("HEADING BODY UNMOUNTING");

      if (interObserver.current && headingDivRef.current) {
        interObserver.current.unobserve(headingDivRef.current);
      }
    },
    []
  );

  return (
    <div
      ref={headingDivRef}
      style={
        {
          // paddingTop: pigDisapear ? "59px" : "calc(38px + 58px)",
          // paddingTop: "12px",
        }
      }
      className={`heading-above ${pigDisapear ? "pdapear" : "papear"}`}
      id={props.id}
      css={css`
        /* &.papear {
        } */

        display: flex;
        align-items: center;

        justify-items: flex-start;
        overflow: hidden;

        & h2 {
          font-weight: 200;
          font-size: 30px;

          @media screen and (max-width: 918px) {
            font-size: 24px;
          }

          margin-left: 2rem;
          /* color: blanchedalmond; */
          color: #e9a33a;
          position: relative;

          border: pink solid 0px;
          display: flex;
          width: fit-content;
          align-items: center;

          &::after {
            z-index: 100;
            content: "";
            display: inline-block;
            position: absolute;
            background-color: ${bodyBackgroundColor};
            background-image: linear-gradient(
              94deg,
              rgba(107, 75, 89, 0.9920343137254902) 2%,
              rgba(191, 72, 102, 1) 4%,
              rgba(27, 34, 39, 0) 7%
            );
            height: 1.8px;
            margin-left: 0.2em;
            border: blanchedalmond solid 0px;
            width: 800px;
            overflow: hidden;
            position: absolute;
            left: 100%;
            flex-shrink: 1;

            transition-property: width;
            transition-duration: 0.8s;
          }

          &:hover {
            &::after {
              width: 2900px;
            }
          }
        }

        &.pdapear {
          padding-top: 12px;
          margin-top: 47px;
        }

        border: tomato solid 0px;

        /* transition-property: margin-top; */
        transition-duration: 4s;

        display: flex;

        padding-top: 59px;
        /* padding-top: 34px; */
        padding-bottom: 42px;

        @media screen and (max-width: 918px) {
          /* padding-top: calc(38px + 58px); */
        }
      `}
    >
      <Tag
        {...props}
        id={undefined}
        css={css`
          z-index: 50;

          border: blanchedalmond solid 0px;
          /* margin-left: auto; */
          /* margin-right: auto; */
          margin-top: 0;
          margin-bottom: 0;
          width: max-content;

          text-shadow: 1px 1px 1px #df4ea248;

          /* & > a {
            text-decoration-line: none;
            color: inherit;
            margin-left: 10%;

            box-sizing: border-box;

            border: pink solid 1px;
            position: relative;
          } */

          & > a::before {
            opacity: 0;
            content: "🔗";
            font-size: 1.4rem;
            position: absolute;
            top: 8px;
            left: -28px;
            color: ${groupColor};
            text-shadow: 1px 1px 1px ${groupColor};
          }

          & > a:active {
            &::before {
              color: goldenrod;
            }
          }

          @media screen and (max-width: 648px) {
            & a::before {
              content: "🔗";
              position: absolute;
              top: 3px;
              left: -28px;
              color: ${groupColor};
              opacity: 1;
              font-size: 0.7em;
            }
          }

          &:hover {
            cursor: default;

            & > a::before {
              opacity: 1;
            }
          }
        `}
      >
        <Link
          onClick={() => {
            setIntersectedHeadingDivFunc(props.id);
          }}
          to={`${encodeURI(relativeLink)}#${props.id}`}
        >
          {" "}
        </Link>
        {props.children}
      </Tag>
    </div>
  );
};

export default giveHeading;
