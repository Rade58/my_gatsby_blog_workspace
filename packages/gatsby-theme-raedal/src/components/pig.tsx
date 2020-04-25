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

interface PigProps {
  leftPercents?: number;
}

const Pig = forwardRef<HTMLDivElement, PigProps>(function PigComponent(
  { leftPercents },
  ref
) {
  const [animationStop, setAnimationStop] = useState(true);

  // === !== !== ===    MUTATION OBSERVER STUFF

  const resizingDivRef = ref as MutableRefObject<HTMLDivElement>;

  const windowEl = document.documentElement || window;

  if (windowEl instanceof Window) {
    windowEl.scrollY;
  }

  // const [animationStop, setAnimationStop] = useState(true);

  // ______________________________

  const resizingElementObserver = useRef<MutationObserver>();

  useLayoutEffect(() => {
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

  const { reducedHeaderState, headerDispatch } = useContext(
    $_useReducerState.headerContext
  );

  // const {ACTION_TYPES_ENUM} = $_useReducerState

  const { pigDisapear, scrolled_class } = reducedHeaderState;

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
          marginLeft: `${leftPercents}%`,
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
