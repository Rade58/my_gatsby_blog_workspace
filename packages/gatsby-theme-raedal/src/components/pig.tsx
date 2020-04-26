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
} from "react";
import { css, keyframes } from "@emotion/core";
import pigUri from "../ICONS/AJ_using/piggy_sprite.png";

/* import { blogContext, BlogDispatch, ACTION_TYPES_ENUM } from "./layout"; */

// DOLE SAM FORWARDOVAO REF (CISTO NAPOMINJEM PA VIDI KAKO TO IZGLEDA)

import {
  $_useReducerState,
  ACTION_TYPES_ENUM,
} from "../context_n_reducers/context_n_reducer_header";

const Pig = forwardRef<HTMLDivElement, {}>(function PigComponent(props, ref) {
  const { reducedHeaderState, headerDispatch } = useContext(
    $_useReducerState.headerContext
  );

  const { pigDisapear, scrolled_class, bodyHeight } = reducedHeaderState;

  const [animationStop, setAnimationStop] = useState(true);

  // === !== !== ===    MUTATION OBSERVER STUFF

  const resizingDivRef = ref as MutableRefObject<HTMLDivElement>;

  // const [animationStop, setAnimationStop] = useState(true);

  // ______________________________
  // OVO IZBACI
  const resizingElementObserver = useRef<MutationObserver>();

  //______________________   READING SCROLL BUT USING REFS
  // === === === !== !== !== === === ===_______________________________________
  // === === === !== !== !== === === ===_______________________________________

  // const indicatorPercentRef = useRef<number>(0);

  // -------------------------------------------
  /* const bodyHeightRef = useRef<number>(0);
  bodyHeightRef.current = bodyHeight; */
  // -------------------------------------------

  const [creatingFactor, setCreatingFactor] = useState(true);

  // _____-----______ REFS FORR BODY AND WINDOW  -------

  const windowRef = useRef<Window>();
  const bodyRef = useRef<HTMLElement>();
  // ------------------------------------------------------
  const [scrollIndicatorWidth, setScrollIndicatorWidth] = useState(0);
  // const scrollIndicatorWidthRef = useRef<number>();
  // scrollIndicatorWidthRef.current = scrollIndicatorWidth;

  console.log("---__________-----________");
  console.log(scrollIndicatorWidth);
  console.log("---__________-----________");

  // ------------------------------------------------------
  const bodyHeightRef = useRef<number>();

  // ------------------------------------------------------
  const [percentFactor, setPercentFactor] = useState(0);

  // ------------------------------------------------------

  // console.log(bodyHeight);

  useEffect(() => {
    if (!windowRef.current) {
      windowRef.current = window;
    }
    if (!bodyRef.current) {
      bodyRef.current =
        document.body || document.getElementsByTagName("body")[0];

      setPercentFactor(
        windowRef.current.scrollY /
          (bodyRef.current.scrollHeight - windowRef.current.innerHeight)
      );

      console.log(bodyHeightRef.current);
    }

    if (windowRef.current && bodyRef.current) {
      windowRef.current.onresize = (e) => {
        if (bodyRef.current) {
          bodyHeightRef.current = bodyRef.current.scrollHeight;

          if (!creatingFactor) setCreatingFactor(true);
        }
      };

      bodyRef.current.onscroll = (e) => {
        if (
          bodyRef.current &&
          bodyRef.current.clientWidth &&
          windowRef.current &&
          windowRef.current.scrollY
          // bodyHeightRef.current &&
          // percentFactor.current
        ) {
          console.log({ H: bodyHeightRef.current, P: percentFactor });

          if (bodyHeightRef.current !== bodyRef.current.scrollHeight) {
            bodyHeightRef.current = bodyRef.current.scrollHeight;
          }

          if (bodyHeightRef.current) {
            // scrollIndicatorWidthRef.current =
            setScrollIndicatorWidth(
              (100 * windowRef.current.scrollY) /
                (bodyHeightRef.current - windowRef.current.innerHeight)
            );

            if (resizingDivRef.current) {
              console.log("RESIZING DIV REF");

              resizingDivRef.current.style.width = `${
                (100 * windowRef.current.scrollY) /
                (bodyHeightRef.current - windowRef.current.innerHeight)
              }%`;
            }
          }

          // console.log(scrollIndicatorWidthRef.current);
        }
      };
    }

    /* if (creatingFactor) {
      if (windowRef.current && bodyRef.current) {
        console.log("afssdfdasfgfdgdfgdfgsdfgdfgdf");
        console.log("afssdfdasfgfdgdfgdfgsdfgdfgdf");
        console.log("afssdfdasfgfdgdfgdfgsdfgdfgdf");
        console.log("afssdfdasfgfdgdfgdfgsdfgdfgdf");

        setPercentFactor(
          windowRef.current.scrollY /
            (bodyRef.current.scrollHeight - windowRef.current.innerHeight)
        );
      }

      setCreatingFactor(false);
    } */
  }, [windowRef, bodyRef, percentFactor, bodyHeightRef]);

  // === === === !== !== !== === === ===_______________________________________
  // === === === !== !== !== === === ===_______________________________________

  /* useLayoutEffect(() => {
    console.log(resizingDivRef.current);

    const mutationCallback: MutationCallback = (mutationList, observer) => {
      mutationList.forEach((mutation) => {
        if (mutation.type === "attributes") {
          console.log("start animation, start animation");

          setAnimationStop(false);

          setTimeout(() => {
            // console.log("stop that");

            setAnimationStop(true);
          }, 250);
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
  }, [resizingDivRef.current]);

  useEffect(
    () => () => {
      if (resizingElementObserver.current)
        resizingElementObserver.current.disconnect();
      console.log("disconnected", resizingElementObserver);
    },
    []
  );
 */
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

  return (
    <div
      className="konti"
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
      `}
      style={{ display: pigDisapear ? "none" : "block" }}
    >
      {/* eslint-disable-next-line */}
      <div
        style={{
          // left: `${leftPercents}%`
          // transform: `translateX(${leftPercents}%)`,
          marginLeft: `${scrollIndicatorWidth}%`,
        }}
        role="img"
        onKeyDown={(e) => {
          if (headerDispatch)
            headerDispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
        }}
        onClick={(e) => {
          if (headerDispatch)
            headerDispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
        }}
        className="someDiv"
        css={css`
          @media screen and (min-width: 918px) {
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

            @media screen and (min-width: 918px) {
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
          className="sprite"
          sx={{
            animationName: `${stripski}`,
            // animationPlayState: "paused",
          }}
          style={{
            transform: `rotateY(${angle}deg) translateY(-36px)`,
            animationPlayState: `${animationStatus}`,
          }}
        />
      </div>
    </div>
  );
});

export default Pig;
