import React, { FunctionComponent, useContext } from "react";
import StringifiedProps from "./StringifyProps";
import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

const StringifiedContextState: FunctionComponent = () => {
  const { groupPageContext } = $_useGroupPageState;
  const { groupPage, reducedState } = useContext(groupPageContext);

  return <StringifiedProps myData={{ groupPage, reducedState }} />;
};

export default StringifiedContextState;
