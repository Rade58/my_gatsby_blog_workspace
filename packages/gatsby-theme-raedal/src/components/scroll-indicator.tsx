/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  useLayoutEffect,
  useState,
  useRef,
  FunctionComponent,
  useEffect,
} from "react";
import { css } from "@emotion/core";

import Pig from "./pig";

interface ScrollIndicatorProps {
  bc: string;
  fill: string;
  currentWindowScrollY: number;
  bcImg: string;
  pigDirection: "to-left" | "to-right";
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
  pigDirection,
}) => {
  // console.log(currentWindowScrollY);

  const [previousWindowScrollY, setPreviousWindowScrollY] = useState(0);

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

    // ANIMATION SIMULATION

    // timer for stopig animation
    /* const timerId = setInterval(() => {
      console.log("stop animation");
    }, 80); */

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

  // NOVI USE EFECT, KOJ ISE TRIGGER-UJE ZA SVAKI SCROLL

  let pigDirectionKlasa: "pig-right" | "pig-left" | undefined;

  if (currentWindowScrollY > previousWindowScrollY) {
    //
    pigDirectionKlasa = "pig-right";
  } else if (currentWindowScrollY < previousWindowScrollY) {
    pigDirectionKlasa = "pig-left";
  }

  useEffect(() => {
    // console.log({ currentWindowScrollY, previousWindowScrollY });
    // setTimeout(() => {
    setPreviousWindowScrollY(currentWindowScrollY);
    // }, 100);
  }, [animationStop]);

  const indicatorWidthPercent =
    (100 / (bodyHeightRef.current - windowHeightRef.current)) *
    currentWindowScrollY;

  //    ANIM CLASSES
  // console.log(animationStop ? "stop-animation" : "start-animation");
  ////////////////

  // console.log(currentWindowScrollY, previousWindowScrollY);

  return (
    <div
      css={css`
        width: 100%;
        background-color: ${bc};
        height: 4px;
        position: absolute;
        bottom: -4px;
        left: 0;
        margin: 0;
        padding: 0;

        background-image: ${bcImg};

        & > div.resizer {
          /* transition-property: width;
          transition-duration: 0.6s;
          transition-timing-function: linear; */

          background-color: ${fill};
          width: ${indicatorWidthPercent}%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}
    >
      <Pig
        pigDirectionKlasa={pigDirection}
        animationStop={animationStop}
        marginLeft={indicatorWidthPercent}
      />
      <div
        ref={resizingDivRef}
        title={`${indicatorWidthPercent}`}
        className="resizer"
      >
        {/* {pigDirectionKlasa} &nbsp; */}
        {/* {animationStop ? "stop-animation" : "start-animation"} */}
      </div>
    </div>
  );
};

export default ScrollIndicator;
