/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { FunctionComponent } from "react";

// NEKA MAIN BUDE GRID (A TU CU LOGIKU, KASNIJE DODATI)

const MainGp: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <main
      css={css`
        border: crimson solid 1px;
      `}
    >
      {children}
    </main>
  );
};

export default MainGp;
