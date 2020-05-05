/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  let a;

  return (
    <header
      sx={{
        variant: "borders.primary",
      }}
    >
      Neki Header
      <button sx={{}}>Press the me</button>
    </header>
  );
};

export default Header;
