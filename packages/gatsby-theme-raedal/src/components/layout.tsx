/** @jsx jsx */
import { jsx } from "theme-ui";

import { Fragment, FunctionComponent } from "react";
import { Global } from "@emotion/core";

const Layout: FunctionComponent = ({ children }) => (
  <Fragment>
    <Global
      styles={{
        body: { margin: 0 },
      }}
    />
    <header
      sx={{
        bg: "olive",
        color: "blabchedalmond",
        fontFamily: "Ubuntu",
        p: 10,
      }}
    >
      <strong>Blog Post Layout</strong>
    </header>
    <main sx={{ mx: "auto", maxWidth: 680, width: "80vw" }}>{children}</main>
  </Fragment>
);

export default Layout;
