/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import {
  useContext,
  useRef,
  useState,
  Fragment,
  forwardRef,
  useEffect,
  FunctionComponent,
  ForwardRefRenderFunction,
  RefObject,
  useImperativeHandle,
  useLayoutEffect,
  memo,
} from "react";
import Octicon, { getIconByName } from "@primer/octicons-react";
import {
  $_useBlogPostReducerState,
  BLOG_POST_ACTION_TYPES_ENUM,
} from "../context_n_reducers/context_n_reducer_blog_post";

interface JumperPropsI {
  mainReference: RefObject<HTMLElement>;
  articleReference?: RefObject<HTMLElement>;
}

const JumperButtons: FunctionComponent<JumperPropsI> = ({ mainReference }) => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const {
    headings,
    relativeLink,
    reducedBlogPostState,
    blogPostDispatch,
  } = useContext(blogPostContext);

  const [currentHeaderToBeClicked, setCurrentHeaderToBeClicked] = useState<
    number
  >(0);

  const triangleUp = getIconByName("triangle-up");
  const triangleDown = getIconByName("triangle-down");
  const arrowUp = getIconByName("arrow-up");

  // const frameRef = useRef<HTMLDivElement>(null);
  // const frameIsObserved = useState<boolean>(false);
  // console.log({ mainReference, articleReference });

  // JA CU IMATI VISE OBSERVER-A
  // A ZASTO IH OVDE DEFINISEM ?
  // DA BIH MOUGAO DA OBAVIM      UNOBSERVING
  // ODNONO SKIDANJE OBSERVERA
  // STO CU DEFINISATI KADA SE DOGODI UNMOUNTING KOMPONENTE
  // const interObservers = useRef<IntersectionObserver[]>([]); // ZA POCETAK JE OVO PRAZAN NIZ
  //                                                              NE MORAM OVO DA STAVLJAM KAO
  //                                                              DEPAENDANCY ZA useEffect

  // const [interObs, setInterObs] = useState<IntersectionObserver[]>([])

  // const [currentId, setCurrentId] = useState<string>("");

  const [previousBodyScrollHeight, setPreviousBodyScrollHeight] = useState<
    number
  >(0);

  const [mountObserver, setMountingTrigger] = useState(false);

  const [interObservers, setInterObservers] = useState<IntersectionObserver[]>(
    []
  );

  //

  useEffect(() => {
    console.log("JUMPER MOUNTED");
  }, []);

  // RANDOM MOUNTINGZ

  /* useEffect(() => {
    console.log("RANDOM MOUNTINGZ");
  }); */

  //
  // unmounting
  //

  useEffect(
    () => () => {
      console.log("JUMPER UNMOUNTED!!!!");

      // setMountingTrigger(!mountingTrigger);
    },
    [] // ZA UNMOUNTIG SE STAVLJA NIZ NE ZABORAVI OPET
  );

  // console.log(interObservers[0].root);

  const [intersectedDivId, setIntersectedDivId] = useState<string>("");

  useEffect(() => {
    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_JUMPER_STATE,
      payload: setIntersectedDivId,
    });
  }, []);

  return (
    <Fragment>
      <aside
        className="jumper-cont"
        css={css`
          /* visibility: hidden; */

          /* border: crimson solid 1px; */
          /* position: fixed;
            top: 200;
            left: 0;
            width: 100%; */

          display: flex;
          flex-direction: column;

          & .show-me {
            display: flex;
          }

          & .hide-me {
            display: none;
          }

          /* @media screen and (min-width: 918px) {
              display: none;
            } */
        `}
      >
        {/* <div
            ref={frameRef}
            className="frame"
            css={css`
              position: absolute;
              top: 58px;
              bottom: 0;
              left: 0;
              right: 0;
              border: crimson solid 8px;
            `}
          /> */}
        {intersectedDivId}
        <div className="h-changer">
          <span className="up">
            <Octicon icon={triangleUp} size="medium" />
          </span>

          {/* -------------TASBLE OF HEADINGS--------------- */}
          <section
            // style={{ display: headings.length ? "inline-block" : "none" }}
            className={`tofh2 ${headings.length ? "show-me" : "hide-me"}`}
            css={css`
              .show-me {
                display: inline-block;
              }

              .hide-me {
                display: none;
              }

              @media screen and (max-width: 918px) {
                display: none;
              }

              & ul {
                padding: 0;
                width: 100%;
                list-style-type: none;
                & li {
                }
              }

              & a {
                color: blanchedalmond;
              }
            `}
          >
            <ul>
              {headings &&
                headings.length !== 0 &&
                headings.map(({ depth, value }) => (
                  <li key={`${value}-${depth}`}>
                    <Link
                      onClick={() => {
                        console.log("clicked");

                        setIntersectedDivId(
                          `#${encodeURI(value.toLowerCase())
                            .replace(/%20/g, "-")
                            .replace(/ /g, "-")}`
                        );
                      }}
                      to={`${encodeURI(relativeLink)}#${encodeURI(
                        value.toLowerCase()
                      )
                        .replace(/%20/g, "-")
                        .replace(/ /g, "-")}`}
                    >
                      {value}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
          {/* ================================================ */}
          <span className="down">
            <Octicon icon={triangleDown} size="medium" />
          </span>
        </div>
        <div className="scroll-to-top">
          <Octicon icon={arrowUp} size="medium" />
        </div>
      </aside>
    </Fragment>
  );
};
export default JumperButtons;
