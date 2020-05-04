import { createContext, Reducer, Dispatch, Context } from 'react'

// TREBACE DA TYPE-UJE, DRUGI OGRNAK KONTEKSTOVOG STATE-A
import { GroupPageI, LocationI } from '../templates/group-page-template'

// ODNOSNO ONOG DELA KOJI NIJE OBEZBEDJEN OD STRANE REDUCER-A

export enum GROUP_PAGE_ACTIONS {
  PLACEHOLDER = "PLACEGOLDER"
}

export interface GroupPageReducedStateI {
  placeholder?: string;
}

export interface GroupPageReducerActionI {
  type: GROUP_PAGE_ACTIONS;
  payload?: any
}

// ***************************************************
// ************       REDUCER STVARI        ******
// ***************************************************

export const groupPageReducer: Reducer<GroupPageReducedStateI, GroupPageReducerActionI> = (state, action) => {

  const blah = 1;


  return state
}

// ***************************************************

/**
 * @description (1) OVAJ OBJEKAT, PORED DISPATCH FUNKCIJE JE JEDAN OD DEFAULT-OVA ZADAT PRI POZIVANJU    createContext-A (TO JE OVDE VEC URADJENO ;  (2)  A KORISTI SE KAO I DEFAULT STATE ZA REDUCER-A
 */

export const defaultReducerStaste: GroupPageReducedStateI = {

}


// DISPATCHER TYPE

export type GroupPageRedDispatcher = Dispatch<GroupPageReducerActionI>

// TYPE ZA CELOKUPNI STATE, KOJI CE HRANITI PROVIDER-A

export interface GroupPageContextStateI {
  groupPage: GroupPageI,
  location?: LocationI,
  reducedState: GroupPageReducedStateI
  groupPageDispatch: GroupPageRedDispatcher
}



// ***************************************************
// CONTEXT stuff  === !==  === !==  === !==  === !==  === !==
// ***************************************************

export const groupPageContext: Context<GroupPageContextStateI> = createContext({
  // eslint-disable-next-line
  groupPageDispatch: ({ type, payload }) => { },
  reducedState: defaultReducerStaste,
  groupPage: {
    allBlogKeywords: [{ keyword: "", path: "" }],
    blogPostPages: [{
      title: "",
      path: "",
      updated: "",
      frontMatter: {
        description: "",
        themeColor: ""
      }
    }],
    path: "",
    groupColor: "blanchedalmond",
    name: "",
    updated: ""
  }
  // KAO STO MSE MOZE PRIMETITI OVO PROSLEDJIVANJE DEFAULT-OVA JE
  // MALO BILO BRUTALNO
})

//  === !==  === !==  === !==  === !==  === !==
// NAKON OVOGA OSTAJE DA GRUPISEM EXPORE, PO PRAKSI KAKVU SAM 
// KORISTIO I ZA RANIJE CONTEXTE

