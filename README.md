# DAKLE SADA ZELI MDA SE POSVETIM STILIZOVANJU JUMPER KOMPONENTE

TO SU OVE SLEDECE DVE KOMPONENTE

- `packages/gatsby-theme-raedal/src/components/jump-ul.tsx`

- `packages/gatsby-theme-raedal/src/components/jumper-h.tsx`


***

DODATNO:

USPEO SAM DA PREVENT-UJEM DEFAULT U ZA ONAJ LINK KOJI JE DEO UNORDERED LISTE

`POGLEDAJ MALO BOLJE UNORDERED LISTU`

*RANIJE SAM KORISTIO onClick HANDLER I NISAM NIKAKO MOGAO DA ISKONTROLISEM CLICKING ON THE SAME LINK CONSEQUENTLY*

**`TREBAO SAM DA KORISTIM onSubmit STO SAM I URADIO`**

U NJEMU SAM POZVAO `event.prevetDefault()` ZA SLUCAJ KADA SE POKUSAVA NAVIGACIJA NA JEDAN TE ISTI `Link`

***