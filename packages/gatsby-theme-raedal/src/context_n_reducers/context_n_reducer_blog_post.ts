import {
  createContext,
  // types ==>
  Reducer,
  Dispatch,
  Context,
} from "react";
import { HeadingI } from "../templates/blog-post-template";

export enum BLOG_POST_ACTION_TYPES_ENUM {
  PIG_AND_TRACK_DISAPEARD = "PIG_AND_TRACK_DISAPEARD",
  WINDOW_SCROLL_HEIGHT = "WINDOW_SCROLL_HEIGHT",
  HEADER_PULL_CHANGE = "HEADER_PULL_CHANGE"
}

export interface BlogPostStateI {
  pigDisapear: boolean;
  header_pull_class: "pulled-down" | "pulled-up"
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

  if (action.type === BLOG_POST_ACTION_TYPES_ENUM.HEADER_PULL_CHANGE) {

    if (action.payload === "pulled-up" && state.header_pull_class !== "pulled-up") {
      return { ...state, header_pull_class: action.payload }
    }

    if (action.payload === "pulled-down" && state.header_pull_class !== "pulled-down") {
      return { ...state, header_pull_class: action.payload }
    }


    return state
  }


  return state;
};

/**
 * @description (1) OVAJ OBJEKAT, PORED DISPATCH FUNKCIJE JE JEDAN OD DEFAULT-OVA ZADAT PRI POZIVANJU    createContext-A (TO JE OVDE VEC URADJENO ;  (2)  A KORISTI SE KAO I DEFAULT STATE ZA REDUCER-A
 */
export const defaultState: BlogPostStateI = {
  pigDisapear: false,
  header_pull_class: "pulled-down"
};



// CONTEXT stuff  === !==  === !==  === !==  === !==  === !==

export type BlogPostContDispatch = Dispatch<{
  type: BLOG_POST_ACTION_TYPES_ENUM;
  payload?: any;
}>;

export interface ContextBlogPostStateI {
  blogPostDispatch: BlogPostContDispatch;

  reducedBlogPostState: BlogPostStateI;
  headings: HeadingI[];
  relativeLink: string;

  seo: {
    title: string;
    lang: string;
    description: string;
    themeColor: string;
  }

}

// OVO JE SAMO DEFAULT STATE I REDUCER-A NEMA JOS
export const blogPostContext: Context<ContextBlogPostStateI> = createContext({
  // DAKLE OVE DVE VREDNOSTI SU SAM ODEFAULT-OVI

  reducedBlogPostState: defaultState,
  // eslint-disable-next-line
  blogPostDispatch: ({ type, payload }) => { },  // MISLIM DA JE BITNO STO SI OBEZBEDIO OVAKAV DEFAULT (SADA KADA BUDES KORISTIO OVAJ CONTEXT U DRUGIM FAJLOVIMA, IAMCES TACNE TYPE-OVE)
  headings: [{ depth: 0, value: "nothing" }],
  relativeLink: "nothing",
  seo: {
    description: "placeholder",
    lang: "en",
    themeColor: "none",
    title: "basic title"
  }
});

// GOTO VO CES UVEK KORISTITI     useContext    HOOK
// ALI IZVOZIM I    Consumer    KOMPONENTU
export const { Provider, Consumer } = blogPostContext;



// (2)
/**
 * @description Ne zaboravi da ti treba useContext HOOK (U FUNCTION COMPONENTS-IMA, JE TO NAJBOLJI NACIN ZA KORISCENJE ONOGA STO TI OBEZBEDJUJE CONTEXT) (CONTEXT JE VEC KRERAN U FAJLU IZ KOJEG SI OVO UVEZAO); A I SAM ZNANS DA CE TI TREBATI ACTION, ZATO SU I ONI OVDE
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
