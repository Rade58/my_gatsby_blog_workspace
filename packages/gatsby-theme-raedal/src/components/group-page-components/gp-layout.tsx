/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { Fragment, FunctionComponent } from "react";

// PROVIDING TEME
import theme from "../../gatsby-plugin-theme-ui/index";
////////////////////////////////////////////////////

// ONO CIME CU UVESTI U OVU KOMPONENTU JESTE
//    GroupPage      KOMPONENTA, KOJA IMA UGRADJEN SAV STATE
// I SVE WRAPP-UJEM U GroupPage, JER ONA NOSI SAV STATE (I REDUCER-OV I ONAJ
// UZET OD QUERY-JA)

import StringifiedProps from "../dev-utility/StringifyProps";

const LayoutGroupPage: FunctionComponent = (props) => {
  const stvari = "";

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <StringifiedProps />
      </ThemeProvider>
    </Fragment>
  );
};

export default LayoutGroupPage;
