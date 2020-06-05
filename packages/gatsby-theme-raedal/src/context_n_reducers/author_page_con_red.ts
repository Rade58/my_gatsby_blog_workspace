import { createContext, Reducer, Dispatch, Context } from "react";

import {
  AuthorPageDataI,
  SocialMedia,
  AuthorImageI,
} from "../templates/author-page-template";
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
  // url: "",
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
    },
  }
);

//  KREIRAM PROVIDER-A
