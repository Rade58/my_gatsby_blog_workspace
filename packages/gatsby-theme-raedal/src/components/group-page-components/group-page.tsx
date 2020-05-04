/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { FunctionComponent } from "react";

// dev utility
import StringifiedProps from "../dev-utility/StringifyProps";
//
//
// /////
// NECU DA MENJAM NIKAKVO STANJE POVODOM PROPSA, KOJE JE
import { GroupPageTemplatePropsI } from "../../templates/group-page-template";
// ZATO SAM KAO STO VIDIS GORE, UVEZAO ISTI INTERFACE, KOJIM SAM
// TYPE-OVAO PROPSE TEMPLATE KOMPONENTE

// DAKLE POTREBNO JE OBEZBEDITI CONTEXT
// OVDE BI BIO NJEGOV PROVIDER

// A ONO STO BI BILO PROVIDED JESU ONI PROPSI KOJI SU MI POTREBNI

// DAKLE TREBAM SE ODLUCITI STA BI TO BILO DOBRO PROSLEDITI
// USTVARI TO BI TREBAL ODA BUDU      cons {groupPage} = props.data

// ALI ZASTO NE BI URADIO NEKAKAV FUTURE PROOFING I OBEZBEDIO SVE

// piatanje je da li bih trebao koristiti reducer-a (MOZDA CE ZATREBATI)

const GroupPage: FunctionComponent<GroupPageTemplatePropsI> = (props) => {
  const a = 0;

  return <StringifiedProps {...props} />;
};

export default GroupPage;
