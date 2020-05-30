/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { useContext, FunctionComponent } from "react";
import Octicon, { getIconByName } from "@primer/octicons-react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

const JumpButtons: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { headings, relativeLink } = useContext(blogPostContext);

  const triangleUp = getIconByName("triangle-up");
  const triangleDown = getIconByName("triangle-down");
  const arrowUp = getIconByName("arrow-up");

  return (
    <aside className="jumper-btns">
      <div className="h-changer">
        <Octicon icon={triangleUp} />
        <Octicon icon={triangleDown} />
      </div>
      <div className="scroll-to-top">
        <Octicon icon={arrowUp} />
      </div>
    </aside>
  );
};

export default JumpButtons;
