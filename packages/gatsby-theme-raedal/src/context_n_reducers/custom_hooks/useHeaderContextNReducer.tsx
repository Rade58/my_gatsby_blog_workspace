import React, {
  FunctionComponent,
  useReducer,
  useContext,
  ComponentClass,
} from "react";

import headerContext, {
  reducer,
  defaultState,
  Provider,
} from "../context_n_reducer_header";

const useHeaderContext: FunctionComponent = (
  Component: FunctionComponent | ComponentClass
) => {
  const [reducedHeaderState, headerDispatch] = useReducer(
    reducer,
    defaultState
  );

  const {} = useContext(headerContext);

  return <Provider value={{ reducedHeaderState }}>{children}</Provider>;
};

export default useHeaderContext;
