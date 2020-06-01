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
  articleReference: RefObject<HTMLElement>;
}

const JumperButtons: FunctionComponent<JumperPropsI> = ({
  mainReference,
  articleReference,
}) => {
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

  const [currentId, setCurrentId] = useState<string>("");

  const [previousBodyScrollHeight, setPreviousBodyScrollHeight] = useState<
    number
  >(0);

  const [mountingTrigger, setMountingTrigger] = useState(false);

  const interObservers = useRef<IntersectionObserver[]>([]);

  console.log(interObservers.current);

  useLayoutEffect(() => {
    console.log("=== !==");
    console.log({ artRef: articleReference.current, headings });
    console.log("=== !==");

    // AKO NEMA NIJEDNOG HEDING DIV-A NE TREBAM NISTA I DA DEFINISEM
    if (articleReference.current && headings.length) {
      // UZEO SAM SVE    ELEMENTE KOJI IMAJU NESTED     h2    (U body-JU)
      // MISLIM NA BODY PARSED BY     MDXRenderer
      const headingDivs = articleReference.current.querySelectorAll(
        "div.heading-above"
      );

      /*
      console.log(headings);
      console.log(relativeLink);
      */

      // OPTIONS CE BITI ISTE ZA SVAKOG OD OBSERVER-A

      const options = {
        root: null, //        document.documentElement   SAM PRVOG STAVIO OVDE ALI TO
        //                                                NIJE FUNKCIONISALU
        //                    U SUSTINI     null      SE ODNOSI NA   VIEWPORT
        rootMargin: "0px",
        threshold: 1.0,
      };

      // IMACU VISE OBSERVER-A
      // CILJ JE SVAKOM DA OBSERV-UJU                 INTERSECTION
      //                                                   ROOT-A (VIEWPORT-A)
      //                                                      I    JEDNOG h2 HEADING DIV-A

      // OVO TREBA DA BUDE U STATE-U

      // ESLINT MI SAVETUJE DA UMESTO     for of   PETLJE KORISTIM
      //  forEach

      headings.forEach((headingDiv) => {
        interObservers.current.push(
          new IntersectionObserver((entries, observer) => {
            // console.log({ entries, observer, intersectedDivId });

            // console.log(entries[0].target.id);

            // console.log(`#${entries[0].target.id}`);

            // console.log({ entries, observer });

            console.log(entries[0]);

            if (
              currentId !== entries[0].target.id &&
              entries[0].isIntersecting
            ) {
              setCurrentId(entries[0].target.id);
            }

            /* blogPostDispatch({
              type: BLOG_POST_ACTION_TYPES_ENUM.INTERSECTION,
              payload: `#${entries[0].target.id}`,
            }); */
          }, options)
        );
      });

      // OVDE KACIM OBSERVER-A
      for (let i = 0; i < headings.length; i += 1) {
        interObservers.current[i].observe(headingDivs[i]);
      }
    }
  }, []);

  // RANDOM MOUNTINGZ

  /* useEffect(() => {
    console.log("RANDOM MOUNTINGZ");
  }); */

  //
  // unmounting
  //

  useEffect(() => () => {
    console.log("JUMPER UNMOUNTED!!!!");

    // setMountingTrigger(!mountingTrigger);
  });

  return (
    <Fragment>
      {!headings.length ? null : (
        <aside
          className="jumper-cont"
          css={css`
            /* visibility: hidden; */

            /* border: crimson solid 1px; */
            /* position: fixed;
            top: 200;
            left: 0;
            width: 100%; */

            & .show-me {
              display: inline-block;
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
          {currentId}
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
              `}
            >
              <ul>
                {headings &&
                  headings.length !== 0 &&
                  headings.map(({ depth, value }) => (
                    <li key={`${value}-${depth}`}>
                      <Link
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
      )}
    </Fragment>
  );
};
export default JumperButtons;
