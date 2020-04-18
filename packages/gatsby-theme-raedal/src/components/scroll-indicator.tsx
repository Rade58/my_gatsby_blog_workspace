/** @jsx jsx */
import { jsx } from "theme-ui";
import { useLayoutEffect, useState, useRef, FunctionComponent } from "react";
import { css } from "@emotion/core";

interface ScrollIndicatorProps {
  bc: string;
  fill: string;
  currentWindowScrollY: number;
}

const ScrollIndicator: FunctionComponent<ScrollIndicatorProps> = ({
  bc = "tomato",
  fill = "olive",
  currentWindowScrollY = 0,
}) => {
  console.log(currentWindowScrollY);

  const divRef = useRef<HTMLDivElement>(null);

  const [indicatorWidth, setIndicatorWidth] = useState(8);
  const divRefWidth = useRef(0);
  const bodyHeightRef = useRef(0);

  const [setupStage, setSetupStage] = useState(true);

  useLayoutEffect(() => {
    const windowEl = window || document.documentElement;
    const bodyEl = document.body || document.getElementsByTagName("body")[0];

    if (setupStage) {
      if (divRef.current) {
        divRefWidth.current = divRef.current.clientWidth;
        bodyHeightRef.current = bodyEl.clientHeight;

        console.log({
          bodyHeight: bodyHeightRef.current,
          windowScrollY: currentWindowScrollY,
          divWidth: divRefWidth.current,
        });

        bodyEl.addEventListener("scroll", function scrollListener() {
          // console.log(windowEl.scrollY);

          console.log("aaaaaaaaaaaaaaaaaaa");
        });
      }
    }

    setSetupStage(false);
  }, [setupStage, currentWindowScrollY]);

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

        & div {
          /* transition-property: width;
          transition-duration: 0.6s;
          transition-timing-function: linear; */

          background-color: ${fill};
          width: ${bodyHeightRef.current > currentWindowScrollY
            ? currentWindowScrollY /* eslint-disable-line indent*/
            : bodyHeightRef.current /* eslint-disable-line indent*/}px;
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
