# KADA POVUCEM SCROLL INDICATOR, NA POCETAK, IMAM MOMENAT U KOJEM SE NE OCITA VREDNSOT KAKO TREBA I SCROLL NE ZAVRSI NA NULI, ODNONO ELEMENTU SE SIRINA NE PODESI DO NULE

USTVARI MISLIM DA MORAM DA REFAKTORISEM U POTPUNOSTI SCROLL INDICATOR, KAKO NE BI KORISTIO NIKAKVE REF-OVE

ZAKOMPLIKOVAO SAM SITUACIJU I SUVISE

## OSLOBODIOA SAM SE SVIH NEPOTREBNIH KORISCENJA REF-OVA, I NEPOTREBNOG PASSING-A STATE-A

SADA JE SVE OK

I OVO NEJA MI BUDE NAUK ZA FUTURE DA NE KORISTIM REACT STAVARI KOD SCROLLINGA

KADA PRONALAZIS ELEMENT KAO STO JE body IDI SAM ONA `document.body` IKLI KAD ZELIS DA ACCESS-UJES NEKO MELEMENTU KORISTI `document,querySelector` I SLICNO