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
// USTVARI KORISTI
// DAKLE, TO JE  context    NAMENJEN ZA useContext HOOK
// OVAJ DRUGI IZVOZ TREBA DA IMAM I ACTIONS ENUM, ZATO CI I NJEGA TU UVRSTITI


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
  CHANGE_BODY_HEIGHT = "CHANGE_BODY_HEIGHT"
}

export interface HeaderStateI {
  scrolled_class: "pull-up" | "pull-down";
  currentScroll: number;
  pigDisapear: boolean;
  bodyHeight: number
}


//
// ***************************************************
// ************       REDUCER STVARI        ******
// ***************************************************

export const reducer: Reducer<
  HeaderStateI,
  { type: ACTION_TYPES_ENUM; payload?: any }
> = (state, action) => {

  /*  console.log("__ === __ !== __ __ === __ !==")
   console.log(state)
   console.log("__ === __ !== __ __ === __ !==") */


  if (action.type === ACTION_TYPES_ENUM.CHANGE_CURRENT_SCROLL && state) {

    const { currentScroll } = state

    const scrolled_class: "pull-up" | "pull-down" = (currentScroll > action.payload ? "pull-down" : "pull-up")

    /* console.log("COMMING FRO MTHE REDUCER")
    console.log(state.currentScroll, action.payload)
    console.log("COMMING FRO MTHE REDUCER")
 */
    return { ...state, currentScroll: action.payload, scrolled_class };

  }


  if (action.type === ACTION_TYPES_ENUM.PIG_DISAPEAR) {

    console.log("REDUCER PIG DISAPEAR")

    const prevPigDisapearance = state.pigDisapear;

    return { ...state, pigDisapear: !prevPigDisapearance };
  }

  if (action.type === ACTION_TYPES_ENUM.CHANGE_BODY_HEIGHT) {

    return { ...state, bodyHeight: action.payload }

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
  bodyHeight: 0
};



// CONTEXT stuff  === !==  === !==  === !==  === !==  === !==

export type HeaderContDispatch = Dispatch<{
  type: ACTION_TYPES_ENUM;
  payload?: any;
}>;

export interface ContextHeaderStateI {
  headerDispatch: HeaderContDispatch;

  reducedHeaderState: HeaderStateI;
}

// OVO JE SAMO DEFAULT STATE I REDUCER-A NEMA JOS
export const headerContext: Context<ContextHeaderStateI> = createContext({
  // DAKLE OVE DVE VREDNOSTI SU SAM ODEFAULT-OVI

  reducedHeaderState: defaultState,
  // eslint-disable-next-line
  headerDispatch: ({ type, payload }) => { }  // MISLIM DA JE BITNO STO SI OBEZBEDIO OVAKAV DEFAULT (SADA KADA BUDES KORISTIO OVAJ CONTEXT U DRUGIM FAJLOVIMA, IAMCES TACNE TYPE-OVE)
});

// GOTO VO CES UVEK KORISTITI     useContext    HOOK
// ALI IZVOZIM I    Consumer    KOMPONENTU
export const { Provider, Consumer } = headerContext;



// (2)
/**
 * @description Ne zaboravi da ti treba useContext HOOK (U FUNCTION COMPONENTS-IMA, JE TO NAJBOLJI NACIN ZA KORISCENJE ONOGA STO TI OBEZBEDJUJE CONTEXT) (CONTEXT JE VEC KRERAN U FAJLU IZ KOJEG SI OVO UVEZAO); A I SAM ZANS DA CE TI TREBATI ACTION, ZATO SU ONI OVDE
 */
export const $_useReducerState = { headerContext, ACTION_TYPES_ENUM };



// (`)
/**
 * @description SVE STO TI TREBA ZA KREIRANJE STATE STORE-A I NJEGOCO SLANJE KROZ CONTEXT (OVDE CE TI TREBATI   useReducer  HOOK ) (CONTEXT JE VEC KRIRAN U FAJLU IZ KOJEG SI OVO UVEZAO)
 */
export const $_createReducerState = {
  HeaderStateProvider: Provider,
  headerReducer: reducer,
  defaultState,
};
