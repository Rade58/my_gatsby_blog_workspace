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

import { additionalStyles } from "../common-styles";

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
    groupPage,
  } = useContext(blogPostContext);

  const { groupColor, underlineColor } = groupPage;

  // const { headerBackgroundImage } = additionalStyles;

  const [currentHeaderToBeClicked, setCurrentHeaderToBeClicked] = useState<
    number
  >(0);

  const [slideClass, setSlideClass] = useState<"slide-left" | "slide-right">(
    "slide-right"
  );

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

  // MORAM KREIRATI DICTIONARY TYPE, ZA NORMALIZED hedaings OBJEKAT
  const normalizedHeadingsRef = useRef<{
    [key: string]: { value: string; depth: number };
  }>({}); // OVAJ REF CE DOBITI U useEffect-U (SAMO ON MOUNTING, SVE STA MU TREBA)

  // MORAO BIH KREIRATI I NIZ NAPRAVLJEN SAMO OD HEADINGS STRINGOVA
  const justHeadingsArrayRef = useRef<string[]>([]);

  const [loadArray, setLoadArray] = useState<boolean>(true);

  useEffect(() => {
    //
    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_JUMPER_STATE,
      payload: setIntersectedDivId,
    });

    // SALJEM SET STATE FUNKCIJU KOJA DEFINISE KOJA CE SE SLIDING KLASA KORISTITI
    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_JUMPER_SLIDING,
      payload: setSlideClass,
    });

    // NORMALIZOVANJE     headings    NIZ-A
    headings.forEach((hedingOb) => {
      if (loadArray) {
        normalizedHeadingsRef.current[
          `${encodeURI(hedingOb.value.toLowerCase())
            .replace(/%20/g, "-")
            .replace(/ /g, "-")}`.trim()
        ] = {
          value: `${encodeURI(hedingOb.value.toLowerCase())
            .replace(/%20/g, "-")
            .replace(/ /g, "-")}`.trim(),
          depth: hedingOb.depth,
        };

        justHeadingsArrayRef.current.push(
          `${encodeURI(hedingOb.value.toLowerCase())
            .replace(/%20/g, "-")
            .replace(/ /g, "-")}`.trim()
        );

        setLoadArray(false);
      }
    });
  }, []);

  const indexOfCurrentIntersHdiv = justHeadingsArrayRef.current.indexOf(
    intersectedDivId
  );

  /* console.log(indexOfCurrentIntersHdiv);

  console.log({
    norm: normalizedHeadingsRef.current,
    arr: justHeadingsArrayRef.current,
    hs: headings,
    intersectedDivId,
  }); */

  const previousIndex: number | undefined =
    indexOfCurrentIntersHdiv - 1 >= 0 ? indexOfCurrentIntersHdiv - 1 : -1;
  const nextIndex: number | undefined =
    indexOfCurrentIntersHdiv + 1 >= 0
      ? indexOfCurrentIntersHdiv + 1
      : indexOfCurrentIntersHdiv;

  const prevDivHkey: string = justHeadingsArrayRef.current[previousIndex];
  const nextDivHkey: string = justHeadingsArrayRef.current[nextIndex];

  console.log({
    previousIndex,
    nextIndex,
    prevDivHkey,
    nextDivHkey,
  });

  return (
    <Fragment>
      <aside
        className={`jumper-cont ${slideClass}`}
        css={css`
          /* visibility: hidden; */

          /* border: crimson solid 1px; */
          /* position: fixed;
            top: 200;
            left: 0;
            width: 100%; */

          display: ${!headings.length ? "none" : "flex"};
          flex-direction: column;

          @media screen and (max-width: 918px) {
            border-radius: 14px;

            position: fixed;
            bottom: 0;
            right: 0;
            left: 85vw;

            transition-property: transform;
            transition-duration: 0.2s;

            &.slide-right {
              transform: translateX(60px);
            }

            &.slide-left {
              transform: translateX(-20px);
            }
          }

          /* & .show-me {
            display: flex;
          }

          & .hide-me {
            display: none;
          } */

          /* @media screen and (min-width: 918px) {
              display: none;
            } */

          & div.open-book {
            border: olive solid 1px;
            display: flex;

            @media screen and (max-width: 918px) {
              display: none;
            }

            & span {
              margin-right: auto;
            }
          }

          & div.scroll-to-top {
            border: 2px solid ${underlineColor};
            width: fit-content;
            margin-left: auto;
            border-radius: 12px;

            @media screen and (max-width: 918px) {
              background-color: ${"#1b2227c9"};

              margin-left: auto;
              margin-right: auto;
            }

            cursor: pointer;

            & > * {
              margin: 4px;
            }
          }
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
        {/* {intersectedDivId} */}
        <div className="open-book">
          <span role="img" aria-label="table of content">
            📖
          </span>
        </div>
        <div
          className="h-changer"
          css={css`
            border: yellow solid 2px;
            display: flex;
            flex-direction: column;

            align-items: center;

            @media screen and (max-width: 918px) {
              background-color: ${"#1b2227c9"};
            }

            & > a {
              color: blanchedalmond;

              &:hover {
                color: crimson;
              }

              &.disabled {
                /* display: none; */
                pointer-events: none;
                opacity: 0.2;
                cursor: not-allowed;
              }
            }
          `}
        >
          <Link
            onClick={() => {
              if (prevDivHkey) {
                setIntersectedDivId(prevDivHkey);
              }
            }}
            to={`${encodeURI(relativeLink)}#${prevDivHkey}`}
            className={`${previousIndex < 0 ? "disabled" : ""}`}
          >
            <span className="up">
              <Octicon icon={triangleUp} size="medium" />
            </span>
          </Link>

          {/* -------------TASBLE OF HEADINGS--------------- */}
          <section
            // style={{ display: headings.length ? "inline-block" : "none" }}
            className={`tofh2 ${headings.length ? "show-me" : "hide-me"}`}
            css={css`
              width: 100%;
              border: crimson solid 1px;
              display: flex;

              & > * {
                border: yellow solid 1px;
              }

              .show-me {
                display: flex;
              }

              .hide-me {
                display: none;
              }

              @media screen and (max-width: 918px) {
                display: none;

                .show-me {
                  display: none;
                }
              }

              & ul {
                padding: 0;
                width: 100%;
                overflow-y: auto;
                overflow-x: hidden;

                list-style-type: none;
                & li {
                  margin: 2px;
                  margin-left: 20px;

                  &.highlight {
                    /* border: crimson solid 1px; */

                    box-sizing: border-box;

                    &::before {
                      position: absolute;
                      left: 6px;
                      content: "🖇️";
                    }

                    & a {
                      color: crimson;
                      text-decoration-line: underline;
                      text-decoration-color: tomato;
                    }
                  }

                  & a {
                    color: blanchedalmond;

                    text-decoration-line: none;

                    &:hover {
                      color: pink;
                      text-decoration-line: underline;
                      text-decoration-color: olive;
                    }
                  }
                }
              }
            `}
          >
            <ul>
              {headings &&
                headings.length !== 0 &&
                headings.map(({ depth, value }) => (
                  <li
                    className={`${
                      intersectedDivId ===
                      encodeURI(value.toLowerCase())
                        .replace(/%20/g, "-")
                        .replace(/ /g, "-")
                        ? "highlight"
                        : ""
                    }`}
                    key={`${value}-${depth}`}
                  >
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

          <Link
            onClick={() => {
              if (nextDivHkey) {
                setIntersectedDivId(nextDivHkey);
              }
            }}
            to={`${encodeURI(relativeLink)}#${nextDivHkey}`}
            className={`${!nextDivHkey ? "disabled" : ""}`}
          >
            <span className="down">
              <Octicon icon={triangleDown} size="medium" />
            </span>
          </Link>
        </div>
        <div
          className="scroll-to-top"
          role="button"
          tabIndex={0}
          onClick={() => {
            window.scrollTo({
              top: 0,
            });
          }}
          onKeyPress={() => {
            window.scrollTo({
              top: 0,
            });
          }}
        >
          <Octicon icon={arrowUp} size="medium" />
        </div>
      </aside>
    </Fragment>
  );
};
export default JumperButtons;
