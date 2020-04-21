// PRE BILO STA URADIS IMAJ NA UMU DA CE STATE BITI
// KREIRANO UZ POMIC REDUCER-A

// A DA JE USTVARI CONTEXT KADA

// U OVOJ FUNKCIJI, NITI SI KREIRAO       REDUCER STATE STORE
// NITI K

// OVDE SAM SAMO PRIPREMIO STA MI JE POTREBNO
// PA CU IZ OVOG FAJLA UVOZITI, TAMO GDE MI STA BUDE BILO POTREBNO

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// STO ZNACI DA BIH STVARI TREBAO PAKOVATI I IZVOZITI PO
// SLEDECEM PRINCIPU (ODNOSNO ZANIMA ME DEFAULT EXPORT)

// USTVARI JEDAN CE BITI DEFAULT EXPORT, A DRUGI NAMED

//    DAKLE PO DEFAULT-U BIH IZVEZAO JEDAN OBJEKAT KOJI BI IMAO
// SLEDECE PROPERTIJE
//    createState

import {
  createContext,
  // types ==>
  Reducer,
  Dispatch,
  Context,
} from "react";

export enum ACTION_TYPES_ENUM {
  CHANGE_CURRENT_SCROLL = "CHANGE_CURRENT_SCROLL",
  SET_TO_SCROLL_UP_CLASS = "SET_TO_SCROLL_UP_CLASS",
  SET_TO_SCROLL_DOWN_CLASS = "SET_TO_SCROLL_DOWN_CLASS",
  PIG_DISAPEAR = "PIG_DISAPEAR",
}

export interface HeaderStateI {
  scrolled_class: "pull-up" | "pull-down";
  currentScroll: number;
  pigDisapear: boolean;
}

export const reducer: Reducer<
  HeaderStateI,
  { type: ACTION_TYPES_ENUM; payload?: any }
> = (state, action) => {
  if (action.type === ACTION_TYPES_ENUM.CHANGE_CURRENT_SCROLL) {
    return { ...state, currentScroll: action.payload };
  }

  if (action.type === ACTION_TYPES_ENUM.SET_TO_SCROLL_DOWN_CLASS) {
    return { ...state, scrolled_class: "pull-up" };
  }

  if (action.type === ACTION_TYPES_ENUM.SET_TO_SCROLL_UP_CLASS) {
    return { ...state, scrolled_class: "pull-down" };
  }

  if (action.type === ACTION_TYPES_ENUM.PIG_DISAPEAR) {
    const prevPigDisapearance = state.pigDisapear;

    return { ...state, pigDisapear: !prevPigDisapearance };
  }

  return state;
};

export const defaultState: HeaderStateI = {
  scrolled_class: "pull-down",
  currentScroll: 0,
  pigDisapear: false,
};

//
// ***************************************************
// ************       REDUCER STVARI GORE       ******
// ***************************************************

// CONTEXT  === !==  === !==  === !==  === !==  === !==

export type HeaderConDispatch = Dispatch<{
  type: ACTION_TYPES_ENUM;
  payload?: any;
}>;

export interface ContextHeaderStateI {
  headerDispatch?: HeaderConDispatch;

  reducedHeaderState: HeaderStateI;
}

// OVO JE SAMO DEFAULT STATE I REDUCER-A NEMA JOS
const headerContext: Context<ContextHeaderStateI> = createContext({
  reducedHeaderState: defaultState,
});

// GOTO VO CES UVEK KORISTITI     useContext    HOOK
// ALI IZVOZIM I    Consumer    KOMPONENTU
export const { Provider, Consumer } = headerContext;

export default headerContext;
