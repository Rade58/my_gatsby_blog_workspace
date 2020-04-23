import React, { useReducer, FunctionComponent } from "react";

import { $_createReducerState } from "../context_n_reducer_header";

// DAVANJE ODREDJENIH GRANA STATE-A

const ProviderHeaderState: FunctionComponent = ({ children }) => {
  const {
    HeaderStateProvider,
    headerReducer,
    defaultState,
  } = $_createReducerState;

  const [reducedHeaderState, headerDispatch] = useReducer(
    headerReducer,
    defaultState
  );

  // console.log({ reducedHeaderState, headerDispatch });
  // console.log(headerDispatch.name);

  return (
    <HeaderStateProvider value={{ reducedHeaderState, headerDispatch }}>
      {children}
    </HeaderStateProvider>
  );
};

export default ProviderHeaderState;
