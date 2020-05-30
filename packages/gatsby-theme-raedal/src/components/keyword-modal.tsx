/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { useState, useContext, useEffect, FunctionComponent } from "react";
import Octicon, { getIconByName } from "@primer/octicons-react";
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";

export interface IndividualKeywordI {
  name: string;
  path: string;
  icon: string;
}

export interface KeywordModalPropsI {
  keywords: IndividualKeywordI[];
}

const KeywordModal: FunctionComponent<KeywordModalPropsI> = ({ keywords }) => {
  const {
    BLOG_POST_ACTION_TYPES_ENUM,
    blogPostContext,
  } = $_useBlogPostReducerState;

  const { reducedBlogPostState, blogPostDispatch, groupPage } = useContext(
    blogPostContext
  );
  const { groupColor } = groupPage;

  const { keywordModalIsShown } = reducedBlogPostState; // OVO MOZDA I NECE TREBATI, JER SAM GA ISKORISTIO ON MOUNTING

  const [transitionClass, setTransitionClass] = useState<
    "make-transition-front" | "make-transition-back"
  >("make-transition-back");

  const xocticon = getIconByName("x");

  useEffect(() => {
    // === !== === !==      MOUNTING

    console.log("TABLE OF KEYWORDS");
    /* Promise.resolve().then(() => {
      setTransitionClass("make-transition-front");
    }); */

    setTimeout(() => {
      setTransitionClass("make-transition-front");
    }, 1);
  }, []); // KAD JE SAMO KOD MOUNTINGA PRAZNA NIZ
  // (A AKO ZELIM DA SE EFFECT CALLBACK IZVRSI PRI SVAKOJ PROMENI STATE-A, PRI SVAKOM RERENDER-U, ONDA
  // NE STAVLJAM NISTA, KAO DRUGI ARGUMENT)

  useEffect(() => {
    // === !== ===          CLAENING OUT

    let a;

    return () => {
      console.log("UNMOUNTING TABLE OF KEYWORDS");
    };
  }, []);

  return (
    <div
      className={`keywords-of-modal ${transitionClass}`}
      // style={{ display: keywordModalIsShown ? "block" : "none" }}
      css={css`
        background-image: linear-gradient(
          to right,
          rgb(63, 44, 56, 0.9),
          rgb(38, 45, 59, 0.9)
        );

        display: flex;
        flex-direction: column;

        /* transform: translateY(101%); */
        position: fixed;
        /* width: 100%; */
        /* height: 100%; */
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        /* width: 100%; */

        transition-property: transform;
        transition-duration: 0.4s;

        /* background-color: #1b2227; */
        /* background-color: transparent; */
        background-color: #1b2227de;
        z-index: 2000;

        &.make-transition-front {
          transform: translateY(0%);
        }

        &.make-transition-back {
          transform: translateY(101%);
        }

        /*----------------------------------------*/

        & div.octx {
          border: red solid 1px;
          display: flex;
          justify-content: flex-end;
          & span {
            color: ${groupColor};
            margin-top: 8px;
            margin-right: 8px;
          }
        }

        /*----------------------------------------*/

        /* === NEKA UNORDERED LIST BUDE FLEX CONTAINER !== */
        & ul {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          height: 80vh;

          border: tomato solid 1px;
          /* align-items: center; */
          padding-left: 0;

          & li {
            list-style-type: none;
            display: flex;
            justify-content: center;

            border: olive solid 1px;

            & a {
              text-decoration-line: none;
              display: flex;
              align-items: center;

              border: tomato solid 1px;
              width: fit-content;

              /* margin-left: 10vw; */

              & span[role="img"] {
                & img {
                  height: 1.5rem;
                  margin-right: 2rem;
                  /* margin-top: 4px; */
                }
              }

              & span.group-name {
                color: blanchedalmond;
              }
            }
          }
        }
      `}
      tabIndex={-1}
      role="button"
      onClick={() => {
        setTransitionClass("make-transition-back");
        setTimeout(() => {
          blogPostDispatch({
            type: BLOG_POST_ACTION_TYPES_ENUM.KEYWORD_MODAL_TOGGLE,
            payload: false,
          });
        }, 1000);
      }}
      onKeyPress={() => {
        setTransitionClass("make-transition-back");
        setTimeout(() => {
          blogPostDispatch({
            type: BLOG_POST_ACTION_TYPES_ENUM.KEYWORD_MODAL_TOGGLE,
            payload: false,
          });
        }, 1000);
      }}
    >
      <div className="octx" role="img" aria-label="close">
        <span>
          <Octicon size="medium" icon={xocticon} />
        </span>
      </div>
      <ul>
        {keywords.map(({ name, path, icon }) => (
          <li>
            <Link to={path} key={name}>
              <span role="img" aria-label={name}>
                <img
                  src={`data:image/svg+xml;base64,${icon}`}
                  alt="subject icon"
                />
              </span>
              <span className="group-name">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordModal;
