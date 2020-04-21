import React, { useContext, FunctionComponent } from "react";

import { $_useReducerState } from "../context_n_reducer_header";

const useHeader: (component: FunctionComponent) => FunctionComponent = (
  Komponenta
) => {
  const { headerContext } = $_useReducerState;

  const { reducedHeaderState, headerDispatch } = useContext(headerContext);

  return () => {};
};

export default useHeader;
