import React, {
  useReducer,
  useContext,
  useEffect,
  FunctionComponent,
} from "react";

import { $_createReducerState } from "../context_n_reducer_header";

// DAKLE OVDE SADA ZELIM DA DISPATCH-UJEM ACTIONE, KOJI CE REZULTOVATI PROMENOM
// STATE-OVA        ZA    HEADER        I ZA    LAYOUT  (MEDJUTIM PITANJE JE DA
// LI CU LAYOUT STATE IKADA KORISTITI TAK ODA NECU NISTA DISPATCHOVATI ZA NJEGA)
import { $_useBlogPostReducerState } from "../context_n_reducer_blog_post";
// ZATO CU OVDE UPOTREBITI useContext

// AL ISAM IDISPATCHING CES MORATI OBAVITI U      useEffect     HOOK-U

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

  // EVO OVDE UPOTREBLJAVAM useContext

  // MEDJUTIM DISPATCHING CES MORATI OBAVITI U      useEffect-U

  /* const {
    BLOG_POST_ACTION_TYPES_ENUM,
    blogPostContext,
  } = $_useBlogPostReducerState;

  const { blogPostDispatch } = useContext(blogPostContext);

  useEffect(() => {
    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.PIG_AND_TRACK_DISAPEARD,
    });
  }, [
    reducedHeaderState.pigDisapear,
    blogPostDispatch,
    BLOG_POST_ACTION_TYPES_ENUM,
  ]); */

  //  === !== === !== === !== === !== === !== === !== === !== === !== === !==

  return (
    <HeaderStateProvider value={{ reducedHeaderState, headerDispatch }}>
      {children}
    </HeaderStateProvider>
  );
};

export default ProviderHeaderState;
