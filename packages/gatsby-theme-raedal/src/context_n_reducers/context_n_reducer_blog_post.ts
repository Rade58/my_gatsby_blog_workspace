import {
  createContext,
  // types ==>
  Reducer,
  Context,
  //
  Dispatch,
  SetStateAction,
} from "react";

// UVOZIM DVA TYPE-A, KOJA MI TREBAJU (HeadingI JE TU BIO OD RANIJE)
import {
  HeadingI,
  GroupPagePickedI,
  //
  PrevAndNextPagePathI,
  AuthorI,
} from "../templates/blog-post-template";
import { PageKeywords } from "../templates/group-page-template";
//

export enum BLOG_POST_ACTION_TYPES_ENUM {
  PIG_AND_TRACK_DISAPEARD = "PIG_AND_TRACK_DISAPEARD",
  WINDOW_SCROLL_HEIGHT = "WINDOW_SCROLL_HEIGHT",
  HEADER_PULL_CHANGE = "HEADER_PULL_CHANGE",
  KEYWORD_MODAL_TOGGLE = "KEYWORD_MODAL_TOGGLE",
  // DODAJEM NOVI ACTION, KOJI BI TREBAO DISPATCH-OVATI
  // ONDA KADA SE DOGODI INTERSECTION
  // INTERSECTION = "INTERSECTION",
  GIVE_SET_JUMPER_STATE = "GIVE_SET_JUMPER_STATE",
  //
  GIVE_SET_JUMPER_SLIDING = "GIVE_SET_JUMPER_SLIDING",
  //
  GIVE_SET_OPACITY_CLASS_FUNC = "GIVE_SET_OPACITY_CLASS_FUNC",
}

export interface BlogPostStateI {
  pigDisapear: boolean;
  // header_pull_class: "pulled-down" | "pulled-up";
  keywordModalIsShown: boolean;
  // NOVI FIELD REDUCER STATE, KOJI KEEP-UJE ID
  // TRENUTNOG, SA VIEWPORT-OM INTERSECTED DIV-A (U KOJEM JE h2)
  // intersectedDivId: string;
  setIntersectedHeadingDivFunc:
    | Dispatch<SetStateAction<string>>
    | ((val: any) => void);

  setJumpersSlidingClass:
    | Dispatch<SetStateAction<"slide-left" | "slide-right">>
    | ((val: any) => void);

  setPigOpacityClassFunc:
    | Dispatch<SetStateAction<"is-opaque" | "not-opaque">>
    | ((val: any) => void);
}

//
// ***************************************************
// ************       REDUCER STVARI        ******
// ***************************************************

export const blogPostReducer: Reducer<
  BlogPostStateI,
  { type: BLOG_POST_ACTION_TYPES_ENUM; payload?: any }
> = (state, action) => {
  if (action.type === BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_JUMPER_SLIDING) {
    return { ...state, setJumpersSlidingClass: action.payload };
  }

  if (action.type === BLOG_POST_ACTION_TYPES_ENUM.PIG_AND_TRACK_DISAPEARD) {
    const prevPigDisapearance = state.pigDisapear;

    return { ...state, pigDisapear: !prevPigDisapearance };
  }

  /* if (action.type === BLOG_POST_ACTION_TYPES_ENUM.HEADER_PULL_CHANGE) {
    if (
      action.payload === "pulled-up" &&
      state.header_pull_class !== "pulled-up"
    ) {
      return { ...state, header_pull_class: action.payload };
    }

    if (
      action.payload === "pulled-down" &&
      state.header_pull_class !== "pulled-down"
    ) {
      return { ...state, header_pull_class: action.payload };
    }

    return state;
  } */

  // !== === HANDLE-UJEM DAKLE DA LI JE MODAL PRIKAZAN ILI NIJE !== ===
  if (action.type === BLOG_POST_ACTION_TYPES_ENUM.KEYWORD_MODAL_TOGGLE) {
    // ALI JA ZELIM OVDE PAYLOAD (MOZDA JE OVERKILL ALI CU DEFINISATI PAYLOAD)
    // JER JEDINI DISPATCH KADA SE MODAL ZATVARA TREBAO BI DA BUDE DISPATCH SA
    // false VREDNOSCU    keywordModalIsShown-A

    return { ...state, keywordModalIsShown: action.payload }; // ZATO KORISTIM PAYLOAD
  }

  /* if (action.type === BLOG_POST_ACTION_TYPES_ENUM.INTERSECTION) {
    // console.log(action.payload);

    return { ...state, intersectedDivId: action.payload };
  } */

  if (action.type === BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_JUMPER_STATE) {
    return { ...state, setIntersectedHeadingDivFunc: action.payload };
  }

  if (action.type === BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_OPACITY_CLASS_FUNC) {
    return { ...state, setPigOpacityClassFunc: action.payload };
  }

  return state;
};

/**
 * @description (1) OVAJ OBJEKAT, PORED DISPATCH FUNKCIJE JE JEDAN OD DEFAULT-OVA ZADAT PRI POZIVANJU    createContext-A (TO JE OVDE VEC URADJENO ;  (2)  A KORISTI SE KAO I DEFAULT STATE ZA REDUCER-A
 DAKLE PRI KORISCENJU useReducer HOOK, TI CES PROSLEDITI I OVAJ DEFAULT STATE*/
export const defaultState: BlogPostStateI = {
  pigDisapear: false,
  // header_pull_class: "pulled-down",

  keywordModalIsShown: false,
  // intersectedDivId: "#",
  setIntersectedHeadingDivFunc: () => {
    console.log("SET STATE");
  },
  setJumpersSlidingClass: () => {
    console.log("SLIDE LEFT OR RIGHT");
  },
  setPigOpacityClassFunc: () => {
    console.log("SET OPACITY CLASS FOR THE PIG");
  },
};

// CONTEXT stuff  === !==  === !==  === !==  === !==  === !==

export type BlogPostContDispatch = Dispatch<{
  type: BLOG_POST_ACTION_TYPES_ENUM;
  payload?: any;
}>;

export interface ContextBlogPostStateI {
  prevAndNextPagePath: PrevAndNextPagePathI;

  blogPostDispatch: BlogPostContDispatch;

  reducedBlogPostState: BlogPostStateI;
  headings: HeadingI[];
  relativeLink: string;

  seo: {
    title: string;
    lang: string;
    description: string;
    themeColor: string;
  };

  // PROSIRUJEM TYPE-OVE

  groupPage: GroupPagePickedI;
  allBlogKeywords: PageKeywords[];

  createdAt: string;
  isUpdated: boolean;
  updated: string;
  author: AuthorI;
}

// OVO JE SAMO DEFAULT STATE I REDUCER-A NEMA JOS
export const blogPostContext: Context<ContextBlogPostStateI> = createContext({
  //
  prevAndNextPagePath: {
    nextPagePath: "",
    prevPagePath: "",
  },

  // DAKLE OVE DVE VREDNOSTI SU SAM ODEFAULT-OVI

  createdAt: " ",
  // NISAM MOGAO DRUGACIJE ZADATI VREDNOST NEGO OVAKO
  // === !== === !== === !== === !== === !== === !== === !==
  // *******************************************************
  // === !== === !== === !== === !== === !== === !== === !==
  // OVO MI JE JAKO BITNO DA PRIMETIS, JER MI NIJE JASNO ZASTO
  // BAS OVAKO MORAM DA ZADAM VREDNOST

  isUpdated: Boolean(false),
  //=== !== === !== === !== === !== === !== === !== === !==
  // ******************************************************
  //=== !== === !== === !== === !== === !== === !== === !==

  updated: "",
  reducedBlogPostState: defaultState,
  // eslint-disable-next-line
  blogPostDispatch: ({ type, payload }) => {}, // MISLIM DA JE BITNO STO SI OBEZBEDIO OVAKAV DEFAULT (SADA KADA BUDES KORISTIO OVAJ CONTEXT U DRUGIM FAJLOVIMA, IAMCES TACNE TYPE-OVE)

  headings: [{ depth: 0, value: "nothing" }],
  relativeLink: "nothing",
  seo: {
    description: "placeholder",
    lang: "en",
    themeColor: "none",
    title: "default title",
  },
  // DODAJEM I OSTATAK DEFAULT-OVA
  groupPage: {
    groupColor: "#fff",
    icon: "",
    name: "",
    path: "",
    underlineColor: "",
  },
  allBlogKeywords: [
    {
      keyword: "",
      path: "",
      keywordBorderColor: "",
      keywordColor: "",
      keywordTextColor: "",
    },
  ],
  author: { authorName: "", path: "" },
});

// GOTO VO CES UVEK KORISTITI     useContext    HOOK
// ALI IZVOZIM I    Consumer    KOMPONENTU
export const { Provider, Consumer } = blogPostContext;

// (2)
/**
 * @description Ne zaboravi da ti treba useContext HOOK (U FUNCTION COMPONENTS-IMA, JE TO NAJBOLJI NACIN ZA KORISCENJE ONOGA STO TI OBEZBEDJUJE CONTEXT) (CONTEXT JE VEC KRERAN U FAJLU IZ KOJEG SI OVO UVEZAO); A I SAM ZNANS DA CE TI TREBATI ACTION, ZATO SU I ONI OVDE
 */
export const $_useBlogPostReducerState = {
  blogPostContext,
  BLOG_POST_ACTION_TYPES_ENUM,
};

// (1)
/**
 * @description SVE STO TI TREBA ZA KREIRANJE STATE STORE-A I NJEGOCO SLANJE KROZ CONTEXT (OVDE CE TI TREBATI   useReducer  HOOK ) (CONTEXT JE VEC KRIRAN U FAJLU IZ KOJEG SI OVO UVEZAO)
 */
export const $_createBlogPostReducerState = {
  BlogPostStateProvider: Provider,
  blogPostReducer,
  defaultBlogPostState: defaultState,
};
