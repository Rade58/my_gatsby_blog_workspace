import {
  createContext,
  // types ==>
  Reducer,
  Dispatch,
  Context,
} from "react";

export enum BLOG_POST_ACTION_TYPES_ENUM {
  PIG_AND_TRACK_DISAPEARD = "PIG_AND_TRACK_DISAPEARD",
}

export interface BlogPostStateI {
  pigDisapear: boolean;
}


//
// ***************************************************
// ************       REDUCER STVARI        ******
// ***************************************************

export const blogPostReducer: Reducer<
  BlogPostStateI,
  { type: BLOG_POST_ACTION_TYPES_ENUM; payload?: any }
> = (state, action) => {

  if (action.type === BLOG_POST_ACTION_TYPES_ENUM.PIG_AND_TRACK_DISAPEARD) {
    const prevPigDisapearance = state.pigDisapear;

    return { ...state, pigDisapear: !prevPigDisapearance };
  }

  return state;
};

/**
 * @description (1) OVAJ OBJEKAT, PORED DISPATCH FUNKCIJE JE JEDAN OD DEFAULT-OVA ZADAT PRI POZIVANJU    createContext-A (TO JE OVDE VEC URADJENO ;  (2)  A KORISTI SE KAO I DEFAULT STATE ZA REDUCER-A
 */
export const defaultState: BlogPostStateI = {
  pigDisapear: false,
};



// CONTEXT stuff  === !==  === !==  === !==  === !==  === !==

export type BlogPostContDispatch = Dispatch<{
  type: BLOG_POST_ACTION_TYPES_ENUM;
  payload?: any;
}>;

export interface ContextBlogPostStateI {
  blogPostDispatch: BlogPostContDispatch;

  reducedBlogPostState: BlogPostStateI;
}

// OVO JE SAMO DEFAULT STATE I REDUCER-A NEMA JOS
const blogPostContext: Context<ContextBlogPostStateI> = createContext({
  // DAKLE OVE DVE VREDNOSTI SU SAM ODEFAULT-OVI

  reducedBlogPostState: defaultState,
  // eslint-disable-next-line
  blogPostDispatch: ({ type, payload }) => { }  // MISLIM DA JE BITNO STO SI OBEZBEDIO OVAKAV DEFAULT (SADA KADA BUDES KORISTIO OVAJ CONTEXT U DRUGIM FAJLOVIMA, IAMCES TACNE TYPE-OVE)
});

// GOTO VO CES UVEK KORISTITI     useContext    HOOK
// ALI IZVOZIM I    Consumer    KOMPONENTU
export const { Provider, Consumer } = blogPostContext;



// (2)
/**
 * @description Ne zaboravi da ti treba useContext HOOK (U FUNCTION COMPONENTS-IMA, JE TO NAJBOLJI NACIN ZA KORISCENJE ONOGA STO TI OBEZBEDJUJE CONTEXT) (CONTEXT JE VEC KRERAN U FAJLU IZ KOJEG SI OVO UVEZAO); A I SAM ZANS DA CE TI TREBATI ACTION, ZATO SU ONI OVDE
 */
export const $_useBlogPostReducerState = { blogPostContext, BLOG_POST_ACTION_TYPES_ENUM };



// (1)
/**
 * @description SVE STO TI TREBA ZA KREIRANJE STATE STORE-A I NJEGOCO SLANJE KROZ CONTEXT (OVDE CE TI TREBATI   useReducer  HOOK ) (CONTEXT JE VEC KRIRAN U FAJLU IZ KOJEG SI OVO UVEZAO)
 */
export const $_createBlogPostReducerState = {
  BlogPostStateProvider: Provider,
  blogPostReducer,
  defaultBlogPostState: defaultState
};
