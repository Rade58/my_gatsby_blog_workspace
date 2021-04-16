import { createContext, Reducer, Dispatch, Context } from "react";

import { AuthorPageDataI } from "../templates/author-page-template";
import { LocationI } from "../templates/group-page-template";

export enum AUTHOR_PAGE_ACTION_TYPES_ENUM {
  PLACEHOLDER = "PLACEHOLDER", // ZATO STO MI OVO JOS NE TREBA
}

export interface AuthorPageReducedStateI {
  placeholder?: string;
}

export interface AuthorPageReducerActionI {
  type: AUTHOR_PAGE_ACTION_TYPES_ENUM;
  payload?: any;
}

export const authorPageReducer: Reducer<
  AuthorPageReducedStateI,
  AuthorPageReducerActionI
> = (state, action) => {
  let blah;
  // za sada nista nema ovde

  return state;
};

/**
 * @description (1) OVAJ OBJEKAT, PORED DISPATCH FUNKCIJE JE JEDAN OD DEFAULT-OVA ZADAT PRI POZIVANJU    createContext-A (TO JE OVDE VEC URADJENO ;  (2)  A KORISTI SE KAO I DEFAULT STATE ZA REDUCER-A
 DAKLE PRI KORISCENJU useReducer HOOK, TI CES PROSLEDITI I OVAJ DEFAULT STATE*/
export const defaultReducerState: AuthorPageReducedStateI = {};

// DISPATCHER TYPE

export type AuthorPageRedDispatcher = Dispatch<AuthorPageReducerActionI>;

// TYPE ZA CELOKUPNI STATE

export interface AuthorPageContextStateI {
  authorPage: AuthorPageDataI;
  location?: LocationI;
  reducedState: AuthorPageReducedStateI;
  authorPageDispatch: AuthorPageRedDispatcher;
}

// DA NEMORAM DA SE PONAVLJAM. PRI DEFINISANJU DEFAULT-OVA
// UPOTREBA FUNKCIJA JE OVERKILL
const defaultAuthorImage = () => ({
  image: "",
  mediaType: "",
});
const defaultSocialMedia = () => ({
  network: "",
  // url: "",  // KADA JE NEKI FIELD DTYPED KAO OPCION NE SMEM GA PROOSLEDJIVATI
  // KAO DEFAULT U CONTEXT
  // POGLEDAJ                     PECULIAR STUFF.md
  // ZA PROBLEM KOJI SAM IMAO
  icon: defaultAuthorImage(),
});
//
// ***************************************************
// CONTEXT  === !==  === !==  === !==  === !==  === !==
// ***************************************************

/**
 * @todo CAOUTION: MISLIM DA CONTEXT NE PRIHVATA ONO STO JE TYPED SA OR   ( |  ) I SVE SAM TO TAKVO MORAO DA UKLONIM IZ TYPE-OVA
 */
export const authorPageContext: Context<AuthorPageContextStateI> = createContext(
  {
    reducedState: defaultReducerState,
    authorPageDispatch: ({ type, payload }) => {
      let blah;
    },
    authorPage: {
      about: "",
      authorID: "",
      authorName: "",
      authorImage: defaultAuthorImage(),
      authorPlaceholderSvg: defaultAuthorImage(),
      lang: "",
      twitter: defaultSocialMedia(),
      github: defaultSocialMedia(),
      instagram: defaultSocialMedia(),
      personalWebsite: "",
      youtube: defaultSocialMedia(),
      facebook: defaultSocialMedia(),
      linkedin: defaultSocialMedia(),
      lastTenPosts: [
        {
          createdAt: "",
          description: "",
          path: "",
          themeColor: "",
          title: "",
          updated: "",
          group: {
            icon: "",
            name: "",
            path: "",
            underlineColor: "",
          },
        },
      ],
    },
  }
);

//  UZIMAM PROVIDER-A

const { Provider: AuthorPageStateProvider } = authorPageContext;

//  === !==  === !==  === !==  === !==  === !==
// NAKON OVOGA OSTAJE DA GRUPISEM SVE, PO PRAKSI KAKVU SAM
// KORISTIO I ZA RANIJE CONTEXTE

// (2)
/**
 * @description Ne zaboravi da ti treba useContext HOOK (U FUNCTION COMPONENTS-IMA, JE TO NAJBOLJI NACIN ZA KORISCENJE ONOGA STO TI OBEZBEDJUJE CONTEXT) (CONTEXT JE VEC KRERAN U FAJLU IZ KOJEG SI OVO UVEZAO); A I SAM ZNANS DA CE TI TREBATI ACTION, ZATO SU I ONI OVDE
 */
export const $_useAuthorPageState = {
  AUTHOR_PAGE_ACTION_TYPES_ENUM,
  authorPageContext,
};

// (1)
/**
 * @description SVE STO TI TREBA ZA KREIRANJE STATE STORE-A I NJEGOCO SLANJE KROZ CONTEXT (OVDE CE TI TREBATI   useReducer  HOOK ) (CONTEXT JE VEC KRIRAN U FAJLU IZ KOJEG SI OVO UVEZAO)
 */
export const $_createAuthorPageReducerState = {
  authorPageReducer,
  AuthorPageStateProvider,
  defaultReducerState,
};
