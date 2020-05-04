/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { FunctionComponent } from "react";
// PROVIDING TEME
import theme from "../gatsby-plugin-theme-ui/index";
////////////////////////////////////////////////////

// dev utility
import StringifiedProps from "./dev-utility/StringifyProps";
//
//
// /////
// NECU DA MENJAM NIKAKVO STANJE POVODOM PROPSA, KOJE JE
import { GroupPageTemplatePropsI } from "../templates/group-page-template";
// ZATO SAM KAO STO VIDIS GORE, UVEZAO ISTI INTERFACE, KOJIM SAM
// TYPE-OVAO PROPSE TEMPLATE KOMPONENTE

const GroupPage: FunctionComponent<GroupPageTemplatePropsI> = (props) => {
  const a = 0;

  return <StringifiedProps {...props} />;
};

export default GroupPage;
