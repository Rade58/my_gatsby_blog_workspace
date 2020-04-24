/** @jsx jsx */
import { jsx } from "theme-ui";

import { FunctionComponent, ReactNode } from "react";

// EVO UVEZAO SAM LOADABLE
import loadable from "@loadable/component";
//

import theme from "prism-react-renderer/themes/dracula";

// === !===

import { Language, PrismTheme, RenderProps } from "prism-react-renderer";
// GORNJI RenderProps  SAM UVEZAO NA HACKABLE NACIN TAK OSTO SAM OTISAO
// U TYPE DEFINITION I IZVEZAO GA (AKO IKADA UPDATE-UJES TYPE DEF ZA LOADABLE,
// OPET CE TYPESCRIPT YELL-OVATI NA TEBE)
import preToCodeBlock from "../../utility/preToCodeBlock";

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
  // U SUSTINI OVO CE EXPOSE-OVATI DA LI JE
  // PRILIKOM PISANJA MDX PROSLEDJEN LANGUAGE PROP
  // KOJI ZADAJE, KOJI JE JEZIK U CODE BLOKU
  const codeProps = preToCodeBlock(props);

  // AKO SI U MDX FAJLU       PISAO SAMO IZMEDJU      ```     ```
  // BEZ IKAKVOG ARGUMENTA KOJI BI SE ODNOSIO N JEZIK
  // ONDA SERVIRAS pre TAG, BEZ HIGHLIGHTING-A

  if (!codeProps) {
    return <pre {...props} />; // eslint-disable-line
  }

  // U SUPROTNOM KORISTIM SVE KOMPONENTE, KOJE SAM UVEZAO IZ
  // 'prism-react-renderer'

  const { codeString, language } = codeProps;

  return (
    <Highlight
      // eslint-disable-next-line
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        //  EVO TI CES OVDE UPRAVO KORISTII VARIANT KOJI SE ZOVE    prism-highlight
        <pre
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
            // eslint-disable-next-line
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
