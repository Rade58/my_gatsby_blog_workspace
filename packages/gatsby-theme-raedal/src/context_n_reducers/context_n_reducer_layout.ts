import {
  createContext,
  // types ==>
  Reducer,
  Dispatch,
  Context,
} from "react";

export enum LAYOUT_ACTION_TYPES_ENUM {
  PIG_AND_TRACK_DISAPEARD = "PIG_AND_TRACK_DISAPEARD",
}

export interface LayoutStateI {
  pigDisapear: boolean;
}


//
// ***************************************************
// ************       REDUCER STVARI        ******
// ***************************************************

export const layoutReducer: Reducer<
  LayoutStateI,
  { type: LAYOUT_ACTION_TYPES_ENUM; payload?: any }
> = (state, action) => {

  if (action.type === LAYOUT_ACTION_TYPES_ENUM.PIG_AND_TRACK_DISAPEARD) {
    const prevPigDisapearance = state.pigDisapear;

    return { ...state, pigDisapear: !prevPigDisapearance };
  }

  return state;
};

/**
 * @description (1) OVAJ OBJEKAT, PORED DISPATCH FUNKCIJE JE JEDAN OD DEFAULT-OVA ZADAT PRI POZIVANJU    createContext-A (TO JE OVDE VEC URADJENO ;  (2)  A KORISTI SE KAO I DEFAULT STATE ZA REDUCER-A
 */
export const defaultState: LayoutStateI = {
  pigDisapear: false,
};



// CONTEXT stuff  === !==  === !==  === !==  === !==  === !==

export type LayoutContDispatch = Dispatch<{
  type: LAYOUT_ACTION_TYPES_ENUM;
  payload?: any;
}>;

export interface ContextLayoutStateI {
  layoutDispatch: LayoutContDispatch;

  reducedLayoutState: LayoutStateI;
}

// OVO JE SAMO DEFAULT STATE I REDUCER-A NEMA JOS
const layoutContext: Context<ContextLayoutStateI> = createContext({
  // DAKLE OVE DVE VREDNOSTI SU SAM ODEFAULT-OVI

  reducedLayoutState: defaultState,
  // eslint-disable-next-line
  layoutDispatch: ({ type, payload }) => { }  // MISLIM DA JE BITNO STO SI OBEZBEDIO OVAKAV DEFAULT (SADA KADA BUDES KORISTIO OVAJ CONTEXT U DRUGIM FAJLOVIMA, IAMCES TACNE TYPE-OVE)
});

// GOTO VO CES UVEK KORISTITI     useContext    HOOK
// ALI IZVOZIM I    Consumer    KOMPONENTU
export const { Provider, Consumer } = layoutContext;



// (2)
/**
 * @description Ne zaboravi da ti treba useContext HOOK (U FUNCTION COMPONENTS-IMA, JE TO NAJBOLJI NACIN ZA KORISCENJE ONOGA STO TI OBEZBEDJUJE CONTEXT) (CONTEXT JE VEC KRERAN U FAJLU IZ KOJEG SI OVO UVEZAO); A I SAM ZANS DA CE TI TREBATI ACTION, ZATO SU ONI OVDE
 */
export const $_useLayoutReducerState = { layoutContext, LAYOUT_ACTION_TYPES_ENUM };



// (1)
/**
 * @description SVE STO TI TREBA ZA KREIRANJE STATE STORE-A I NJEGOCO SLANJE KROZ CONTEXT (OVDE CE TI TREBATI   useReducer  HOOK ) (CONTEXT JE VEC KRIRAN U FAJLU IZ KOJEG SI OVO UVEZAO)
 */
export const $_createLayoutReducerState = {
  LayoutStateProvider: Provider,
  layoutReducer,
  defaultLayoutState: defaultState
};
