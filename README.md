# PREVENT-UJ SCROLLING ON WHEEL, PREKO JUMPER-A

NIJE MOGUCE

# ALI MOGUCE GRANU STATE `isOverTheButtonOrJumper` DISPATCH-OVATI (DO REDUCER-A) SVAKI PUT KADA SE PROMENI

OVO DAKLE ZAHTEVA PRAVLJENJ NOVE GRANE U REDUCER STATE-U, NA KOJU UTICE `setIsOverTheButtonOrJumper` (DAKLE MENJA JE), KADA SE I OVA GRANA PROMENI

NA OVAJ NACIN MOGU NEKAKO SPRECITI SCROLLING WIND-OVA, KADA JE POMENUTA STVAR UNUTRA

# JA SAM PREVENT-OVA CLICK, KADA JE INTERSECTION ID ISTI KAO I VALUE TRENUTNOG INTERSECTED, ODNONO CLICKED LINKA, U SUPROTNOM DOGADJA SE MALI PREKID ANIMACIJE

ODNONIO KADA JE window.location.hash ISTI KAO TRENUTNO VEC KLIKNUTI LINK, JA SAM U ON CLICK HANDLERU PREVENT-OVAO DEFAULT

PREDPOSTAVLJAM DA SE OVAKO SPRECAVA EVENT BUBBLING STO I PREKIDA ANIMACIJU

# (NE VALJA JER UNISTAVA NESTO DRUGO) IMAM PROBLEM PRI KOJEM JE KLIK DIREKTNO NA `h2` ELEMENT, (TARGETING LINKA, ODNOSNO HASHA), OPET PRAVIO POREMECEN POREDAK OKO TOGA STA JE HIGHLIGHTED U JUMPER-U

ALI TO SAM RESIO OVAKO, NA PRILICNO HACKY NACIN

```jsx
<Link
  onClick={() => {
    // EVO VIDIS KOLIKO IMAM PROMENA STANJA DA BI SVE BILO OK
    setIsOverTheButtonOrJumper(false);
    setIntersectedHeadingDivFunc(props.id);
    setIsOverTheButtonOrJumper(true);
    setClickedId(props.id);

    console.log("CLICKED");
  }}
  to={`${encodeURI(relativeLink)}#${props.id}`}
>
  {" "}
</Link>
```

# POMENUTI PROBLEM IZ PROSLOG NASLOVA SAM USTVARI RESIO, NA onClick KORISTECI, `e.preventDefault`, ZATIM `anchor.scrollIntoView`, ZATIM `window.scrollBy(0, -58)`

# A SADA MI OSTAJE DA SE POZABAVIM ON wheell

MOZDA MOGU DA KORISTIM onWheeel, DA SCROLL-UJEM INTO VIEW TRENUTNI ANCHOR

ILI MOZDA DA SVAKI KLIK NA BILO KOJI OD DUGMADI USTVARI `setIsOverTheButtonOrJumper(true);`

A DA MOUSEWHEEL NAPRAVI `setIsOverTheButtonOrJumper(false);`