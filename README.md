# SADA ZELIM DA NAPRAVIM PAGE BASED TABLE OF CONTENT KOMPONENTU

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
