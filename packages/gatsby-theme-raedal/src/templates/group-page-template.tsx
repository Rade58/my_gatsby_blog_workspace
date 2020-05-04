import React, { FunctionComponent } from "react";
import { graphql } from "gatsby";

// OVO JE KOMPONENTA KOJU CU DA POPULATE-UJEM
import GroupPage from "../components/group-page";

// UVESCU KOMPONENTU, KADA JE NAPRAVIM
// A SADA CU NAPRAVITI QUERY
// DAKLE VODIM RACUAN STA M ISVE TREBA, IAKO MISLIM DA BI TREBA
// SVE

export const TakeOneGroupPage = graphql`
  query TakeOneGroupPage($id: String!) {
    groupPage(id: { eq: $id }) {
      # PRVO PODACI POTREBNI ZA KONKRETAN GROUP PAGE
      id
      name
      path
      groupColor
      updated(fromNow: true)

      # videcu da li ce mi time icemu koristiti
      # GORNJI TIME (KAO STO VIDIS, IDU ARGUMENTI)

      # DAKLE SADA IZDVAJAM STVARI KOJE
      # SU POTREBNE SA SVAKI BLOG POST PAGE
      # KOJI JE RELATED
      # JER NAJMANJE STO CU URADITI JESTE
      # DEFINISANJE CARD-OVA I OSTAVLJANJE LINKOVA
      # DO TIH GROUP PAGE-OVA

      blogPostPages {
        # OVO JE SVE STO TI TREBA DA U JEDNOM CARDU
        # NA GroupPage-U, PRIKAZES I DA LINKUJES BLOG POST PAGE
        title
        path
        updated(fromNow: true) # OVDE MI TREBA UPDATED (KORISTICE)
        # POSTO CES KREIRATI CARD-OVE TVOJI BLOG POSTOVA
        # TREBACE TI DESCRIPTION (MOZDA IKORISTIS BAS TAJ DESCRIPTION)

        frontMatter {
          description
          themeColor # I BOJA MOZE BITI POTREBNA DA SE OZNACI CARD
        }
      }
      ###############  REKAO SAM DA CU IMATI I LINKED KEYWORDS
      # POTREBNO ZA SEO (ukljucujuci gornji description)
      # ALI I ZA LINKING DO OSTALIH GROUP PAGE-OVA
      # ODRAICU GOTOVO ISTU STVAR KAKAVA JE NA
      # FLAVIO COPES SITE-U
      allBlogKeywords {
        keyword
        path
      }
    }
  }
`;

// SADA MOZES DA SE POSVETIS PROSLEDJIVANJU id QUERY VARIJABLE
// I REFERENCIRANJEM KOMPONENTA KOJA TREBA SVE QUERIED PODATKE
// DA RENDER-UJE
