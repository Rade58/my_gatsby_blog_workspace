/** @jsx jsx */
import { jsx } from "theme-ui";

import {
  useEffect,
  useContext,
  useRef,
  Fragment,
  FunctionComponent,
} from "react";

import { $_useReducerState } from "../../../context_n_reducers/context_n_reducer_header";

const ScrollHeightGiver: FunctionComponent = ({ children }) => {
  const { headerContext, ACTION_TYPES_ENUM } = $_useReducerState;

  const { headerDispatch } = useContext(headerContext);

  const preElement = useRef(null);

  const callback: MutationCallback = (mutationList, observer) => {
    // for(let mutation of mutationList)
  };

  // CITANJE SA window-A UZ KORISCENJE    useLayoutEffect   -A
  // __ === __ !== __ __ === __ !== __/ __ === __ !== __ __ === __ !== __
  useEffect(() => {
    const windowEl: Window = window || document.documentElement;

    const capturedScrollY = windowEl.scrollY;

    headerDispatch({
      type: ACTION_TYPES_ENUM.CHANGE_CURRENT_SCROLL,
      payload: capturedScrollY,
    });
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default ScrollHeightGiver;
