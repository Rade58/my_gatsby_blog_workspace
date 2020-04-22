/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  useLayoutEffect,
  useContext,
  useState,
  useRef,
  FunctionComponent,
} from "react";
import { css } from "@emotion/core";

import Pig from "./pig";

//
// import { blogContext, ACTION_TYPES_ENUM } from "./layout";
//

//
import { $_useReducerState } from "../context_n_reducers/context_n_reducer_header";

interface ScrollIndicatorProps {
  bc: string;
  fill: string;
  currentWindowScrollY: number;
  bcImg: string;
  pigDirection?: "to-left" | "to-right";
}

const ScrollIndicator: FunctionComponent<ScrollIndicatorProps> = ({
  bc = "tomato",
  fill = "olive",
  currentWindowScrollY = 0,
  bcImg = `linear-gradient(
    to right,
    rgb(63, 44, 56),
    rgb(38, 45, 59)
  )`,
}) => {
  const { ACTION_TYPES_ENUM } = $_useReducerState;

  const { reducedHeaderState, headerDispatch } = useContext(
    $_useReducerState.headerContext
  );

  const resizingDivRef = useRef<HTMLDivElement>(null);

  const bodyHeightRef = useRef(0);
  const windowHeightRef = useRef(0);

  const [setupStage, setSetupStage] = useState(true);

  const [windowElementInnerWidth, setWindowElementInnerWidth] = useState(0);

  const timerId = useRef<any>(null);

  const [animationStop, setAnimationStop] = useState(false);

  useLayoutEffect(() => {
    console.log("Use effect");

    const bodyEl = document.body || document.getElementsByTagName("body")[0];
    const windowEl = window || document.documentElement;

    bodyHeightRef.current = bodyEl.scrollHeight;
    windowHeightRef.current = windowEl.innerHeight;

    if (setupStage) {
      windowEl.onresize = () => {
        setWindowElementInnerWidth(windowEl.innerWidth);
      };

      // OBSERVER

      const mutationCallback: MutationCallback = (mutationList, observer) => {
        mutationList.forEach((mutation) => {
          if (mutation.type === "attributes") {
            // console.log("start animation, start animation");

            setAnimationStop(false);

            timerId.current = setTimeout(() => {
              // console.log("stop that");

              setAnimationStop(true);
            }, 250);
          }
        });
      };

      const resizingElementObserver = new MutationObserver(mutationCallback);

      if (resizingDivRef.current) {
        resizingElementObserver.observe(resizingDivRef.current, {
          attributes: true,
        });
      }
    }

    setSetupStage(false);
  }, [windowElementInnerWidth, setupStage]);

  const indicatorWidthPercent =
    (100 / (bodyHeightRef.current - windowHeightRef.current)) *
    currentWindowScrollY;

  return (
    <div
      css={css`
        background-image: ${bcImg};

        background-color: ${bc};

        width: 100%;
        height: 4px;
        position: absolute;
        bottom: -4px;
        left: 0;
        margin: 0;
        padding: 0;

        & > div.resizer {
          background-color: ${fill};

          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}
    >
      {/* eslint-disable-next-line */}
      <div
        role="img"
        onClick={() => {
          headerDispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
        }}
        onKeyDown={() => {
          headerDispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
        }}
        css={css`
          display: ${reducedHeaderState.pigDisapear ? "none" : "block"};

          width: 100%;
          height: 38px;
          border: pink solid 0px;
          background-image: linear-gradient(
            to right,
            rgb(63, 44, 56),
            rgb(38, 45, 59)
          );
          /* rgb(27, 34, 39) */
          padding: 0;
          margin: 0;
        `}
      />
      <Pig animationStop={animationStop} leftPercents={indicatorWidthPercent} />
      <div
        ref={resizingDivRef}
        title={`${indicatorWidthPercent}`}
        className="resizer"
        style={{ width: `${indicatorWidthPercent}%` }}
      />
    </div>
  );
};

export default ScrollIndicator;
