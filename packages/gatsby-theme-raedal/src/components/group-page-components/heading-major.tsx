/** @jsx jsx */
import { jsx, Image } from "theme-ui";

import GatsbyImage from "gatsby-image";

import { css } from "@emotion/core";

import { FunctionComponent, useContext, useEffect, useRef } from "react";

import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

const HeadingMajor: FunctionComponent = () => {
  const { groupPageContext } = $_useGroupPageState;

  const { groupPage } = useContext(groupPageContext);

  const {
    name,
    groupColor,
    keywordBorderColor,
    keywordTextColor,
    underlineColor,
    icon,
  } = groupPage; // NAME CE BITI ONO STA JE U TITLE-U

  // === !== === !== === !== === !== === !== === !==
  // NECU KORISTITI VISE  NI    useRef  A NI    useEffect
  /* const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    import(`../../ICONS/devicons-in-use/${name.toLowerCase()}.svg`).then(
      (res) => {
        console.log(res);

        if (imageRef.current) {
          imageRef.current.src = res.default;
        }
      }
    );
  }, [imageRef, name]); */
  // === !== === !== === !== === !== === !== === !==

  // console.log(icon);

  return (
    <div
      className="heading-major"
      css={css`
        display: flex;
        flex-direction: column;

        align-content: center;
        align-items: center;
        justify-content: center;

        & span.devicon {
          border: red solid 0px;
          /* width: min-content; */
        }
      `}
    >
      <span className="devicon">
        <img
          css={css`
            /* width: 3rem; */
            height: 3rem;
            border: pink solid 0px;
            margin-left: auto;
            margin-right: auto;
          `}
          src={`data:image/svg+xml;base64,${icon}`}
          alt="subject-logo"
        />
        {/* OVO JE BILO RANIJE (NE KORISTIM VISE) */}
        {/* <img
          alt="subject-logo"
          ref={imageRef}
          css={css`
            width: 4rem;
            border: pink solid 1px;
          `}
        /> */}
      </span>
      <h1
        css={css`
          
          border: solid 0px white;
          text-align: center;

          & span {
            &.group-name-span {
              text-decoration-line: overline underline;
              text-decoration-style: solid;
              text-decoration-color: ${underlineColor};
              /* border-right: ${groupColor} medium groove; */
              /* border-left: ${groupColor} medium double; */
              font-family: - -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }

            &.emo {
              /* border-right: groove ${underlineColor} thick; */
              /* border-left: groove ${underlineColor} thick; */
              /* border-top: ridge ${underlineColor} thick; */
              /* padding: 4.8px; */
              padding-left: 4px;
              padding-right: 3px;
              
            }
          }
        `}
      >
        All <span className="group-name-span">{name}</span> tutorials
        &nbsp;&nbsp;{" "}
        <span className="emo" role="img" aria-label="img">
          ⬇️
        </span>
      </h1>
    </div>
  );
};

export default HeadingMajor;
