/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import {
  // useContext,
  // useLayoutEffect,
  FunctionComponent,
  ReactNode,
} from "react";

// EVO UVEZAO SAM LOADABLE
import loadable from "@loadable/component";
//

import theme from "prism-react-renderer/themes/oceanicNext";

// === !===

import {
  // defaultProps,
  // Prism,
  Language,
  PrismTheme,
  RenderProps,
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

  //

  const codeProps = preToCodeBlock(props);

  if (!codeProps) {
    return <pre {...props} />;
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

  console.log(lineNumbersToHighlightArray);

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
          className="language-styles"
          data-language={`${language}`}
          css={css`
            /* OVO CE BITI KLASA KOJA HIGHLIGHT-UJE SPECIFIC LINE */
            .highlight-specific-line {
              background-color: #d43c6a73;
            }

            .line-number-style {
              display: inline-block;
              width: 2rem;
              border: pink solid 0px;
              color: #d4c6d1c4;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
                sans-serif;
              font-size: 0.7rem;
              user-select: none;
            }
          `}
        >
          <pre
            className={className}
            style={style}
            sx={{
              variant: "prism-highlight",
              p: 2,
              overflowX: "scroll",
              /* fontSize: "12px;", */
              // wordSpacing: "0.3em",
            }}
            css={css`
              @media screen and (min-width: 918px) {
                font-size: 14px;
              }

              font-size: 12px;

              font-family: "Fira Code", monospace, "monospace";
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
