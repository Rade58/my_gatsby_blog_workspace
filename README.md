# DAKLE SADA SAM DEFINISAO DA SU CARD-OVI SLOZENI PO DATE-U, A ONO STO SADA ZELIM JESTE DA POKAZAEM DATE U POSEBNOM FORMATU

NA PRIMER `May 24th 2020`

DAKLE REDEFINISEM GROUP PAGE TEMPLATE, A ONO STO REDEFINISEM JESTE QUERYING `updated` FIELD-A

PRVO CU NAPRAVITI QUERY U GRAPHI-JU, KOJI MI ODGOVARA

I OVAKO NESTO MI ODGOVARA ZA updated

```php
updated(formatString: "MMM Do Y")
```

STO BI PROIZVELO OVAKO NESTO

```json
"updated": "May 10th 2020"
```

DAKLE OVAKO NESTO OMOGUCAVA `Moment.js` LIBRARY KOJI RADI UNDER THE HOOD OF updated FILEDA 

## POMENTO SAM DEFINISAO OVDE

`packages/gatsby-theme-raedal/src/templates/group-page-template.tsx`

# POSTO SI TO URADIO MOZES DA OVAJ DATE PRIKAZES U CARD-U

KORIGUJ TYPESCRIPT TYPE-OVE

ALI MISLIM DA IPAK NECES MORATI, JER SI SVE VEC RANIJE OBEZBDEIO, SAM OTREBAS DA DATUM KORISTIS U CARD-U

OVDE DEFINISEM PRIKAZIVANJE DATUMA:

`packages/gatsby-theme-raedal/src/components/group-page-components/blog-post-card.tsx`
