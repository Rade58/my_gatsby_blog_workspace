/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  forwardRef,
  useContext,
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  Ref,
  MutableRefObject,
  useState,
  useRef,
  Fragment,
} from "react";
import { css, keyframes } from "@emotion/core";
import pigUri from "../ICONS/AJ_using/piggy_sprite.png";

/* import { blogContext, BlogDispatch, ACTION_TYPES_ENUM } from "./layout"; */

// DOLE SAM FORWARDOVAO REF (CISTO NAPOMINJEM PA VIDI KAKO TO IZGLEDA)

import {
  $_useReducerState,
  ACTION_TYPES_ENUM,
} from "../context_n_reducers/context_n_reducer_header";

// import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

const Pig = forwardRef<HTMLDivElement, {}>(function PigComponent(props, ref) {
  const { reducedHeaderState, headerDispatch } = useContext(
    $_useReducerState.headerContext
  );

  const { pigDisapear, scrolled_class, bodyHeight } = reducedHeaderState;

  const [animationStop, setAnimationStop] = useState(true);

  // ============================================================
  // ============================================================
  //   DIV REF NOT NEEDED

  // const resizingDivRef = useRef<HTMLDivElement>(null);

  const [currentScrollPercent, setCurrentScrollPercent] = useState(0);

  // ============================================================
  // UKLONI PIG ANIMATION I SCROLL INDICATOR, AKO NEMA STA ILI NEMA MNOGO TOGA DA SE SCROLL-UJE

  const [useScrollAnimation, setUseScrollAnimation] = useState(true);

  // ============================================================

  const windowRef = useRef<Window>();
  const bodyRef = useRef<HTMLElement>();
  // ------------------------------------------------------
  const [scrollIndicatorWidth, setScrollIndicatorWidth] = useState(0);
  // MOZDA I NE TREBA
  /* const [rotateClass, setRotateClass] = useState<"turn-left" | "turn-right">(
    "turn-right"
  ); */
  // OVO TREBA

  // const currentBodyScrollHeightRef = useRef<number>();

  // ------------------------------------------------------
  const bodyHeightRef = useRef<number>();

  // ------------------------------------------------------

  // ------------------------------------------------------

  useLayoutEffect(() => {
    if (windowRef.current && bodyRef.current) {
      // console.log( / windowRef.current.innerHeight);
      // console.log(windowRef.current.scrol, windowRef.current.innerHeight);
      if (bodyRef.current.scrollHeight / windowRef.current.innerHeight < 2) {
        setUseScrollAnimation(false);
      } else {
        setUseScrollAnimation(true);
      }
    }
  }, [windowRef, bodyRef]);

  const timerId1 = useRef<NodeJS.Timeout>();
  const timerId2 = useRef<NodeJS.Timeout>();

  const [initialScrollMove, setInitialScrollMove] = useState<"go" | "no-go">(
    "no-go"
  );

  useLayoutEffect(() => {
    if (!windowRef.current) {
      windowRef.current = window;
    }
    if (!bodyRef.current) {
      bodyRef.current =
        document.body || document.getElementsByTagName("body")[0];
      // currentBodyScrollHeightRef.current = bodyRef.current.scrollHeight;

      // bodyRef.current.scrollBy({ top: 200 });
    }

    if (windowRef.current && bodyRef.current) {
      /* if (resizingDivRef.current) {
        resizingDivRef.current.style.width = `${0}%`;
      } */

      windowRef.current.onresize = (e) => {
        if (bodyRef.current) {
          bodyHeightRef.current = bodyRef.current.scrollHeight;
        }
      };

      bodyRef.current.onscroll = (e) => {
        // eslint-disable-next-line

        const resizer = document.getElementsByClassName("resizer")[0];

        const scrollIndicatorPercent =
          (100 * window.scrollY) /
          (document.body.scrollHeight - window.innerHeight);

        if (resizer && resizer instanceof HTMLElement) {
          resizer.style.width = `${scrollIndicatorPercent}%`;

          if (initialScrollMove === "go") {
            timerId1.current = setTimeout(() => {
              setAnimationStop(false);
            }, 1400);

            timerId2.current = setTimeout(() => {
              setScrollIndicatorWidth(scrollIndicatorPercent);
            }, 1200);
          }
          if (initialScrollMove !== "go") setInitialScrollMove("go");
        }
        if (
          bodyRef.current &&
          bodyRef.current.clientWidth &&
          windowRef.current &&
          windowRef.current.scrollY
        ) {
          if (bodyHeightRef.current !== bodyRef.current.scrollHeight) {
            bodyHeightRef.current = bodyRef.current.scrollHeight;
          }
        }
        if (windowRef.current && bodyRef.current && bodyRef.current.onscroll) {
          headerDispatch({
            type: ACTION_TYPES_ENUM.CHANGE_CURRENT_SCROLL,
            payload: windowRef.current.scrollY,
          });
        }
      };
    }
  }, [windowRef, bodyRef, bodyHeightRef, initialScrollMove]);

  // CLEANING ON UNMOUNTING
  useEffect(
    () => () => {
      console.log("PIG IS UNMOUNTING!!!!!!!!!!!!!!!!!!!!!!!!!!");

      timerId1.current ? clearTimeout(timerId1.current) : null;
      timerId2.current ? clearTimeout(timerId2.current) : null;

      if (bodyRef.current && bodyRef.current.onscroll) {
        bodyRef.current.onscroll = null;
      }
    },
    [] // NE ZABORAVI OVO
  );

  // === === === !== !== !== === === ===_______________________________________

  // === === === !== !== !== === === ===_______________________________________

  /*   useLayoutEffect(() => {
    // console.log(resizingDivRef.current);

    const mutationCallback: MutationCallback = (mutationList, observer) => {
      mutationList.forEach((mutation) => {
        if (mutation.type === "attributes") {
          // console.log("start animation, start animation");

          console.log(mutation.type);

          setTimeout(() => {
            // console.log("stop that");

            setAnimationStop(true);
          }, 450);

          // console.log("stop that");

          setAnimationStop(false);
        }
      });
    };

    if (!resizingElementObserver.current) {
      resizingElementObserver.current = new MutationObserver(mutationCallback);
    }

    if (resizingDivRef.current && resizingElementObserver.current) {
      resizingElementObserver.current.observe(resizingDivRef.current, {
        attributes: true,
      });
    }
  }, [resizingDivRef.current]); */

  /*  useEffect(
    () => () => {
      if (resizingElementObserver.current)
        resizingElementObserver.current.disconnect();
      console.log("disconnected", resizingElementObserver);
    },
    []
  ); */
  // === !== !== ===

  const animationStatus: "running" | "paused" = animationStop
    ? "paused"
    : "running";

  const stripski = keyframes`
  
  from, 0% {
    background-position-x: 0%;
  }

  to, 100% {
    background-position-x: 100%;
  }
  
  `;

  const angle: 180 | 0 = scrolled_class === "pull-down" ? 180 : 0;

  /* if (scrolled_class === "pull-down") {
    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.HEADER_PULL_CHANGE,
      payload: "pulled-down",
    });
  } else {
    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.HEADER_PULL_CHANGE,
      payload: "pulled-up",
    });
  } */

  // console.log(pigDisapear);

  return (
    <Fragment>
      <div
        /* style={{
          display: useScrollAnimation ? "block" : "none",
        }} */
        className={`konti ${useScrollAnimation ? "show" : "no-show"}`}
        css={css`
        /* transform: scale(4) translateY(200);
        position: absolute;
        z-index: 8; */

        /* & :hover > div {
          animation-play-state: running;
        } */
        /* display: ${pigDisapear ? "none" : "block"}; */
        background-color: tomato;
        width: 100%;
        /* width: 80%; */
        /* border: red solid 1px; */


        & .no-show {
          display: none;
        }

        & .show {
          display: block;
        }

        @media screen and (max-width: 918px) {
          .no-show {
            display: none;
          }

          .show {
            display: none;
          }

        }

      `}
        // style={{ display: pigDisapear ? "none" : "block" }}
      >
        {/* eslint-disable-next-line */}
        <div
          style={{
            // left: `${leftPercents}%`
            // transform: `translateX(${leftPercents}%)`,
            marginLeft: `${scrollIndicatorWidth}%`,
            transitionProperty: "margin-left",
            transitionDuration: "4s",
          }}
          onTransitionEndCapture={() => {
            setAnimationStop(true);
          }}
          role="img"
          className="someDiv"
          css={css`
            transition-timing-function: ease-out;

            @media screen and (min-width: 1100px) {
              margin-top: -1px;

              width: 53px;
            }

            /* -------------------------------------------------------------*/

            margin-top: 5.8px;

            width: 42px;
            /* width: 53px; */
            /* ''''''''''''' */
            /* height: 28px; */
            /* -------------------------------------------------------------*/

            display: inline-block;
            border: tomato solid 0px;
            position: absolute;

            & > div.sprite {
              border: currentColor solid 0px;
              /* width: calc(100%/19); */

              @media screen and (min-width: 1100px) {
                padding: 18.9px;
                background-size: 26rem;
              }

              /* -------------------------------------------------------------*/
              /* padding: 18.8px; */
              padding: 14.8px;
              /* -------------------------------------------------------------*/

              box-sizing: border-box;

              background-color: transparent;
              background-image: url(${pigUri});
              background-repeat: no-repeat;

              /* ------------------------------------------------ */
              /* background-size: 26rem; */
              background-size: 328px;

              height: 18px;
              /* ------------------------ */
              /* ------------------------------------------------- */
              animation-duration: 0.24s;
              animation-iteration-count: infinite;

              animation-timing-function: steps(7, end);
              animation-play-state: paused;
            }
          `}
        >
          {/* eslint-disable-next-line */}
          <div
            className={`sprite ${pigDisapear ? "no-show" : "show"}`}
            onKeyDown={(e) => {
              if (headerDispatch)
                headerDispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
            }}
            onClick={(e) => {
              if (headerDispatch)
                headerDispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
            }}
            sx={{
              animationName: `${stripski}`,
              // animationPlayState: "paused",
            }}
            css={css`
              & .no-show {
                display: none;
              }

              & .show {
                display: block;
              }

              @media screen and (max-width: 918px) {
                .no-show {
                  display: none;
                }

                .show {
                  display: none;
                }
              }
            `}
            style={{
              transform: `rotateY(${angle}deg) translateY(-36px)`,
              animationPlayState: `${animationStatus}`,
              // display: pigDisapear ? "none" : "block",
            }}
          />
        </div>
      </div>
      <div
        css={css`
          width: 0;
        `}
        // data-indicatorPercents={`${indicatorWidthPercent}`}
        className="resizer"
        style={{
          display: useScrollAnimation ? "block" : "none",
          // width: `${currentScrollPercent}%`,
          // display: `${pigDisapear ? "none" : "block"}`,
          // border: "red solid 8px",
        }}
      />
    </Fragment>
  );
});

export default Pig;
