# DAKLE IMAM PROBLEM PO KOJEM KADA SE PRVI PUT OTVORI STRANICA, I JA POCNEM DA SCROLL-UJEM; TADA KAD SCROLL STIGNE DO PRVOG NASLOVA, IMAM JUMP NA POCETAK, I TAKO NEKOLIKO PUTA

PRVA STVAR KOJU BI TREBALO DA PROVERIM JESTE DA NIJE MOZDA U PITANJU RENDERING HEADER-A

TU MI RADI MNOGO PLUGINA, REMARK

ZATIM MOGUCE JE DA SE I CODE BLOCKS LAZYLY LOAD-UJEU

JER JA USTVARI PRISMA-U LOAD-UJEM LAZYLY

# JA SAM ELIMINISAO LAZY LOADING PRISMA-E I IZGLEDA DA JE OVO, IPAK NIJE RESILO PROBLEM

OSTAJE MI DA VIDIM DA LI SU U PITANJU HEADINGS

MOZDA JE PROBLEM ZBOG TOGA STO IH IMA MNOGO

# DAKLE ZELIM DA SE POZABAVIM INTERSECTION-OM

USPEO SAM

- DA SE LINK HIGHLIGHT-UJE KADA HEADING DODJE INTO VIEW

- DA SE HIGHLIGHT-UJE PREDHODNI, KADA HEADING ODE OF THE VIEW NA DONJU STRANU

# SADA MI TREBA BOOLEAN, KOJI CE SLUZITI DA PREVENT-UJE INTERSECTION DA URADI SVOJE

NISAM NISTA ODOVOGA URADIO

RECI CU, USTVARI STA SAM URADIO

# UHVATIO SAM SLUCAJ KADA JE `y`, INTERSECTION RECT-A, JEDNAKO NULI, I KADA JE `isItersecting`, USTVARI true

TO SE DAGODJA, AKO KLIKNEM NA NEKI, OD LINKOVA JUMPER-A, ILI SE SE PRITISNE GORNJA ILI DONJA STRELICA

U SUSTINI NISTA SE NECE POREMETITI, AKO ODLUCIM DA SE VRATIM NA SCROLLING, I DALJE CE SE DESAVATI ONO STA SAM DEFINISAO U PROSLOM BRANCH-U (MEDJUTIM NIJE BAS TAKO)

# MEDJUTIM OPET NASTAJE PROBLEM, I TO KOD FAST SCROLLING-A; FAST SCROLLING OPET CINI DA SU VREDNOSTI U INTERSECTION RECT-U, USTVARI NULE

# NE MOGU RACUNATI NA INTERSECTION OBSERVER KAKDA KLIKCEM NA ARROW DUGMAD ILI NA STRELICE

MORAM NACI NEKU ALTERNATIVNU LOGIKU, KOJA ME NECE KOSTATI PERFORMANSI PRI SCROLLING-U

MISLIM DA CE MI IPAK TREBATI REDUCER

- ACTION TREBA DA SE DISPATCH-UJE KADA JE DUGME KLIKNUTO (TO JE jumper-h KOMPONENTA (NA ARROW-IMA)) (TO JE jumper-j-single ZA LINK)

- I TADA TAJ STATE TREBA DA PRIHVATE SVI HEADINGS-I

- ALI TREBALO BI SE I VRATITI NA STARO, KAKDA SE IZVRSI KLIK, ODNOSNO ON IDLE, TAKO CE SE OPET MOCI OMOGUCITI DA ITERSECTION RADI ON SCROLLING, JER SUPROTNO BI BIO PREVENTED

**DAKLE MORACU KORISTITI CONTEXT I REDUCER-E**

NEKA SE NOVA GRANA REDUCER STATE-A NAZIVA `intersectionPrevented`

**NIJE POSLO ZA RUKOM**

# MORAM DA U CELOM JUMPER-U SKUJEM DRUGACIJU LOGIKU, AKO SE DEIO HASHING

# DEFINISATI DA NA VECIM EKRANIMA NEMAPROMENE HEADER PULL UP I PULL DOWN KALSE

GLEDAM GDE GOD MOGU DA POVECAM PERFORMANSE




