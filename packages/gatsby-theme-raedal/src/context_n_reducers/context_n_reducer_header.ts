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
// SLEDECEM PRINCIPU

// DEFINISACU DVA TAKORECI "SPECIJALNA" EXPORT-A
//( IMACE PORED SEBE    $       SIGN, AL ISTAVIO SAM IM I DESCRIPTION-E    )

//   (1)   IZVEZAO BI JEDAN OBJEKAT KOJI BI IMAO
// NA SEBI        KONTEKSTOVU,      Provider    KOMPONENTU
//              I IAMO BI   IMAO BI       reducer-A

// I OVO GORE UPRAVO KADA SE NEGDE KORISTI   KREIRA DAKLE PROVIDER-A
// U KOJI MOZE UGRADITI ONO STO BI SE DOBILO IZ     useReducer-a

//   (2)     A KAO DRUGI EXPORT IZVEZAO BI CONTEXT
// ONO STO JE POTREBNO DA SE STATE (OMOGUCEN BY THE REDUCER)
// USSTVARI KORISTI
// DAKLE, TO JE  context    NAMENJEN ZA useContext HOOK


// STO SE TICE (1) MOGAO BIH DA TO ISKORISTIM DA NAPRAVIM CUSTOM HOOK

// A STO SE TICE (2) TO BIH KORISTIO U SVAKOJ KOMPONENTI, KOJA JE
// LEVELS BELLOW, ONE KOMPONENTE, U KOJOJ JE KORISCENO (1)

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


//
// ***************************************************
// ************       REDUCER STVARI        ******
// ***************************************************

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

/**
 * @description (1) OVAJ OBJEKAT, PORED DISPATCH FUNKCIJE JE JEDAN OD DEFAULT-OVA ZADAT PRI POZIVANJU    createContext-A (TO JE OVDE VEC URADJENO ;  (2)  A KORISTI SE KAO I DEFAULT STATE ZA REDUCER-A
 */
export const defaultState: HeaderStateI = {
  scrolled_class: "pull-down",
  currentScroll: 0,
  pigDisapear: false,
};



// CONTEXT stuff  === !==  === !==  === !==  === !==  === !==

export type HeaderContDispatch = Dispatch<{
  type: ACTION_TYPES_ENUM;
  payload?: any;
}>;

export interface ContextHeaderStateI {
  headerDispatch: HeaderContDispatch | any;

  reducedHeaderState: HeaderStateI;
}

// OVO JE SAMO DEFAULT STATE I REDUCER-A NEMA JOS
const headerContext: Context<ContextHeaderStateI> = createContext({
  reducedHeaderState: defaultState,
  // eslint-disable-next-line
  headerDispatch: () => { }
});

// GOTO VO CES UVEK KORISTITI     useContext    HOOK
// ALI IZVOZIM I    Consumer    KOMPONENTU
export const { Provider, Consumer } = headerContext;



// (2)
/**
 * @description Ne zaboravi da ti treba useContext HOOK (U FUNCTION COMPONENTS-IMA, JE TONAJBOLJI NACIN ZA KORISCENJE ONOGA STO TI OBEZBEDJUJE CONTEXT) (CONTEXT JE VEC KRERAN U FAJLU IZ KOJEG SI OVO UVEZAO) (USTVARI OVAJ OBJEKAT IMA SAMO JEDAN PROPERTI (NISAM TAK OZELEO DA BUDE, JER SAM KASNIJE ODUZEO STVARI IZ OVOG OBJEKATA, ALI U REDU JE))
 */
export const $_useReducerState = { headerContext };



// (`)
/**
 * @description SVE STO TI TREBA ZA KREIRANJE STATE STORE-A I NJEGOCO SLANJE KROZ CONTEXT (OVDE CE TI TREBATI   useReducer  HOOK ) (CONTEXT JE VEC KRIRAN U FAJLU IZ KOJEG SI OVO UVEZAO)
 */
export const $_createReducerState = {
  HeaderStateProvider: Provider,
  headerReducer: reducer,
  defaultState,
};
