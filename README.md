# DAKEL OPET SE VRACAM NA STILIZOVANJE

KRECEM ON GROUP PAGE-OVA

# NE ZNAM DA LI BIH STAVIO KARAKTERISTICAN EMOJI ZA SVAKI SUBJECT

TO CU STAVITI ON HOLD JER BAS I NEMAM IDEJU KOJ IBI EMOJIS BILI APPROPRIATE

# ZNAM, STA CU, SECAM STRANICE NA KOJOJ POSTOJI VELIKI BROJ TECHNICAL SVG-JEVA

ISKORISTICU UPRAVO TO

# TAKODJE ZELIM DA U CONTEXT-U ZA GROUP PAGE ZADAM I ONA DVA PROPERTIJA, KOJE CE IMATI GROUP PAGE

U PITANJU SU

`description` I `lang` KOJI CE NARAVNO BITI NAMENJENI HEKMETU, KOJEG JOS UVEK NISAM DEFINISAO

PA CU MOZDA SADA DEFINISATI I HELMET PO UZORU NA BLOG POST PAGE (VIDECU STA SAM TAMO DODAVAO)

MISLIM DA NEMA POTREBE DA SE PRAVI STATIC QUERY DA CU SVE ODMAH IZDVOJITI

PA DA I ONAKO KORISTIS CONTEXT

:one: DAKLE PRVO IDEM USTVARI U TEMPLATE DA PROSIRIM TYPE-OVE

`packages/gatsby-theme-raedal/src/templates/group-page-template.tsx`

PORED TOGA STO CU TAMO PROSIRITI TYPESCRIPT TYPE-OVE, TAKODJE NE SMEM ZABORAVITI DA QUERY-UJEM ZA POMENUTA DVA DODATNA FIELDA (`description` I `lang`)

:two: E ONDA IDEM U CONTEXT GDE MORAM SAMO DA PROSIRIM DEFAULTOVE, ODNOSNO DODAJEM DEFAULT-OVE ZA DVA NOVA FIELD-A

`packages/gatsby-theme-raedal/src/context_n_reducers/group_page_con_red.ts`

TO MI JE CONVINIENT JE R SAM NA SAMOM POCETKU DEFINISAO DA CONTEXT USTVARI KORISTI INTERFACE IZ TEMPLATE-A

:three: MOZDA MI SADA OSTAJE DA PROVERIM STA SE SVE PROSLEDJUJE KROZ CONTEXT, STO JE USPOSTAVLJENO KORISCENJEM CONTEXT PROVIDER-A

`packages/gatsby-theme-raedal/src/components/group-page-components/group-page.tsx`

TAMO I ONAKO PROSLEDJUJEM CEO OBJEKAT, TAKO DA JE TU SVE U REDU

## SADA MOZES KREIRATI SEO KOMPONENTU, ILI DA ISKORISTIM ONU KOJU VEC IMAM KREIRANU ZA BLOG POST PAGE

IPAK SAM NAPRAVIO NOVU, JER ONA DRUGA KOMPONENTA JE PREVISE CUSTOM

ALI NEKA STOJI UZ ONU VEC KREIRANU, JER CU IH TAKO LAKSE NACI

EVO STA SAM NAPRAVIO

`packages/gatsby-theme-raedal/src/seo/group-seo.tsx`

## MOZES ODMAH DA UPOTREBIS HELMET

I TO OVDE

`packages/gatsby-theme-raedal/src/components/group-page-components/gp-layout.tsx`

MADA SAM MOGAO DA TO URADIM BILO GDE, ALI MISLIM DA JE OVO NAJBOLJE MESTO

**CISTO TE PODSECAM DA HELMET SLUZI DA RENDERUJE META I OSTALE TAGOVE U head SEKCIJI DOKUMENTA**

PREDPSOTAVLJAM DA BIH BEZ UPOTREBE HELMETA MORAO KORISTITI PORTALS ILI NESTO SLICNO
