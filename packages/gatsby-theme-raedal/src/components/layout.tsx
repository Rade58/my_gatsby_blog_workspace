/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";

import { Fragment, FunctionComponent } from "react";
import { Global } from "@emotion/core";

//
import theme from "../gatsby-plugin-theme-ui/index";
//

const Layout: FunctionComponent = ({ children }) => (
  <Fragment>
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          body: { margin: 0 },
        }}
      />
      <header>
        <strong>Blog Post Layout</strong>
      </header>
      <main>{children}</main>
      <button
        sx={{
          variant: "myButton",
        }}
        type="button"
      >
        Press me
      </button>
    </ThemeProvider>
  </Fragment>
);

export default Layout;
