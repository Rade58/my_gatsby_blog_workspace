/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { Link, navigate } from "gatsby";
import {
  useContext,
  useRef,
  useState,
  Fragment,
  useEffect,
  FunctionComponent,
  RefObject,
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
  const { headerBackgroundImage, bodyBackgroundColor } = additionalStyles;
  const { blogPostContext } = $_useBlogPostReducerState;
  const {
    headings,
    relativeLink,
    reducedBlogPostState,
    blogPostDispatch,
    groupPage,
  } = useContext(blogPostContext);

  // console.log({ headingsLength: headings.length });

  const {
    setPigOpacityClassFunc,
    setShowComercial,
    linkIsExecuted,
  } = reducedBlogPostState;

  const { groupColor, underlineColor } = groupPage;

  const [slideClass, setSlideClass] = useState<"slide-left" | "slide-right">(
    "slide-right"
  );

  const triangleUp = getIconByName("triangle-up");
  const triangleDown = getIconByName("triangle-down");
  const arrowUp = getIconByName("arrow-up");

  const [intersectedDivId, setIntersectedDivId] = useState<string>("");
  const [headingIsGoingUp, setHeadingIsGoingUp] = useState<boolean>(false);

  const normalizedHeadingsRef = useRef<{
    [key: string]: { value: string; depth: number };
  }>({});

  const justHeadingsArrayRef = useRef<string[]>([]);

  const [loadArray, setLoadArray] = useState<boolean>(true);

  // ==========================================================
  // ==========================================================
  const [clickedId, setClickedId] = useState<string>("");
  const [isOverTheButtonOrJumper, setIsOverTheButtonOrJumper] = useState<
    boolean
  >(false);

  useEffect(() => {
    setIntersectedDivId(clickedId);
  }, [clickedId]);

  useEffect(() => {
    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_CLICKED_ID,
      payload: setClickedId,
    });
    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_IS_OVER_THE_JUMPER,
      payload: setIsOverTheButtonOrJumper,
    });
  }, [setClickedId, setIsOverTheButtonOrJumper, blogPostDispatch]);

  // console.log({ clickedId, intersectedDivId });

  // ==========================================================
  // ==========================================================

  useEffect(() => {
    let canceled = false;

    if (canceled) return;

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

    // AKO HEADING NAPUSTA INTERSECTION OBSERVER-A

    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_HEADING_IS_GOING_UP,
      payload: setHeadingIsGoingUp,
    });

    // NORMALIZOVANJE     headings    NIZ-A
    headings.forEach((hedingOb) => {
      if (loadArray) {
        normalizedHeadingsRef.current[hedingOb.value] = {
          value: `${encodeURI(hedingOb.value.toLowerCase())
            .replace(/%20/g, "-")
            .replace(/ /g, "-")
            .replace(/'/g, "")
            .replace(/\)/g, "")}`.trim(),
          depth: hedingOb.depth,
        };

        justHeadingsArrayRef.current.push(
          `${encodeURI(hedingOb.value.toLowerCase())
            .replace(/%20/g, "-")
            .replace(/ /g, "-")
            .replace(/'/g, "")
            .replace(/\)/g, "")}`.trim()
        );

        setLoadArray(false);
      }
    });
    /* setTimeout(() => {
      console.log("intersected div");
      setIntersectedDivId("");
    }, 500); */

    return () => {
      canceled = true;
    };
  }, [blogPostDispatch, headings, loadArray]);

  useEffect(() => {
    // console.log(intersectedDivId.length);

    let canceled = false;

    if (canceled) return;

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
            setShowComercial("comercialHid");
          }, 600);
        }, 408);
      });
    }

    return () => {
      canceled = true;
    };
  }, [intersectedDivId.length, setPigOpacityClassFunc, setShowComercial]);

  const [indexOfCurrentIntersHdiv, setIndexOfCurrentIntersHdiv] = useState<
    number
  >(0);

  useEffect(() => {
    setIndexOfCurrentIntersHdiv(
      justHeadingsArrayRef.current.indexOf(intersectedDivId)
    );
  }, [intersectedDivId]);

  useEffect(() => {
    setIndexOfCurrentIntersHdiv(
      justHeadingsArrayRef.current.indexOf(clickedId)
    );
  }, [clickedId]);

  /*  useEffect(() => {
    console.log("----------------------------------------------------");
    console.log(justHeadingsArrayRef.current);
    console.log(indexOfCurrentIntersHdiv);
    console.log(intersectedDivId);
    console.log(clickedId);
    console.log("------------------------------------------------------");
  }, [indexOfCurrentIntersHdiv]);

  useEffect(() => {
    console.log(indexOfCurrentIntersHdiv);
    console.log(clickedId);
  }, [intersectedDivId, clickedId]);
 */
  // -------------------
  //
  useEffect(() => {
    // console.log("ovo se desilo");

    let canceled = false;

    if (canceled) return;

    const indexOfCurrent = justHeadingsArrayRef.current.indexOf(
      intersectedDivId
    );

    if (isOverTheButtonOrJumper) {
      // setClickedId("");
      return;
    }

    // console.log({ headingIsGoingUp, isOverTheButtonOrJumper });

    if (headingIsGoingUp) {
      // console.log("EXECUTED");
      if (indexOfCurrent > 0) {
        const lowerIndex = indexOfCurrent - 1;

        // console.log(justHeadingsArrayRef);

        setIntersectedDivId(justHeadingsArrayRef.current[lowerIndex]);
      }
    } else {
      // setIntersectedDivId(justHeadingsArrayRef.current[indexOfCurrent]);
    }

    return () => {
      canceled = true;
    };
  }, [headingIsGoingUp, isOverTheButtonOrJumper, clickedId]);

  ////////////////////////////////////////==================================/////////////////
  /* useEffect(() => {
    setHeadingIsGoingUp(false);
  }, []); */
  ////////////////////////////////////////==================================/////////////////

  /* if (headingIsGoingUp && indexOfCurrentIntersHdiv !== 0) {
    indexOfCurrentIntersHdiv -= 1;
  }
 */
  /* console.log(indexOfCurrentIntersHdiv);

  console.log({
    norm: normalizedHeadingsRef.current,
    arr: justHeadingsArrayRef.current,
    hs: headings,
    intersectedDivId,
  }); */

  // console.log(headingIsGoingUp);

  const previousIndex: number | undefined =
    indexOfCurrentIntersHdiv - 1 >= 0 ? indexOfCurrentIntersHdiv - 1 : -1;
  const nextIndex: number | undefined =
    indexOfCurrentIntersHdiv + 1 >= 0
      ? indexOfCurrentIntersHdiv + 1
      : indexOfCurrentIntersHdiv;

  /* if (headingIsGoingUp) {
    // kasnije

    previousIndex = 0;
    nextIndex = 0;
  } */

  const prevDivHkey: string = justHeadingsArrayRef.current[previousIndex];
  const nextDivHkey: string = justHeadingsArrayRef.current[nextIndex];

  /* console.log({
    previousIndex,
    nextIndex,
    prevDivHkey,
    nextDivHkey,
  }); */
  // === !== === COUNTER STUFF (CHANGING INSIDE HEADING)
  // DON'T FORGET TO ADD A RESET FOR A COUNTER

  /* console.log("*************** PREV STUFF ******************");
  console.log(prevDivHkey);
  console.log("**********************************************");

  console.log("-------------------- CURR STUFF---------------------");
  console.log(intersectedDivId, indexOfCurrentIntersHdiv);
  console.log("-----------------------------------------");

  console.log("*************** PREV STUFF ******************");
  console.log(nextDivHkey);
  console.log("**********************************************"); */

  return (
    <Fragment>
      <aside
        onMouseMove={() => {
          setClickedId(intersectedDivId);
          setIsOverTheButtonOrJumper(true);
        }}
        onWheel={() => {
          setHeadingIsGoingUp(false);
          setIsOverTheButtonOrJumper(false);
        }}
        onMouseEnter={() => {
          // console.log("ENTERED JUMPER");

          setClickedId(intersectedDivId);
          setIsOverTheButtonOrJumper(true);
        }}
        onMouseLeave={() => {
          // console.log("LEFT JUMPER");

          // setIntersectedDivId(clickedId);
          setHeadingIsGoingUp(false);
          setIsOverTheButtonOrJumper(false);
        }}
        className={`jumper-cont ${slideClass}`}
        css={css`

          /* overscroll-behavior: none; */
          margin-right: 8px;

          /* visibility: hidden; */

          /* border: crimson solid 1px; */
          /* position: fixed;
            top: 200;
            left: 0;
            width: 100%; */
          
          z-index: 200;

          background-color: #20282e88;

          border-radius: 8px;

          /* box-shadow:
          0 2.8px 2.2px rgba(0, 0, 0, 0.02),
          0 6.7px 5.3px rgba(0, 0, 0, 0.028),
          0 12.5px 10px rgba(0, 0, 0, 0.035),
          0 22.3px 17.9px rgba(0, 0, 0, 0.042),
          0 41.8px 33.4px rgba(0, 0, 0, 0.05),
          0 100px 80px rgba(0, 0, 0, 0.07)
          ; */

          /* box-shadow:
          0 0.1px 5.3px rgba(0, 0, 0, 0.51),
          0 0.5px 17.9px rgba(0, 0, 0, 0.355),
          0 2px 80px rgba(0, 0, 0, 0.302)
          ; */

          box-shadow:
            0 0.1px 6.9px -7px rgba(0, 0, 0, 0.087),
            0 0.1px 11.5px -7px rgba(0, 0, 0, 0.187),
            0 0.3px 15.2px -7px rgba(0, 0, 0, 0.357),
            0 0.4px 19.1px -7px rgba(0, 0, 0, 0.43),
            0 0.8px 25.2px -7px rgba(0, 0, 0, 0.477),
            0 2px 40px -7px rgba(0, 0, 0, 0.52)
          ;


          padding-top: 1vh;
          padding-bottom: 1vh;

          display: ${!headings.length ? "none" : "flex"};
          flex-direction: column;

          /* width: max-content; */

          @media screen and (max-width: 918px) {

            background-image: linear-gradient(38deg, rgba(55,61,65,0.6446953781512605) 57%, rgba(88,120,108,0.7315301120448179) 94%);

            border-radius: 14px;

            position: fixed;
            bottom: 8px;
            right: 0;
            left: 85vw;

            transition-property: transform;
            transition-duration: 0.2s;

            &.slide-right {
              transform: translateX(150%);
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
              color: blanchedalmond;
              margin-left: auto;
              margin-right: 46%;


              &:active {
                color: ${underlineColor};
              }

              @media screen and (min-width: 918px) {
              /* background-color: ${"#1b2227c9"}; */

                &:hover {
                  opacity: 0.8;
                  color: ${underlineColor};
                }
              /* margin-top: 2vh; */

              }

              &.disabled {
                /* display: none; */
                pointer-events: none;
                opacity: 0.2;
                cursor: not-allowed;

                &:hover {
                  cursor: not-allowed;
                }

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
              color: crimson;
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
            margin-right: 4px;

            @media screen and (max-width: 918px) {
              border: 0px solid ${underlineColor};
              background-color: ${"#1b2227c9"};

              margin-left: auto;
              margin-right: auto;

              margin-top: 1vh;
            }

                /* ---------------------------------------- */
            
            &:active {
              color: ${underlineColor};
            }

            @media screen and (min-width: 918px) {
            /* background-color: ${"#1b2227c9"}; */

              &:hover {
                opacity: 0.8;
                color: ${underlineColor};
              }
            /* margin-top: 2vh; */

            }

              /* ---------------------------------------- */

            cursor: pointer;

            & > * {
              margin: 4px;
            }

          }

          & div.medium-separ {
            
            background-image: ${headerBackgroundImage};
            background-color: blanchedalmond;
            height: 2px;
            width: 48%;

            border-radius: 1px;

            @media screen and (max-width: 918px) {
              &:nth-of-type(1) {
                margin-top: 2vh;
              }
            }
            @media screen and (max-width: 918px) {
              &:nth-of-type(2) {
                margin-bottom: 2vh;
              }
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
            <span className="ha">&nbsp;&nbsp;&nbsp;&nbsp;#</span>{" "}
            <span className="boo" role="img" aria-label="book">
              📖
            </span>
          </span>
          <Link
            onClick={() => {
              setTimeout(() => {
                setPigOpacityClassFunc("is-opaque");
                setShowComercial("comercialVis");
              }, 600);
              if (prevDivHkey) {
                // setIntersectedDivId(prevDivHkey);
                setClickedId(prevDivHkey);
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
              /* background-color: ${"#1b2227c9"}; */

              /* margin-top: 2vh; */

            }

            & > a {

              color: blanchedalmond;


              &:active {
                color: ${underlineColor};
              }
              
              @media screen and (min-width: 918px) {
              /* background-color: ${"#1b2227c9"}; */

                &:hover {
                  opacity: 0.8;
                  color: ${underlineColor};
                }
              /* margin-top: 2vh; */

              }


              @media screen and (max-width: 918px) {
                color:  crimson;

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

              position: relative;

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
                /* -------- SCROLLBAR -------- */

                --scrollbarBackgroundColor: #d48ea5;
                --thumbBackgroundColor: #423b3d;

                &::-webkit-scrollbar {
                  width: 8px;
                }

                scrollbar-width: thin;
                scrollbar-color: var(--thumbBackgroundColor)
                  var(--scrollbarBackgroundColor);

                &::-webkit-scrollbar-track {
                  background-color: var(--scrollbarBackgroundColor);
                  border-radius: 6px;
                }

                &::-webkit-scrollbar-thumb {
                  background-color: var(--thumbBackgroundColor);
                  border-radius: 4px;
                  border: var(--scrollbarBackgroundColor) solid 2px;
                }

                /* === !== === !== === !== === !== === */

                padding: 0;
                width: 100%;
                overflow-y: auto;
                overflow-x: hidden;

                list-style-type: none;
                & li {
                  margin: 2px;
                  margin-left: 20px;
                  display: flex;

                  /* background-color: rgb(89, 70, 92); */
                  background-image: linear-gradient(
                    133deg,
                    rgba(42, 49, 56, 0.9051995798319328) 13%,
                    rgba(89, 70, 92, 0.05085784313725494) 85%
                  );

                  /* & div.small-separ {
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
                  } */

                  &::before {
                    position: relative;
                    left: -14px;
                    content: "🖇️";
                    visibility: hidden;
                    margin-right: 4px;
                  }

                  &.highlight {
                    /* border: crimson solid 1px; */

                    box-sizing: border-box;

                    &::before {
                      position: relative;
                      left: -14px;
                      content: "🖇️";
                      visibility: visible;
                      margin-right: 4px;
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
                    display: flex;
                    height: min-content;

                    &:hover {
                      color: ${underlineColor};
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
                // setIntersectedDivId(nextDivHkey);
                setClickedId(nextDivHkey);
              }
              setTimeout(() => {
                setPigOpacityClassFunc("is-opaque");
                /* console.log(
                  "pig is opaque",
                  JSON.stringify(setPigOpacityClassFunc, null, 2),
                  setPigOpacityClassFunc
                ); */
                setShowComercial("comercialVis");
              }, 600);
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
          css={css`
            border: crimson solid 0px;

            @media screen and (max-width: 600px) {
              margin-bottom: -6px;
            }
          `}
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
                  setShowComercial("comercialHid");
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
                  setShowComercial("comercialHid");
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
