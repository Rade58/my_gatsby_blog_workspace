/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { FunctionComponent } from "react";
import Profile from "./profile-author";

const Main: FunctionComponent = () => {
  let a;

  return (
    <main>
      <Profile />
    </main>
  );
};

export default Main;
