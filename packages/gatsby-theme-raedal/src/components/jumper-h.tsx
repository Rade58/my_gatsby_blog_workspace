/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
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

  // const frameRef = useRef<HTMLDivElement>(null);
  // const frameIsObserved = useState<boolean>(false);
  // console.log({ mainReference, articleReference });

  // JA CU IMATI VISE OBSERVER-A
  // A ZASTO IH OVDE DEFINISEM ?
  // DA BIH MOUGAO DA OBAVIM      UNOBSERVING
  // ODNONO SKIDANJE OBSERVERA
  // STO CU DEFINISATI KADA SE DOGODI UNMOUNTING KOMPONENTE
  const interObservers = useRef<IntersectionObserver[]>([]); // ZA POCETAK JE OVO PRAZAN NIZ
  //                                                              NE MORAM OVO DA STAVLJAM KAO
  //                                                              DEPAENDANCY ZA useEffect

  useEffect(() => {
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

      // ESLINT MI SAVETUJE DA UMESTO     for of   PETLJE KORISTIM
      //  forEach

      headings.forEach((headingDiv) => {
        interObservers.current.push(
          new IntersectionObserver((entries, observer) => {
            console.log({ entries, observer });
          }, options)
        );
      });

      // OVDE KACIM OBSERVER-A
      for (let i = 0; i < headings.length; i += 1) {
        interObservers.current[i].observe(headingDivs[i]);
      }
    }
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
