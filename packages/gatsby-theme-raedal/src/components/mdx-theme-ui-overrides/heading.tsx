/** @jsx jsx */

import { jsx } from "theme-ui";
import {
  useContext,
  useEffect,
  useRef,
  FunctionComponent,
  memo,
  useState,
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

  const { headerBackgroundImage } = additionalStyles;

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
  } = useContext(blogPostContext);

  const { groupColor } = groupPage;

  const { pigDisapear, setIntersectedHeadingDivFunc } = reducedBlogPostState;

  const headingDivRef = useRef<HTMLDivElement>(null);
  const interObserver = useRef<IntersectionObserver>();

  useEffect(() => {
    if (headingDivRef.current && "IntersectionObserver" in window) {
      // console.log(IntersectionObserver);

      interObserver.current = new IntersectionObserver(
        (entries, observer) => {
          // console.log(entries[0].target.id);

          // console.log({ entries, observer });
          // console.log(observer.thresholds);
          // console.log(entries[0].rootBounds);

          if (entries[0].isIntersecting) {
            /* blogPostDispatch({
                type: BLOG_POST_ACTION_TYPES_ENUM.INTERSECTION,
                payload: entries[0].target.id,
              }); */

            setTimeout(() => {
              // console.log(entries[0].target.id);
              setIntersectedHeadingDivFunc(entries[0].target.id);
            }, 100);
          }
        },
        {
          root: null,
          threshold: [0, 0.75],
          rootMargin: "0px",
        }
      );

      interObserver.current.observe(headingDivRef.current);
    }
  }, []);

  useEffect(
    () => () => {
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
          margin-left: 10%;
          color: blanchedalmond;
          position: relative;

          border: pink solid 1px;
          display: flex;
          width: max-content;
          align-items: center;

          &::after {
            content: "";
            background-color: blanchedalmond;
            background-image: linear-gradient(
              to right,
              #fa709a 0%,
              #fee140 100%
            );
            height: 2px;
            margin-left: 1em;
            border: blanchedalmond solid 0px;
            width: 600%;
            overflow: hidden;
            position: absolute;
            left: 100%;
            flex-shrink: 1;
          }
        }

        &.pdapear {
          padding-top: 12px;
        }

        border: tomato solid 1px;

        transition-property: margin-top;
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

          /* & > a {
            text-decoration-line: none;
            color: inherit;
            margin-left: 10%;

            box-sizing: border-box;

            border: pink solid 1px;
            position: relative;
          } */

          &:hover > a::before {
            content: "🔗";
            font-size: 1.4rem;
            position: absolute;
            top: 8px;
            left: -28px;
            color: ${groupColor};
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
