// https://github.com/Rade58/1_pure_react_project/blob/17_testing/src/useDropdown.js

// KORISTIM DAKLE PRINICIM, KOJI JE PRIMENJEN U GORNJEM LINKU
// ZATO CU SADA DEFINISATI CUSTOM HOOK

import { useContext } from "react";

import { $_useReducerState } from "../../context_n_reducers/context_n_reducer_header";

const useHeaderState = () => {
  const { reducedHeaderState, headerDispatch } = useContext(
    $_useReducerState.headerContext
  );

  return [reducedHeaderState, headerDispatch];
};

export default useHeaderState;
