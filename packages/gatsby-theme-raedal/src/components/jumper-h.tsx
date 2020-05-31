/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import {
  useContext,
  useState,
  Fragment,
  forwardRef,
  useEffect,
  FunctionComponent,
  ForwardRefRenderFunction,
  RefObject,
  useImperativeHandle,
} from "react";
import Octicon, { getIconByName } from "@primer/octicons-react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

interface JumperPropsI {
  mainReference: RefObject<HTMLElement>;
  articleReference: RefObject<HTMLElement>;
}

const JumperButtons: FunctionComponent<JumperPropsI> = ({
  mainReference,
  articleReference,
}) => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { headings, relativeLink } = useContext(blogPostContext);

  const [currentHeaderToBeClicked, setCurrentHeaderToBeClicked] = useState<
    number
  >(0);

  const triangleUp = getIconByName("triangle-up");
  const triangleDown = getIconByName("triangle-down");
  const arrowUp = getIconByName("arrow-up");

  // console.log({ mainReference, articleReference });

  useEffect(() => {
    console.log(articleReference.current);
  }, [articleReference]);

  return (
    <Fragment>
      {!headings.length ? null : (
        <aside
          className="jumper-cont"
          css={css`
            /* visibility: hidden; */

            & .show-me {
              display: inline-block;
            }

            & .hide-me {
              display: none;
            }

            @media screen and (min-width: 918px) {
              display: none;
            }
          `}
        >
          <div className="h-changer">
            <span className="up">
              <Octicon icon={triangleUp} size="medium" />
            </span>
            <span className="down">
              <Octicon icon={triangleDown} size="medium" />
            </span>
          </div>
          <div className="scroll-to-top">
            <Octicon icon={arrowUp} size="medium" />
          </div>
        </aside>
      )}
    </Fragment>
  );
};
export default JumperButtons;
