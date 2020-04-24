/** @jsx jsx */
import { jsx } from "theme-ui";

import {
  Fragment,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect,
  FunctionComponent,
  ReactNode,
  useState,
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
import UseScrollHeightGiver from "../just_functionality/hooks/useScrollHeightGiver";
// === !===
// === !===

import { $_useReducerState } from "../../context_n_reducers/context_n_reducer_header";

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
  const { ACTION_TYPES_ENUM, headerContext } = $_useReducerState;

  const { headerDispatch } = useContext(headerContext);

  const preElementRef = useRef<HTMLPreElement>(null);

  // MUTATION OBSERVER   ---------------------------------

  //   ---------------------------------

  const [setupStage, setSetupStage] = useState(true);

  useLayoutEffect(() => {
    console.log("************pre OBSERVER*****************");
    console.log(preElementRef.current && !setupStage);

    if (preElementRef.current && !setupStage) {
      const mutationCallback: MutationCallback = (mutationList, observer) => {
        const windowEl = window || document.documentElement;

        console.log(windowEl.scrollY);

        headerDispatch({
          type: ACTION_TYPES_ENUM.CHANGE_CURRENT_SCROLL,
          payload: windowEl.scrollY,
        });
      };

      const preElementObserver = new MutationObserver(mutationCallback);
      preElementObserver.observe(preElementRef.current, {
        subtree: true,
        childList: true,
        attributes: true,
      });

      setSetupStage(true);
    }
  }, [preElementRef.current, setupStage, setSetupStage]);

  //

  const codeProps = preToCodeBlock(props);

  if (!codeProps) {
    return <pre {...props} />;
  }

  const { codeString, language } = codeProps;

  return (
    <LazyPrismHighlighter code={codeString} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        //  EVO TI CES OVDE UPRAVO KORISTII VARIANT KOJI SE ZOVE    prism-highlight
        <pre
          ref={preElementRef}
          className={className}
          style={style}
          sx={{
            variant: "prism-highlight",
            p: 2,
            overflowX: "scroll",
            // width: "100vw",
          }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
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
