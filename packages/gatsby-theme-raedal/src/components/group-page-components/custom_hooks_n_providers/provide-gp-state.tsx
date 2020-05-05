// useReducer CU ISKORISTITI OVDE

// OSTATAK STATE-A, KOJE JE DOBIJENO IZ GRAPHQL QUERY-JA, CU PROSLEDITI
// KROZ PROPSE KOMPONENTE (ZATO TYPE-UJ KOMPONENTU)

import React, { FunctionComponent, useReducer } from "react";

import { $_createGroupPageReducerState } from "../../../context_n_reducers/group_page_con_red";

// ATO UVOZIM  INTERFACE-OVE KOJI MI TREBAJU
import { GroupPageI, LocationI } from "../../../templates/group-page-template";

interface GroupPageProviderI {
  groupPage: GroupPageI;
  location?: LocationI;
}

const GroupPageStateProvider: FunctionComponent<GroupPageProviderI> = (
  props
) => {
  const {
    GroupPageStateProvider: Provider,
    defaultReducerState,
    groupPageReducer,
  } = $_createGroupPageReducerState;

  const [reducedState, groupPageDispatch] = useReducer(
    groupPageReducer,
    defaultReducerState
  );

  // location       IZOSTAVLJAM JER NAM DA MI NECE TREBATI ZA SADA (DOBRO JE STO JE OPCIONO)
  const { groupPage, children } = props;

  return (
    <Provider value={{ groupPage, reducedState, groupPageDispatch }}>
      {children}
    </Provider>
  );
};

export default GroupPageStateProvider;
