# SYNTAX HIGHLIGHTING

INSTALIRAO SAM NEKOLIKO PAKETA U TEMI

- `yarn workspace gatsby-theme-raedal add prism-react-renderer mdx-utils`

ONDA PRAVIM code KOMPONENTU; I MOZES JE VIDETI OVDE (`packages/gatsby-theme-raedal/src/components/code.tsx`)

A NAKON STO SI TO URADIO, U `packages/gatsby-theme-raedal/src/gatsby-plugin-theme-ui/components.tsx`; **TI DEFINISES BUKVALNO DA SE U MDX-U, KADA PISAES CODE BLOCKS USTVARI SERVIRA TVOJA KOMPONENTA**

GOTOVO ISTO SI URADIO I RANIJE ZA h2 TAG
