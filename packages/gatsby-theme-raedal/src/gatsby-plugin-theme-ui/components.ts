import Code from "../components/mdx-theme-ui-overrides/code";
import giveHeading from "../components/mdx-theme-ui-overrides/heading";

//

const components = {
  // h1: heading("h1"),
  h2: giveHeading("h2"),
  /* h3: heading("h3"),
  h4: heading("h4"),
  h5: heading("h5"),
  h6: heading("h6"), */
  pre: Code,
};

export default components;
