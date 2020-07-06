/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import {
  // useContext,
  // useLayoutEffect,
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useCallback,
} from "react";

// EVO UVEZAO SAM LOADABLE
import loadable from "@loadable/component";
//

import theme from "prism-react-renderer/themes/palenight";

// === !===

import {
  // defaultProps,
  // Prism,
  Language,
  PrismTheme,
  RenderProps, // !== === !== ===   MORAS DA IZVEZES OVAJ TYPE (DOK NE NADJES BOLJE RESENJE)
  // DefaultProps,
} from "prism-react-renderer";
// GORNJI RenderProps  SAM UVEZAO NA HACKABLE NACIN TAK OSTO SAM OTISAO
// U TYPE DEFINITION I IZVEZAO GA (AKO IKADA UPDATE-UJES TYPE DEF ZA LOADABLE,
// OPET CE TYPESCRIPT YELL-OVATI NA TEBE)
// === !===
// === !===
// === !===
import styled from "@emotion/styled";
// === !===
// === !===
// === !===

import preToCodeBlock from "../../utility/preToCodeBlock";

/* import { $_useReducerState } from "../../context_n_reducers/context_n_reducer_header";
import { $_useBlogPostReducerState } from "../../context_n_reducers/context_n_reducer_blog_post"; */

// === !===
// console.log(theme);

// === !===

// A SADA CU DA KORISTIM LOADABLE
const LazyPrismHighlighter = loadable(async () => {
  const PrismModule = await import("prism-react-renderer");

  const Highlight = PrismModule.default;

  const { defaultProps } = PrismModule;

  // DA POKUSAM DA WRAPP-UJEM      Highlight        INTO STYLED COMPONENT
  const StyledHighlight = styled(Highlight)`
    [data-language] {
      border: blanchedalmon solid 2px;
    }
  `;
  // I KORISTICU StyledHighlight UMESTO Highlight

  const LazyPrismHighlight: FunctionComponent<{
    language: Language;
    code: string;
    theme: PrismTheme;
    children: (props: RenderProps) => ReactNode;
    // metastring?: string;
  }> = (props) => {
    // IZ PROP-A CU IZDVOJITI metastring

    const { code, language, children /*, metastring */ } = props;

    // console.log(metastring);

    // === !== === !== === !==
    // const { ACTION_TYPES_ENUM, headerContext } = $_useReducerState;

    // const { headerDispatch } = useContext(headerContext);

    // const {
    //   BLOG_POST_ACTION_TYPES_ENUM,
    //   blogPostContext,
    // } = $_useBlogPostReducerState;

    // const { blogPostDispatch } = useContext(blogPostContext);

    /* useLayoutEffect(() => {
      console.log("*********USE LAYOUT EFFECT**********");

      const bodyEl = document.body || document.getElementsByTagName("body")[0];

      // console.log(bodyEl.scrollHeight);

      headerDispatch({
        type: ACTION_TYPES_ENUM.CHANGE_BODY_HEIGHT,
        payload: bodyEl.scrollHeight,
      });

      // blogPostDispatch
    }, []); */

    return (
      <Highlight
        {...props}
        {...defaultProps}
        code={code}
        language={language}
        theme={theme}
      >
        {children}
      </Highlight>
    );
  };

  return LazyPrismHighlight;
});

const Code: FunctionComponent<{
  metastring?: string;
  children: { props: { metastring?: string } };
}> = (props) => {
  //

  useEffect(
    () => () => {
      console.log("CODE UNMOUNTING!");
    },
    []
  );

  //

  // console.log({ props });

  const codeProps = preToCodeBlock(props);

  // === !== pre REF === !== ===
  const preRef = useRef<HTMLPreElement>(null);
  // ===========================

  if (!codeProps) {
    return <pre {...props} ref={preRef} />;
  }

  const { codeString, language } = codeProps;

  // EVO ODAVDE MOGU POCERI SA DEFINISANJEM HIGHLIGHTIMGOM
  // SPECIFIC LINE-OVA UZ POMOC     metastring     -A
  //    METASTRING CU IZDVOJITI IZ   prps  -A

  // I SVE SLEDECU CU DEFINISATI SAMO U SLUCAJU AKO POSTOJI
  // metastring
  // ODNONO AKO JE PISAC CODEBLOCKS-A U MDX, DODAO NESTO UZ
  // CODE BLOCK   (NARAVNO JA CU TRAZITI     "{1,1,4,5,7,8-12,28-34}"   ) (ODNONO NESTO U TOM FORMATU)
  // (NAPOMINJEM TI OPET DA JE U PITANJU SAMO TO STO JE PRIDODATO
  // CODEBLOCK-U (SAMO JE TO DOSTUPNO KROZ   metastring   ))

  const REG = /\{([\d-,]+)\}/g;

  // FORMIRACU REGEXP ZA PRONALAZENJE ONOGA STA SE NALAZI IZMEDJU      (      I      )

  const codePathREG = /\(([\w\d\W/]+)\)/; // POTREBNO JE MAETASTRING MATCH-OBVATI SA OVIM
  //                                          I UZETI PRVI CAPTURING GROUP     A TO JE   [1]

  // **************  NO NUMBERS , NO LANG, FIND CODE PATH********************************************************
  // ***********************************************************************************
  /**
   *
   * @param meta OVO JE metastring, KOJ INARAVNO STOJI UZ CODE BLOCK
   * @description UPOREDI OVO SA METASTRING-OM, I AKO JE TRUE, NECE BITI PRIKAZANI, LINE NUMBERS
   */
  const nonum = (meta: string) => {
    if (!meta) return false;

    return meta.includes("//nonum\\"); // OVO NIJE REGEXP
  };
  /**
   *
   * @param meta OVO JE metastring, KOJ INARAVNO STOJI UZ CODE BLOCK
   * @description AKO JE ZADATO " " ZA language ONDA CE RETURNOVATI TRUE (OVO JE PRVENSTVANO DEFINISANO JER **OVO JE JEDINI NACIN DA KORISTIM metastring A DA NISAM DEFINISAO LANGUAGE**)
   */
  const nolang = (lang: string) => {
    if (lang === "_") {
      return true;
    }

    return false;
  };

  /**
   *
   * @param meta OVO JE metastring, KOJ INARAVNO STOJI UZ CODE BLOCK
   * @description TREBA DAKLE DA DA false AKO NEMA MATCH-A, I TREBA DA DA STRING AKO IMA MATCH-A;
   * I NA OSNOVU OVE FUNKCIJE TREBA DA SE ZADA ILI NE ZADA ATRIBUT NA CODE BLOK-U
   * (NA PRIMER U data-code-path)
   * AKO JE FALSE U PITANJU ATRIBUT BI TREBALO DA IMA VREDNOST NULA (0)
   * NA OSNOVU TE DVE VREDNOSTI TI MOZES DEFINISATI GENERISANJE SADRZINE ILI NE
   * ALI TO VEZANO ZA CSS SAM URADIO U GLOBALNI MSTILOVIMA U packages/gatsby-theme-raedal/src/components/layout.tsx
   * @returns path string | false
   */
  const takeCodePath = (meta: string) => {
    if (!meta) return false;

    const arr = meta.match(codePathREG);

    if (!arr) return false;

    return arr[1];
  };

  // ***********************************************************************************
  // ***********************************************************************************

  // DA IZDVOJIM ODMAH I metastring     (POSTOJI MOGUCNOST DA SE ON NALAZI NA   children-U, ODNONO NJEGOVIM PROPS-IMA)

  // eslint-disable-next-line
  const metastring = props.metastring || props.children.props.metastring;
  // console.log({ metastring });
  // DEFINISACU FUNKCIJU, KOJOJ JE
  // CILJ DA OBEZBEDI NIZ, U KOJEM CE SE NALAZITI DAKLE BROJEVI SVIH
  // REDOVA KOJI SE TREBAJU HIGHLIGH-OVATI

  // SADA DA DEFINISEM I FUNKCIJU

  const takeLineNumbersToHighlight = (meta: string | undefined) => {
    if (meta && REG.exec) {
      const arrayOfEntities = REG.exec(meta);

      const matchString: string =
        arrayOfEntities && arrayOfEntities.length > 1 ? arrayOfEntities[1] : "";

      // NISU PREDVIDJENA PRAZNA MESTA, TAK ODA VODI RACUNA DA IH NE STAVLJAS
      // PRI PISANJU U MDX FAJLU

      const arrayWithoutComma: string[] = matchString.split(",");

      const splittedArrayOfNumbers: number[] = [];
      const nonSplittedArrayOfNumbers: number[] = [];

      const arr = arrayWithoutComma.forEach((stringVal) => {
        if (stringVal.includes("-")) {
          const splittedArr = stringVal.split("-");
          const one = parseInt(splittedArr[0], 10);
          const two = parseInt(splittedArr[1], 10);

          if (one > two) {
            throw new RangeError(
              `you cant specify range of line in backwards manner (JA NAPRAVIO ERROR)---${one} doesn't go before ${two}`
            );
          }

          for (let i = one; i <= two; i += 1) {
            splittedArrayOfNumbers.push(i);
          }
        } else {
          nonSplittedArrayOfNumbers.push(parseInt(stringVal, 10));
        }
      });

      return splittedArrayOfNumbers.concat(nonSplittedArrayOfNumbers);
    }

    return [];
  };

  const lineNumbersToHighlightArray = takeLineNumbersToHighlight(metastring);

  const findLineNumber = (iterator: number) =>
    lineNumbersToHighlightArray.some((member) => member === iterator);

  // console.log(lineNumbersToHighlightArray);
  /** */
  // nolang(metastring);

  // SADA TI NE MOZES DIREKTNO DA OSTAVLJAS     style   ATRIBUT
  // NA DONJI div KAKO BI STILIZOVAO SPECIFIC LINE
  // MORAS TO URADITI PUTEM KLASE

  // UGLAVNOM MORAO SI DODATI KLASU LINE PROPSIMA I ONDA PROSLEDITI LINE PROPSE
  // DIV-U

  return (
    <LazyPrismHighlighter code={codeString} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        //  EVO TI CES OVDE UPRAVO KORISTII VARIANT KOJI SE ZOVE
        // prism-highlight (OVO SAM REKAO DAVNO RANIJE)
        <div
          onKeyDown={(e) => {
            const left = 37;
            const right = 39;
            const preEl = (e.target as HTMLDivElement).querySelector("pre");

            if (preEl?.offsetWidth !== preEl?.scrollWidth) {
              if (e.keyCode === left) {
                // console.log(preEl);

                preEl?.scrollBy(-10, 0);
              }

              if (e.keyCode === right) {
                // console.log(preEl);

                // console.log(preEl?.offsetWidth);

                // console.log(preEl?.scrollWidth);

                preEl?.scrollBy(10, 0);
              }
            }
          }}
          tabIndex={0}
          role="button"
          className="language-styles"
          css={css`
            /* CISTO DA ZNAS DA TI SE SLEDECE NALAZI  U     packages/gatsby-theme-raedal/src/components/layout.tsx    (U GLOBAL STILOVIMA)  */
            /*[data-language] {
              border: red solid 1px;

              &::before {
                content: attr(data-language);
                display: inline-block;
              }
            }*/
            /*  JER IZ NEKOG RAZLOGA KADA GA DEFINISEM OVDE NE RADI  */
            /* --------------------------------------- */
            margin-left: 8px;
            outline: none;

            /* OVO CE BITI KLASA KOJA HIGHLIGHT-UJE SPECIFIC LINE */
            .highlight-specific-line {
              background-color: #d43c6a73;
            }

            .line-number-style {
              display: ${!nonum(metastring) ? "inline-block" : "none"};
              /* display: none; */
              width: 2rem;
              border: pink solid 0px;
              color: #ac8ca688;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
                sans-serif;
              font-size: 12px;
              user-select: none;
            }

            @media screen and (min-width: 918px) {
              .line-number-style {
                font-size: 14px;
              }
            }
          `}
        >
          {/* === !== === !== === !== === !== LANGUAGE TAB , PATH TAB === !== === !== === !== === !==  */}
          <div
            className="pathnlang"
            css={css`
              border: pink solid 0px;

              position: relative;

              box-shadow: 0 0px 31.6px -96px rgba(0, 0, 0, 0.245),
                0 0px 50.7px -96px rgba(0, 0, 0, 0.351),
                0 0px 70.3px -96px rgba(0, 0, 0, 0.439),
                0 0px 106.2px -96px rgba(0, 0, 0, 0.545),
                0 0px 159px -96px rgba(0, 0, 0, 0.79);

              display: flex;
              flex-wrap: wrap;

              border-top-left-radius: 8px;
              border-top-right-radius: 8px;

              background-image: linear-gradient(
                90deg,
                rgba(93, 85, 82, 1) 4%,
                rgba(51, 52, 61, 1) 100%
              );

              [data-language] {
                border: red solid 0px;

                &::before {
                  color: blanchedalmond;
                  content: attr(data-language);
                  display: inline-block;
                  padding-left: 0.8em;
                }

                @media screen and (max-width: 718px) {
                  &::before {
                    font-size: 0.8em;
                  }
                }
              }

              [data-code-path] {
                margin-left: auto;
                position: relative;
                &::after {
                  content: attr(data-code-path);
                  /* position: absolute; */
                  /* top: 0; */
                  /* right: 0; */
                  color: #eb8da4;
                  /* background-color: white; */

                  margin-right: 0.8em;
                }

                @media screen and (max-width: 718px) {
                  &::after {
                    font-size: 0.8em;
                  }
                }
              }

              [data-code-path="0"] {
                &::after {
                  display: none;
                }
              }

              & div.copy-button {
                position: absolute;
                border: tomato solid 0px;
                border-radius: 4px;
                z-index: 1;
                top: 33.8px;
                right: 9.8px;
                padding: 2.8px 6px;
                font-size: 14px;
                background-color: rgb(99, 117, 120);
                background-image: linear-gradient(
                  90deg,
                  rgba(107, 110, 149, 1) 18%,
                  rgba(99, 117, 120, 1) 100%
                );
                box-shadow: 0 2.9px 47.5px -35px rgba(0, 0, 0, 0.08),
                  0 7.4px 80.6px -35px rgba(0, 0, 0, 0.04),
                  0 15.1px 104px -35px rgba(0, 0, 0, 0.035),
                  0 31px 129.8px -35px rgba(0, 0, 0, 0.03),
                  0 85px 232px -35px rgba(0, 0, 0, 0.02);

                user-select: none;
                cursor: default;
                color: black;

                &:hover {
                  background-image: linear-gradient(
                    90deg,
                    rgba(33, 14, 30, 1) 18%,
                    rgba(26, 32, 33, 1) 100%
                  );
                  color: blanchedalmond;
                }

                &:active {
                  background-image: linear-gradient(
                    90deg,
                    rgba(33, 14, 30, 1) 18%,
                    rgba(26, 32, 33, 1) 100%
                  );
                  color: blanchedalmond;
                }
              }
            `}
          >
            <div data-language={`${nolang(language) ? "" : language}`} />
            <div
              data-code-path={`${
                takeCodePath(metastring) ? takeCodePath(metastring) : 0
              }`}
            />
            <div
              className="copy-button"
              tabIndex={0}
              onClick={() => {
                if (preRef.current) {
                  // console.log(preRef.current);
                  // console.log(preRef.current);
                  navigator.clipboard.writeText(codeString);
                }
              }}
              onKeyPress={(e) => {
                if (preRef.current) {
                  // console.log(preRef.current);

                  navigator.clipboard.writeText(codeString);
                }
              }}
              role="button"
              aria-label="copy from code block"
            >
              Copy
            </div>
          </div>
          {/* === !== === !== === !== === !== === !== === !== === !== === !==  */}
          <pre
            ref={preRef}
            className={`${className}`}
            style={style}
            sx={{
              variant: "prism-highlight",
              p: 2,
              // overflowX: "scroll",
              overflowX: "auto",
              /* fontSize: "12px;", */
              // wordSpacing: "0.3em",
            }}
            css={css`
              @media screen and (min-width: 918px) {
                font-size: 14px;
              }

              position: relative;

              box-shadow: 0 8.6px 18.1px -82px rgba(0, 0, 0, 0.049),
                0 20.2px 31.6px -82px rgba(0, 0, 0, 0.07),
                0 40.9px 45.6px -82px rgba(0, 0, 0, 0.091),
                0 101px 96px -82px rgba(0, 0, 0, 0.14);

              font-size: 12px;

              font-family: "Fira Code", monospace, "monospace";

              margin-top: 0px;

              span.token.comment {
                font-style: italic;
              }
            `}
          >
            {tokens.map((line, i) => {
              // EVO STA SAM URADIO, DAKLE ONIM LINE PROPSIMA
              // SAM PRIDODAO KALSU

              const lineProps = getLineProps({ line, key: i });

              // NE ZABORAVI    i + 1   JER REDOVI KRECU OD 1
              const neuLineProps = findLineNumber(i + 1)
                ? {
                    ...lineProps,
                    className: `${lineProps.className} highlight-specific-line`,
                  }
                : { ...lineProps };

              return (
                <div {...neuLineProps}>
                  {/* SLEDECIM SPAN-OM SE ZADAVAJU NAUMBERI */}
                  <span className="line-number-style">{i + 1}</span>
                  {/* ------------------------------------------- */}
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </LazyPrismHighlighter>
  );
};

export default Code;
