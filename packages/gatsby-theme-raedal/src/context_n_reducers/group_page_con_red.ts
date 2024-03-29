import { createContext, Reducer, Dispatch, Context } from "react";

// TREBACE DA TYPE-UJE, DRUGI OGRNAK KONTEKSTOVOG STATE-A
import { GroupPageI, LocationI } from "../templates/group-page-template";

// ODNOSNO ONOG DELA KOJI NIJE OBEZBEDJEN OD STRANE REDUCER-A

export enum GROUP_PAGE_ACTIONS {
  TOGGLE_KEYWORDS_MODAL = "TOGGLE_KEYWORDS_MODAL",
}

export interface GroupPageReducedStateI {
  keywordsModalIsOpen: boolean;
}

export interface GroupPageReducerActionI {
  type: GROUP_PAGE_ACTIONS;
  payload?: any;
}

// ***************************************************
// ************       REDUCER STVARI        ******
// ***************************************************

export const groupPageReducer: Reducer<
  GroupPageReducedStateI,
  GroupPageReducerActionI
> = (state, action) => {
  // ZA SADA NEMA NISTA

  if (action.type === GROUP_PAGE_ACTIONS.TOGGLE_KEYWORDS_MODAL) {
    return { ...state, keywordsModalIsOpen: action.payload };
  }

  return state;
};

// ***************************************************
// ***************************************************

/**
 * @description (1) OVAJ OBJEKAT, PORED DISPATCH FUNKCIJE JE JEDAN OD DEFAULT-OVA ZADAT PRI POZIVANJU    createContext-A (TO JE OVDE VEC URADJENO ;  (2)  A KORISTI SE KAO I DEFAULT STATE ZA REDUCER-A
 DAKLE PRI KORISCENJU useReducer HOOK, TI CES PROSLEDITI I OVAJ DEFAULT STATE*/
export const defaultReducerState: GroupPageReducedStateI = {
  keywordsModalIsOpen: false,
};

// DISPATCHER TYPE

export type GroupPageRedDispatcher = Dispatch<GroupPageReducerActionI>;

// TYPE ZA CELOKUPNI STATE, KOJI CE HRANITI PROVIDER-A

export interface GroupPageContextStateI {
  groupPage: GroupPageI;
  location?: LocationI;
  reducedState: GroupPageReducedStateI;
  groupPageDispatch: GroupPageRedDispatcher;
}

// ***************************************************
// CONTEXT stuff  === !==  === !==  === !==  === !==  === !==
// ***************************************************

export const groupPageContext: Context<GroupPageContextStateI> = createContext({
  groupPageDispatch: ({ type, payload }) => {
    let blah;
  },
  reducedState: defaultReducerState,
  groupPage: {
    allBlogKeywords: [
      {
        keyword: "",
        path: "",
        keywordColor: "",
        keywordTextColor: "",
        keywordBorderColor: "",
      },
    ],
    blogPostPages: [
      {
        title: "",
        path: "",
        updated: "",
        frontMatter: {
          description: "",
          themeColor: "",
        },
        // DODAJEM JOS DVA
        createdAt: "",
        isUpdated: Boolean(false),
        //
      },
    ],
    path: "",
    groupColor: "blanchedalmond",
    name: "",
    // OVO SAM DODAO, JER JE TYPESCRIPT YELLOVAO NA MENE
    keywordBorderColor: "",
    keywordTextColor: "",
    underlineColor: "",

    //

    // updated: "",
    // DODAJEM DVA DODATNA DEFAULT-A
    lang: "en",
    description: "",
    //
    // DODAO I icon
    icon: "",
  },
});

// UZUMAM PROVIDER-A, CONSUMER MI NE TREBA, JER NE KORISTIM
// CLASS COMPONENTS
const { Provider: GroupPageStateProvider } = groupPageContext;

//  === !==  === !==  === !==  === !==  === !==
// NAKON OVOGA OSTAJE DA GRUPISEM EXPORE, PO PRAKSI KAKVU SAM
// KORISTIO I ZA RANIJE CONTEXTE

// (2)
/**
 * @description Ne zaboravi da ti treba useContext HOOK (U FUNCTION COMPONENTS-IMA, JE TO NAJBOLJI NACIN ZA KORISCENJE ONOGA STO TI OBEZBEDJUJE CONTEXT) (CONTEXT JE VEC KRERAN U FAJLU IZ KOJEG SI OVO UVEZAO); A I SAM ZNANS DA CE TI TREBATI ACTION, ZATO SU I ONI OVDE
 */
export const $_useGroupPageState = {
  GROUP_PAGE_ACTIONS,
  groupPageContext,
};

// (1)
/**
 * @description SVE STO TI TREBA ZA KREIRANJE STATE STORE-A I NJEGOCO SLANJE KROZ CONTEXT (OVDE CE TI TREBATI   useReducer  HOOK ) (CONTEXT JE VEC KRIRAN U FAJLU IZ KOJEG SI OVO UVEZAO)
 */
export const $_createGroupPageReducerState = {
  groupPageReducer,
  GroupPageStateProvider,
  defaultReducerState,
};
