/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { FunctionComponent } from "react";

// dev utility
import StringifiedProps from "../dev-utility/StringifyProps";
//
import { GroupPageTemplatePropsI } from "../../templates/group-page-template";
//
// === !==
// UVOZIM SADA PROVIDER KOMPONENTU, KOJA CE VEC IMATI USPOSTAVLJENI REDUCER STATE PASSED IN
import GroupPageStateProvider from "./custom_hooks_n_providers/provide-gp-state";
//

// SAMO JOJ TREBAM OBEZBEDITI DATA IZ GRAPHQL QUERY-JA

const GroupPage: FunctionComponent<GroupPageTemplatePropsI> = (props) => {
  const { groupPage } = props.data; // eslint-disable-line
  const { children } = props;

  return (
    <GroupPageStateProvider groupPage={groupPage}>
      {children}
    </GroupPageStateProvider>
  );

  // return <StringifiedProps {...props} />;
};

export default GroupPage;
