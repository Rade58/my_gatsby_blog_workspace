/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";

import { additionalStyles } from "../../common-styles";

const Header: FunctionComponent = () => {
  let a;

  return (
    <header
      sx={{
        variant: "borders.primary",
        backgroundImage: additionalStyles.headerBackgroundImage,
      }}
    >
      Neki Header
    </header>
  );
};

export default Header;
