/** @jsx jsx */
import { jsx } from "theme-ui";

import { css } from "@emotion/core";

import {
  useContext,
  useLayoutEffect,
  FunctionComponent,
  ReactNode,
} from "react";

// EVO UVEZAO SAM LOADABLE
import loadable from "@loadable/component";
//

import theme from "prism-react-renderer/themes/dracula";

// === !===

import {
  // defaultProps,
  Language,
  PrismTheme,
  RenderProps,
} from "prism-react-renderer";
// GORNJI RenderProps  SAM UVEZAO NA HACKABLE NACIN TAK OSTO SAM OTISAO
// U TYPE DEFINITION I IZVEZAO GA (AKO IKADA UPDATE-UJES TYPE DEF ZA LOADABLE,
// OPET CE TYPESCRIPT YELL-OVATI NA TEBE)
import preToCodeBlock from "../../utility/preToCodeBlock";

// === !===
// === !===
// === !===
// === !===
// === !===
// === !===

import { $_useReducerState } from "../../context_n_reducers/context_n_reducer_header";
import { $_useBlogPostReducerState } from "../../context_n_reducers/context_n_reducer_blog_post";

// === !===
// === !===

// A SADA CU DA KORISTIM LOADABLE
const LazyPrismHighlighter = loadable(async () => {
  const PrismModule = await import("prism-react-renderer");
  const Highlight = PrismModule.default;

  const { defaultProps } = PrismModule;

  const LazyPrismHighlight: FunctionComponent<{
    language: Language;
    code: string;
    theme: PrismTheme;
    children: (props: RenderProps) => ReactNode;
  }> = (props) => {
    const { code, language, children } = props;

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

// POSTO SAM DEFINISDAO LAZY LOADING, POMENUTOG LIBRARY-JA, JA CU SADA
// UPOTREBITI DOLE
// RANIJE SAM KORISTIO SAMO Highlight  A SADA CU SVE WRAPP-OVATI U
//       LazyPrismHighlight      UZ PROSLEDJIVANJE PROPS-A NARAVNO

// A U OBIMU      Code        KOMPONENTE, MORAM KREIRATI FUNKCIJU
// KOJA CE IZRACUNATI BROJ REDOV-A
// I ZADATI KLASU, UZ POMOC KOJE CE SE MOCI
// DODATNO HIGHLIGHTOVATI SPECIFIC REDOVI

const Code: FunctionComponent = (props) => {
  //

  //

  const codeProps = preToCodeBlock(props);

  if (!codeProps) {
    return <pre {...props} />;
  }

  const { codeString, language } = codeProps;

  return (
    <LazyPrismHighlighter code={codeString} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        //  EVO TI CES OVDE UPRAVO KORISTII VARIANT KOJI SE ZOVE    prism-highlight (OVO SAM REKAO DAVNO RANIJE)
        <pre
          className={className}
          style={style}
          sx={{
            variant: "prism-highlight",
            p: 2,
            overflowX: "scroll",
          }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <span className="line-number-style">{i + 1}</span>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </LazyPrismHighlighter>
  );
};

export default Code;
