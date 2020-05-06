/** @jsx jsx */
import { jsx } from "theme-ui";

import { FunctionComponent } from "react";
import { css } from "@emotion/core";

const BuyMyCourse: FunctionComponent = () => {
  let blah;
  return (
    <aside
      className="courses"
      css={css`
        border: tomato solid 2px;
        margin: 4px;
      `}
    >
      Buy my course
    </aside>
  );
};

export default BuyMyCourse;
