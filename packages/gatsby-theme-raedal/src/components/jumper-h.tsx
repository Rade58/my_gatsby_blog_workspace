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

  // MORAM KREIRATI DICTIONARY TYPE, ZA NORMALIZED hedaings OBJEKAT
  const normalizedHeadingsRef = useRef<{
    [key: string]: { value: string; depth: number };
  }>({}); // OVAJ REF CE DOBITI U useEffect-U (SAMO ON MOUNTING, SVE STA MU TREBA)

  // MORAO BIH KREIRATI I NIZ NAPRAVLJEN SAMO OD HEADINGS STRINGOVA
  const justHeadingsArrayRef = useRef<string[]>([]);

  const [loadArray, setLoadArray] = useState<boolean>(true);

  useEffect(() => {
    blogPostDispatch({
      type: BLOG_POST_ACTION_TYPES_ENUM.GIVE_SET_JUMPER_STATE,
      payload: setIntersectedDivId,
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
    indexOfCurrentIntersHdiv - 1 >= 0
      ? indexOfCurrentIntersHdiv - 1
      : undefined;
  const nextIndex: number | undefined =
    indexOfCurrentIntersHdiv + 1 >= 0
      ? indexOfCurrentIntersHdiv + 1
      : undefined;

  const prevDivHkey: string | undefined = previousIndex
    ? justHeadingsArrayRef.current[previousIndex]
    : undefined;
  const nextDivHkey: string | undefined = nextIndex
    ? justHeadingsArrayRef.current[nextIndex]
    : undefined;

  console.log({
    previousIndex,
    nextIndex,
    prevDivHkey,
    nextDivHkey,
  });

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
        <div
          className="h-changer"
          css={css`
            & a {
              color: blanchedalmond;

              &.disabled {
                /* display: none; */
                pointer-events: none;
                opacity: 0.2;
              }
            }
          `}
        >
          <Link
            onClick={() => {
              if (previousIndex && prevDivHkey) {
                setIntersectedDivId(prevDivHkey);
              }
            }}
            to={`${encodeURI(relativeLink)}#${prevDivHkey}`}
            className={`${!prevDivHkey ? "disabled" : ""}`}
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
                  &.highlight {
                    outline: crimson solid 1px;
                  }
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
              if (nextIndex && nextDivHkey) {
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
        <div className="scroll-to-top">
          <Octicon icon={arrowUp} size="medium" />
        </div>
      </aside>
    </Fragment>
  );
};
export default JumperButtons;
