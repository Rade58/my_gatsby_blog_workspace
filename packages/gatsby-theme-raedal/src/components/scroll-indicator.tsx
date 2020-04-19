/** @jsx jsx */
import { jsx } from "theme-ui";
import { useLayoutEffect, useState, useRef, FunctionComponent } from "react";
import { css } from "@emotion/core";

interface ScrollIndicatorProps {
  bc: string;
  fill: string;
  currentWindowScrollY: number;
  bcImg: string;
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
  // console.log(currentWindowScrollY);

  const divRef = useRef<HTMLDivElement>(null);

  const divRefWidth = useRef(0);
  const bodyHeightRef = useRef(0);
  const windowHeightRef = useRef(0);

  const factorRef = useRef(0);

  const [setupStage, setSetupStage] = useState(true);

  useLayoutEffect(() => {
    const bodyEl = document.body || document.getElementsByTagName("body")[0];
    const windowEl = window || document.documentElement;

    if (setupStage) {
      if (divRef.current) {
        divRefWidth.current = divRef.current.offsetWidth;
        bodyHeightRef.current = bodyEl.scrollHeight;

        factorRef.current = bodyHeightRef.current / 100;
        windowHeightRef.current = windowEl.innerHeight;

        /* console.log({
          factor: factorRef.current,
          bodyHeight: bodyHeightRef.current,
          windowScrollY: currentWindowScrollY,
          divWidth: divRefWidth.current,
        }); */
      }
    }

    setSetupStage(false);
  }, []);

  const indicatorWidthPercent =
    (100 / (bodyHeightRef.current - windowHeightRef.current)) *
    currentWindowScrollY;

  return (
    <div
      ref={divRef}
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

        & div {
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
      <div />
    </div>
  );
};

export default ScrollIndicator;
