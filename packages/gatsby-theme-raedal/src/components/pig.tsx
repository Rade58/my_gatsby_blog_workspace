/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useContext } from "react";
import { css, keyframes } from "@emotion/core";
import pigUri from "../ICONS/AJ_using/piggy_sprite.png";

import { blogContext, BlogDispatch, ACTION_TYPES_ENUM } from "./layout";

console.log(pigUri);

interface PigProps {
  animationStop?: boolean;
  pigDirectionKlasa?: "pull-down" | "pull-up";
  leftPercents?: number;
  pigDisapear?: boolean;
  dispatch?: BlogDispatch;
}

const Pig: FunctionComponent<PigProps> = ({
  animationStop,
  pigDirectionKlasa,
  leftPercents,
  pigDisapear,
  dispatch,
}) => {
  const animationStatus: "running" | "paused" = animationStop
    ? "paused"
    : "running";

  const angle: 180 | 0 = pigDirectionKlasa === "pull-down" ? 180 : 0;

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
        display: ${pigDisapear ? "none" : "block"};
        background-color: tomato;
      `}
    >
      {/* eslint-disable-next-line */}
      <div
        role="img"
        onKeyDown={(e) => {
          if (dispatch) dispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
        }}
        onClick={(e) => {
          if (dispatch) dispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
        }}
        className="someDiv"
        css={css`
          width: 53px;
          display: inline-block;
          border: tomato solid 0px;
          position: absolute;

          left: ${leftPercents}%;

          /* &:hover > div.sprite {
            animation-play-state: running;
          } */

          & > div.sprite {
            border: currentColor solid 0px;
            /* width: calc(100%/19); */

            transform: rotateY(${angle}deg) translateY(-36px);

            padding: 18.8px;
            box-sizing: border-box;

            background-color: transparent;
            background-image: url(${pigUri});
            background-repeat: no-repeat;

            background-size: 26rem;
            /* background */

            animation-name: ${stripski};
            animation-duration: 0.22s;
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

const PigWithState: FunctionComponent<PigProps> = ({
  animationStop,
  leftPercents,
}) => {
  const { reducedState, dispatch } = useContext(blogContext);

  // console.log({ reducedState, dispatch });

  return (
    <Pig
      animationStop={animationStop}
      leftPercents={leftPercents}
      pigDirectionKlasa={reducedState.scrolled_class}
      pigDisapear={reducedState.pigDisapear}
      dispatch={dispatch}
    />
  );
};

export default PigWithState;
