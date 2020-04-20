/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css, keyframes } from "@emotion/core";
import pigUri from "../ICONS/AJ_using/piggy_sprite.png";

console.log(pigUri);

interface PigProps {
  animationStop: boolean;
  pigDirectionKlasa: "to-right" | "to-left";
  marginLeft: number;
}

const Pig: FunctionComponent<PigProps> = ({
  animationStop,
  pigDirectionKlasa,
  marginLeft,
}) => {
  const animationStatus: "running" | "paused" = animationStop
    ? "paused"
    : "running";

  const angle: 180 | 0 = pigDirectionKlasa === "to-right" ? 180 : 0;

  const stripski = keyframes`
  
  from, 0% {
    background-position-x: 0%;
  }

  to, 100% {
    background-position-x: 100%;
  }
  
  `;

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
      `}
    >
      {/* eslint-disable-next-line */}
      <div
        role="img"
        onKeyDown={(e) => {
          (e.target as HTMLDivElement).style.display = "none";
        }}
        onClick={(e) => {
          (e.target as HTMLDivElement).style.display = "none";
        }}
        className="someDiv"
        css={css`
          width: 53px;
          display: inline-block;
          border: tomato solid 0px;
          position: absolute;
          left: ${marginLeft}%;

          /* &:hover > div.sprite {
            animation-play-state: running;
          } */

          & > div.sprite {
            border: currentColor solid 0px;
            /* width: calc(100%/19); */

            transform: rotateY(${angle}deg);

            padding: 18.8px;
            box-sizing: border-box;

            background-color: transparent;
            background-image: url(${pigUri});
            background-repeat: no-repeat;

            background-size: 26rem;
            /* background */

            animation-name: ${stripski};
            animation-duration: 0.48s;
            animation-iteration-count: infinite;

            animation-timing-function: steps(7, end);

            animation-play-state: ${animationStatus};
          }
        `}
      >
        {/* eslint-disable-next-line */}
        <div className="sprite"></div>
      </div>
    </div>
  );
};

export default Pig;
