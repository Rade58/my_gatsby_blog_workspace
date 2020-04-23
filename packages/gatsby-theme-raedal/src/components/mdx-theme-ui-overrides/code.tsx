/** @jsx jsx */
import { jsx } from "theme-ui";

import { FunctionComponent } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

import theme from "prism-react-renderer/themes/dracula";

// DIREKTNO IZ MOG APP-A
// POSTO NISAM NISTA MOGAO DA UVEZEM IZ mdx-utils, KORISTIM OVU FUNKCIJU
import preToCodeBlock from "../../utility/preToCodeBlock";

// MALO BI MOGAO DA PROSTUDIRAS STA RADI preToCodeBlock FUNKCIJA
// ALI I DA PROSTUDIRAS STA OVA DOLE KOMPONENTA, USTVARI RADI
// KADA SE MALO VISE UDUBIS POSTACE TI JASNO
// ALI JA CU SZA SADA URADITI SVE ISTO KAO I JASON LANGSDORF

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
            overflow: "auto",
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
