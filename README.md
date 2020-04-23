# SYNTAX HIGHLIGHTING

**DAKLE I OVO JE NESTO STO CE BITI PROVIDED KROZ THEME UI, ALI KAO ALAT ZA DEFINISANJE CODE KOMPONENTE, KORISTI SE `prism-react-renderer`**

INSTALIRAO SAM

- `yarn workspace gatsby-theme-raedal add prism-react-renderer mdx-utils`

**`mdx-utils`** NE FUNKCIONISE, AKO JE KORISTIM SA TYPESCRIPTOM (NE ZNAM ZASTO)

GOTOVO ISTO SI URADIO I RANIJE ZA h2 TAG (DEFINISAO KAKO DA SE TI TAGOVI RENDER-UJU U MDX-U)

## MEDJUTIM `'mdx-utils'` PAKET NE RADI SA TYPESCRIPTOM; CAK NISAM MOGAO DA GA PRONADJEM INSTALIRANOG MEDJU `node_modules`

NI KADA SAM NAPRAVIO DECLARATION, NIJE FUNKCIONISALO, TAKO DA SAM ODLUCIO DA UZ POMOC [runkit](https://runkit.com/home)-A
PROVERIM KAKO IZGLEDA TA FUNKCIJA

I EVO KOPIRAO SAM JE I MOGU JE UPOTREBITI DIREKTNO

```js
(preProps) => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === "code"
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = "",
      ...props
    } = preProps.children.props;

    const match = className.match(/language-([\0-\uFFFF]*)/);

    return {
      codeString: codeString.trim(),
      className,
      language: match != null ? match[1] : "",
      ...props,
    };
  }
  return undefined;
};
```

I OVU FUNKCIJU CU STAVITI U TS FAJL, ODAKLE CU JE KORISTITI

- `mkdir packages/gatsby-theme-raedal/src/utility/`

- `touch packages/gatsby-theme-raedal/src/utility/preToCodeBlock.ts`

- `code packages/gatsby-theme-raedal/src/utility/preToCodeBlock.ts`

DAKLE GORNJU FUNKCIJ USAM STAVIO U POMENUTI FAJL, I NESTO SAM JE I IZMENIO TAK ODA JE TAMO MOZES POGLEDATI

## DAKELE DA SAMO POMENEM

ONADA SE PRVO KREIRA KOMPONENTA

KREIRAO SAM I FOLDER, KOJ ITREBA DA HOLD-UJE SVE TE KOMPONENTE

- `mkdir packages/gatsby-theme-raedal/src/components/mdx-theme-ui-overrides`

- `touch packages/gatsby-theme-raedal/src/components/mdx-theme-ui-overrides/code.tsx`

AKO TE ANIMA KAK OIZGLEDA KOMPONENTA, POGLEDAJ KAK OIZGLEDA U FAJLU

PA NAKO N STO KREIRAM KOMPONENTU SPECIFICIRAM JE U

`packages/gatsby-theme-raedal/src/gatsby-plugin-theme-ui/components.tsx`

I SAM MOZES VIDETI STA SVE TAMO IMA

**MEDJUTIM TI SADA SVOJU Code KOMPONENTU SPECIFICIRAS, KAO `pre`**
