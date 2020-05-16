/** @jsx jsx */
import { jsx, Image } from "theme-ui";

import { css } from "@emotion/core";

import { FunctionComponent, useContext, useEffect, useRef } from "react";

import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

const HeadingMajor: FunctionComponent = () => {
  const { groupPageContext } = $_useGroupPageState;

  const { groupPage } = useContext(groupPageContext);

  const { name, groupColor, keywordBorderColor, keywordTextColor } = groupPage; // NAME CE BITI ONO STA JE U TITLE-U
  // DOBRA IDEJA JE DA OVDE STAVIS I EMOJI
  // ODNOSNO SVAKI PAGE TREBA DA IMA KARAKTERISTICAN EMOJI

  // console.log({ keywordBorderColor, keywordTextColor });

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    import(`../../ICONS/devicons-in-use/${name.toLowerCase()}.svg`).then(
      (res) => {
        console.log(res);

        if (imageRef.current) {
          imageRef.current.src = res.default;
        }
      }
    );
  }, [imageRef, name]);

  return (
    <div
      className="heading-major"
      css={css`
        display: flex;
        flex-direction: row;
      `}
    >
      {/* <Image /> */}
      <span>
        <img
          alt="subject-logo"
          ref={imageRef}
          css={css`
            width: 4rem;
            border: pink solid 1px;
          `}
        />
      </span>
      <h1
        css={css`
          margin-left: auto;
          margin-right: auto;

          & span {
            &.group-name-span {
              text-decoration-line: overline underline;
              text-decoration-style: solid;
              text-decoration-color: ${groupColor};
              /* border-right: ${groupColor} medium groove; */
              /* border-left: ${groupColor} medium double; */
              font-family: - -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }

            &.emo {
              border-right: groove ${groupColor} thick;
              border-left: groove ${groupColor} thick;
              border-top: ridge ${groupColor} thick;
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
