/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { Global } from "@emotion/core";
import { Fragment, FunctionComponent } from "react";

// PROVIDING TEME
import theme from "../../gatsby-plugin-theme-ui/index";
////////////////////////////////////////////////////
import { additionalStyles } from "../../common-styles";
//

// ONO CIME CU UVESTI U OVU KOMPONENTU JESTE
//    GroupPage      KOMPONENTA, KOJA IMA UGRADJEN SAV STATE
// I SVE WRAPP-UJEM U GroupPage, JER ONA NOSI SAV STATE (I REDUCER-OV I ONAJ
// UZET OD QUERY-JA)

// import StringifiedProps from "../dev-utility/StringifyProps";
import StringifiedContextState from "../dev-utility/StringifiedContextState";

// components
import Header from "./header-group";
import Main from "./gp-main";
import Cards from "./cards";
import Keywords from "./keywords";

const LayoutGroupPage: FunctionComponent = () => {
  const stvari = "";

  return (
    <Fragment>
      <Global
        styles={{
          body: {
            backgroundColor: additionalStyles.bodyBackgroundColor,
          },
        }}
      />
      <ThemeProvider theme={theme}>
        {/* <StringifiedProps /> */}
        <Header />
        <Main>
          {/* <StringifiedContextState /> */}
          <Cards />
          <Keywords />
        </Main>
      </ThemeProvider>
    </Fragment>
  );
};

export default LayoutGroupPage;
