/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css, keyframes } from "@emotion/core";
import pigUri from "../ICONS/AJ_using/piggy_sprite.png";

console.log(pigUri);

interface PigProps {
  animationStop: boolean;
  pigDirectionKlasa: "pig-right" | "pig-left" | undefined;
}

const Pig: FunctionComponent<PigProps> = () => {
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
        transform: scale(4) translateY(200);
        position: absolute;
        z-index: 8;

        & :hover > div {
          animation-play-state: running;
        }
      `}
    >
      <div
        className="someDiv"
        css={css`
          width: 56px;
          display: inline-block;
          border: tomato solid 1px;

          &:hover > div.sprite {
            animation-play-state: running;
          }

          & > div.sprite {
            border: currentColor solid 1px;
            /* width: calc(100%/19); */

            padding: 18.8px;
            box-sizing: border-box;

            background-color: transparent;
            background-image: url(${pigUri});
            background-repeat: no-repeat;

            background-size: 26rem;
            /* background */

            animation-name: ${stripski};
            animation-duration: 0.38s;
            animation-iteration-count: infinite;

            animation-timing-function: steps(7, end);

            animation-play-state: paused;
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
