/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { css, Global } from "@emotion/core";
import { Fragment, FunctionComponent } from "react";

// PROVIDING TEME
import theme from "../../gatsby-plugin-theme-ui/index";
////////////////////////////////////////////////////
import { additionalStyles } from "../../common-styles";
//
import GroupSeo from "../../seo/group-seo";
//

// ONO CIME CU UVESTI U OVU KOMPONENTU JESTE
//    GroupPage      KOMPONENTA, KOJA IMA UGRADJEN SAV STATE
// I SVE WRAPP-UJEM U GroupPage, JER ONA NOSI SAV STATE (I REDUCER-OV I ONAJ
// UZET OD QUERY-JA)

// dev utilities  === !== === !==
// import StringifiedProps from "../dev-utility/StringifyProps";
import StringifiedContextState from "../dev-utility/StringifiedContextState";
import AddsPlaceholder from "../dev-utility/addsPlaceholder";
import BuyMyCourse from "../dev-utility/coursePlaceholder";
import Lorem from "../dev-utility/lorem-ipsum";
// === !== === !==

// components
import Header from "./header-group";
import Main from "./gp-main";
import Cards from "./cards";
import Keywords from "./keywords";
import HeadingMajor from "./heading-major";

const LayoutGroupPage: FunctionComponent = () => {
  const stvari = "";

  return (
    <Fragment>
      <Global
        styles={css`
          html {
            width: 100%;
          }

          body {
            width: 100%;
            overflow-x: hidden;
            background-color: ${additionalStyles.bodyBackgroundColor};
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
          }
        `}
      />
      {/* MOZDA JE OVO DOBRO MESTO ZA HELMET */}
      <GroupSeo />
      {/* ---------- */}
      <ThemeProvider theme={theme}>
        {/* <StringifiedProps /> */}
        <Header />
        <Main>
          <HeadingMajor />
          {/* <StringifiedContextState /> */}
          <Cards />
          <Keywords />
          <AddsPlaceholder />
          <BuyMyCourse />
          <Lorem />
        </Main>
      </ThemeProvider>
    </Fragment>
  );
};

export default LayoutGroupPage;
