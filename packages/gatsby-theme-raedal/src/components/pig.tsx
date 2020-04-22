/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useContext } from "react";
import { css, keyframes } from "@emotion/core";
import pigUri from "../ICONS/AJ_using/piggy_sprite.png";

/* import { blogContext, BlogDispatch, ACTION_TYPES_ENUM } from "./layout"; */

import {
  $_useReducerState,
  HeaderContDispatch,
  ACTION_TYPES_ENUM,
} from "../context_n_reducers/context_n_reducer_header";

console.log(pigUri);

interface PigProps {
  animationStop?: boolean;
  pigDirectionKlasa?: "pull-down" | "pull-up";
  leftPercents?: number;
  pigDisapear?: boolean;
  dispatch?: HeaderContDispatch;
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
        /* display: ${pigDisapear ? "none" : "block"}; */
        background-color: tomato;
      `}
      sx={{ display: pigDisapear ? "none" : "block" }}
    >
      {/* eslint-disable-next-line */}
      <div
        style={{ left: `${leftPercents}%` }}
        role="img"
        onKeyDown={(e) => {
          if (dispatch) dispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
        }}
        onClick={(e) => {
          if (dispatch) dispatch({ type: ACTION_TYPES_ENUM.PIG_DISAPEAR });
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
            animation-duration: 0.22s;
            animation-iteration-count: infinite;

            animation-timing-function: steps(7, end);
          }
        `}
      >
        {/* eslint-disable-next-line */}
        <div
          className="sprite"
          sx={{
            animationName: `${stripski}`,
            transform: `rotateY(${angle}deg) translateY(-36px)`,
            animationPlayState: `${animationStatus}`,
          }}
        />
      </div>
    </div>
  );
};

const PigWithState: FunctionComponent<PigProps> = ({
  animationStop,
  leftPercents,
}) => {
  const { reducedHeaderState, headerDispatch } = useContext(
    $_useReducerState.headerContext
  );

  // const {ACTION_TYPES_ENUM} = $_useReducerState

  const { pigDisapear, scrolled_class } = reducedHeaderState;

  // console.log({ reducedState, dispatch });

  return (
    <Pig
      animationStop={animationStop}
      leftPercents={leftPercents}
      pigDirectionKlasa={scrolled_class}
      pigDisapear={pigDisapear}
      dispatch={headerDispatch}
    />
  );
};

export default PigWithState;
