/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link, navigate } from "gatsby";
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

import JumperUL from "./jump-ul";

import { additionalStyles } from "../common-styles";

interface JumperPropsI {
  mainReference: RefObject<HTMLElement>;
  articleReference?: RefObject<HTMLElement>;
}

const JumperButtons: FunctionComponent<JumperPropsI> = ({ mainReference }) => {
  const { headerBackgroundImage } = additionalStyles;
  const { blogPostContext } = $_useBlogPostReducerState;
  const {
    headings,
    relativeLink,
    reducedBlogPostState,
    blogPostDispatch,
    groupPage,
  } = useContext(blogPostContext);

  const { setPigOpacityClassFunc } = reducedBlogPostState;

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
    // console.log("JUMPER MOUNTED");
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
      // console.log("JUMPER UNMOUNTED!!!!");
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

  // console.log(normalizedHeadingsRef.current);

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
        normalizedHeadingsRef.current[hedingOb.value] = {
          value: `${encodeURI(hedingOb.value.toLowerCase())
            .replace(/%20/g, "-")
            .replace(/ /g, "-")
            .replace(/'/g, "")}`.trim(),
          depth: hedingOb.depth,
        };

        justHeadingsArrayRef.current.push(
          `${encodeURI(hedingOb.value.toLowerCase())
            .replace(/%20/g, "-")
            .replace(/ /g, "-")
            .replace(/'/g, "")}`.trim()
        );

        setLoadArray(false);
      }
    });
    /* setTimeout(() => {
      console.log("intersected div");
      setIntersectedDivId("");
    }, 500); */
  }, []);

  useEffect(() => {
    // console.log(intersectedDivId.length);

    if (!intersectedDivId.length) {
      const promise = new Promise((res, rej) => {
        window.scrollTo({ top: 0 });

        setTimeout(() => {
          res();
        }, 406);
      }).then(() => {
        setTimeout(() => {
          setIntersectedDivId("");

          // console.log("pig-opacity");

          setTimeout(() => {
            setPigOpacityClassFunc("not-opaque");
          }, 100);
        }, 408);
      });
    }
  }, [setPigOpacityClassFunc]);

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

  /* console.log({
    previousIndex,
    nextIndex,
    prevDivHkey,
    nextDivHkey,
  }); */

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
              transform: translateX(100%);
            }

            &.slide-left {
              transform: translateX(0%);
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
            border: olive solid 0px;
            display: flex;
            justify-content: space-evenly;

            & > a {
              margin-left: auto;
              margin-right: 46%;

              color: blanchedalmond;

              &:active {
                color: crimson;
              }

              &.disabled {
                /* display: none; */
                pointer-events: none;
                opacity: 0.2;
                cursor: not-allowed;
              }
            }

            @media screen and (max-width: 918px) {
              & span.ha {
                display: none;
              }

              & span.boo {
                display: none;
              }

              & > a {
                margin-left: auto;
                margin-right: auto;
              }
            }

            & > span {
              /* margin-right: auto; */

              justify-self: flex-start;
              & span.ha {
                color: crimson;
              }
            }
          }

          & div.scroll-to-top {
            width: fit-content;
            margin-left: auto;
            border-radius: 12px;

            @media screen and (max-width: 918px) {
              border: 2px solid ${underlineColor};
              background-color: ${"#1b2227c9"};

              margin-left: auto;
              margin-right: auto;
            }

            cursor: pointer;

            & > * {
              margin: 4px;
            }
          }

          & div.medium-separ {
            background-image: ${headerBackgroundImage};
            background-color: blanchedalmond;
            height: 2px;
            width: 80%;
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
            <span className="ha">#</span>{" "}
            <span className="boo" role="img" aria-label="book">
              📖
            </span>
          </span>
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
        </div>
        <div
          className="h-changer"
          css={css`
            border: yellow solid 0px;
            display: flex;
            flex-direction: column;

            align-items: center;

            @media screen and (max-width: 918px) {
              background-color: ${"#1b2227c9"};
            }

            & > a {
              color: blanchedalmond;

              &:active {
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
          <div className="medium-separ" />

          {/* -------------TASBLE OF HEADINGS--------------- */}
          <section
            // style={{ display: headings.length ? "inline-block" : "none" }}
            className={`tofh2 ${headings.length ? "show-me" : "hide-me"}`}
            css={css`
              width: 100%;
              border: crimson solid 0px;
              display: flex;

              & > * {
                border: yellow solid 0px;
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

                  & div.small-separ {
                    height: 1px;
                    width: 98%;
                    padding: 0;
                    margin: 0;
                    margin-left: auto;
                    margin-right: auto;
                    background-color: blanchedalmond;
                    background-image: linear-gradient(
                      to right,
                      #e4afcb 0%,
                      #b8cbb8 0%,
                      #b8cbb8 0%,
                      #e2c58b 30%,
                      #c2ce9c 64%,
                      #7edbdc 100%
                    );
                  }

                  &.highlight {
                    /* border: crimson solid 1px; */

                    box-sizing: border-box;

                    &::before {
                      position: relative;
                      left: -6px;
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
            <JumperUL
              intersectedDivId={intersectedDivId}
              normalizedHeadings={normalizedHeadingsRef.current}
              relativeLink={relativeLink}
              setIntersectedDivId={setIntersectedDivId}
            />
          </section>
          <div className="medium-separ" />
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
          {/* === !== ===  SAMO PROVERAVAM DA LI CE FUNKCIONISATI  !== === */}
          {/* <a
            onClick={() => {
              if (nextDivHkey) {
                setIntersectedDivId(nextDivHkey);
              }
            }}
            className={`${!nextDivHkey ? "disabled" : ""}`}
            href={`#${nextDivHkey}`}
          >
            <span className="down">
              <Octicon icon={triangleDown} size="medium" />
            </span>
          </a> */}
          {/* === !== === !== === */}
        </div>
        <div
          className="scroll-to-top"
          role="button"
          tabIndex={0}
          onClick={() => {
            let a;
            return new Promise((res, rej) => {
              window.scrollTo({
                top: 0,
              });
              res();
            })
              .then(() => {
                let b;

                return new Promise((resolve, rject) => {
                  setTimeout(() => {
                    // console.log(window.location);

                    navigate(relativeLink);
                    setIntersectedDivId("");
                    resolve();
                  }, 800);
                });
              })
              .then(() => {
                setTimeout(() => {
                  setPigOpacityClassFunc("not-opaque");
                }, 1000);
              });
          }}
          onKeyPress={() => {
            let a;
            return new Promise((res, rej) => {
              window.scrollTo({
                top: 0,
              });
              res();
            })
              .then(() => {
                let b;

                return new Promise((resolve, rject) => {
                  setTimeout(() => {
                    navigate(relativeLink);

                    setIntersectedDivId("");
                    resolve();
                  }, 800);
                });
              })
              .then(() => {
                setTimeout(() => {
                  setPigOpacityClassFunc("not-opaque");
                }, 1000);
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
