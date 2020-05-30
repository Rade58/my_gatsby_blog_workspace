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

// ForwardRefRenderFunction
//              PRVI GENERIC SE ODNOSI NA           REF TYPE
//              DRUGI SE ODNOSI N             PROPS TYPE

const JumpButtons = forwardRef<HTMLElement, { gref: RefObject<HTMLElement> }>(
  function JumperButtons({ gref }, ref) {
    const { blogPostContext } = $_useBlogPostReducerState;
    const { headings, relativeLink } = useContext(blogPostContext);

    const [currentHeaderToBeClicked, setCurrentHeaderToBeClicked] = useState<
      number
    >(0);

    useEffect(() => {
      console.log({ gref });
    }, [ref]);

    const triangleUp = getIconByName("triangle-up");
    const triangleDown = getIconByName("triangle-down");
    const arrowUp = getIconByName("arrow-up");

    return (
      <Fragment>
        {!headings.length ? null : (
          <aside
            className="jumper-cont"
            css={css`
              visibility: hidden;

              .show-me {
                display: inline-block;
              }

              .hide-me {
                display: none;
              }

              @media screen and (max-width: 918px) {
                display: none;
              }
            `}
          >
            <div className="h-changer">
              <span className="up">
                <Octicon icon={triangleUp} />
              </span>
              <span className="down">
                <Octicon icon={triangleDown} />
              </span>
            </div>
            <div className="scroll-to-top">
              <Octicon icon={arrowUp} />
            </div>
          </aside>
        )}
      </Fragment>
    );
  }
);

export default JumpButtons;
