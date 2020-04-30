# SADA ZELIM DA NAPRAVIM PAGE BASED TABLE OF CONTENT KOMPONENTU

`MNOGO TOGA TI OLAKSAVA` **gatsby-plugin-mdx**

MOGU DA KORISTIM `useStaticQuery`, KAKO BIH QUERY-EOVAO, UPRAVO ZA NASLOVIMA

NA OVAJ NACIN:

```php
query UzmiNaslove($id: String!) {

 	naslovi: mdx(id: {eq: $id}) {
  	headings {  #  OVAJ FIELD UZIMA I ARGUMENTE  NA PRIMER  (depth: h2)
      value     ##                       TAJ ARGUMENT CU JA I KORISTITI
      depth
    }
	}

}

```

A OVAK OBI IZGLEDALA QUERY VARIJABLA

```JSON
{"id": "d787ecbf-912b-582b-b5df-8a296064b5f0"}
```

ONO STA BIH DOBIO IZGLEDALO BI OVAKO

```json
{
  "data": {
    "naslovi": {
      "headings": [
        {
          "value": "Moj omiljeni band je Tool",
          "depth": 1
        },
        {
          "value": "MANJI NASLOV",
          "depth": 2
        },
        {
          "value": "Syntax highlight",
          "depth": 3
        },
        {
          "value": "Typescript",
          "depth": 2
        }
      ]
    }
  }
}
```

**DAKLE `mdx` QUERY TI PRUZA MOGUCNOST UZIMANJA NASLOVE IZ MDX FAJLOVA**

I KAO STO VIDIS **`depth`** TI GOVORI O KOJEM **`h`**-U JE REC

# MEDJUTIM JA NECU KORISTITI `useStaticQuery`, VEC CU KORISTITI `graphql` FUNKCIJU IZ `createPages` HOOK-A

**TO CU URADITI ZATO STO ZELIM DA NAPRAVIM MULTIPLE ONKAVIH GORE QUERY-JA**

**I JER MOGU DA DODAJEM QUERY VARIJABLE, KOJE SU MI POTREBNE U OVOM SLUCAJU**

KAKO SAM SVE RADIO MOZES VIDETI U:

`packages/gatsby-theme-raedal/gatsby-node.js` (**createPages** HOOK-U)

I KAKO SAM UPOTREBIO QUERIED DATA, MOZES DALJE VIDETI U:

- `packages/gatsby-theme-raedal/src/templates/blog-post-template.tsx`

- `packages/gatsby-theme-raedal/src/components/blog-post.tsx`

## I DAKLE CILJ TI JE DA ZA SVAKI h2 NASLOV, TI NAPRAVIS, USTVARI ANCHOR U TABLE OF CONTENT KOMPONENTI

DAJKLE ON BI ZA GORNJI `"Typescript"` NASLOV IZGLEDAO OVAKO

```html
<a href="#typescript">typescript</a>
```

## U SLEDECEM BRANCHU CU NAPRAVITI TABLE OF CONTENT KOMPONENTU ZA HEADERS-E
