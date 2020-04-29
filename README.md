# SADA ZELIM DA NAPRAVIM PAGE BASED TABLE OF CONTENT KOMPONENTU

PLUGIN KOJI SAM PRIDODAO MDX

---

PAZI NEGDE NEMAS SLUG

\*\*
\*\*

MISLIM DA SAM NA KRAJU IPAK ODLUCIO DA UZMEM ID I NAPRAVIM NOVI QUERY

---

`MNOGO TOGA TI OLAKSAVA` **gatsby-plugin-mdx**

MOGU DA KORISTIM `useStaticQuery`, KAKO BIH QUERY-EOVAO, UPRAVO ZA NASLOVIMA

NA OVAJ NACIN:

```php
query UzmiNaslove($id: String!) {

 	naslovi: mdx(id: {eq: $id}) {
  	headings {
      value
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

## I DAKLE CILJ TI JE DA ZA SVAKI h2 NASLOV, TI NAPRAVIS, USTVARI ANCHOR U TABLE OF CONTENT KOMPONENTI

DAJKLE ON BI ZA GORNJI `"Typescript"` NASLOV IZGLEDAO OVAKO

```html
<a href="#typescript">typescript</a>
```

# ALI MENI JE SAMO ID NEKOG MDX FAJLA DOSTUPAN, KROZ NJEGOV BUILD

ZATO JE NAJBOLJE PROSIRIVANJE ONOG VEC MOG POSTOJECEG QUERY-JA KOJEG SAM DEFINISAO U

`packages/gatsby-theme-raedal/gatsby-node.js`

**ZATO CU PROSIRITI MOJE SCHEMA-E, TAK ODA SE U NJIMA NALAZI I TYLE ZA HEADINGS**

**PA CU ONDA KROZ BUILD PROCESS UZETI SVE DODATNE, POTREBNE PODATKE, VEZANE ZA NASLOV**

**I MODIFIKOVACU CODE TEMPLATE-A, KAKO BI HANDLE-OVAO I I DODATNI QUERY DATA VEZAN ZA HEADINGS-E**

# HRONOLOGIJA

- PROSIRIVANJE SCHEMA-E, DODAVANJEM TYPE-A `Heading`

- A `BlogPostPage` TYPE-U DODAJEM: FILED myHeadings CIJA VREDNOST JESTE **`[Heading!]`**
