# NAPRAVI OSAM OVAKAV QUERY (KAO STO JE DOLE) U PROSLOM BRANCH-U A SADA BI TREBAO DA NAPRAVIM FIELD, KOJI CE UPRAVO BITI U SKLADU SAM TIM QUERY-JEM 

```php
query authorPosts($authorID: ID!){
  allBlogPostPage(
    limit: 10,
    sort: {order: DESC, fields: updated},
		filter: {
      author: {authorID: {eq: $authorID}}
    }
  ){
    	# NE ZNA MDA LI JE OVO SVE STO CE MI BITI POTREBNO
    	# NAJBOLJE JE DA DOBRO PORAZMISLIM
    	# STA MI JOS MOZE TREBATI
  		nodes {
        
        createdAt(formatString: "MMM Do, Y")
        updated(fromNow: true)

        # TREBA MI PATH I TITLE ZA SVAK IGROUP PAGE
        # DA BI NAPRAVIO LINK
        path
        title
        # OVAJ FIELD SAM RANIJE DEFINISAO KAO frontMatter
        # MOZDA JE TO BILO GLUPO OD MENE
        # MOZDA JE MALO MISLEADING, AL IZNAM STA JE UNDER HIM
        frontMatter {
          # OVO JE ZATO STO CU NAPRAVITI CARD
          #ZA POMENUTI POST (MOZDA BI TREBAL ODA IMA
        	# KRATAK DESCRIPTION)
          description
          themeColor
        }
        # U COSKU CARDA CE BITI DUGME ZA GRUPU
        # KOJOJ TI POSTOVI PRIPADAJU
      
        groupPage {
          # OVO MI TREBA DA FORMIRAM LINK DO GROUP PAGE
          path
          name   # OVO MOZDA NE TREBA JER CU
          # IPAK DISPLAY-OVATI SLEDECI ICON
          icon
          underlineColor
        }
        
        
      }
    
  }
}

# QUERY SAM USPESNO EXECUTE-OVAO


#   AKO NE MOZES DA SHVATIS STA GORE RADIM RECI CU SLEDECE:

# SORT-UJEM ONO STO JE QUERIED PREMA createdAt FIELD-U U DESCENDING OREDERU (ON NAJRANIJEG PA NADALJE)
# A QUERY-UJEM POST-OVE PREMA author FIELDU, A POSTO JE TO OBJECT TYLRE (TO JE USTVARI AUTHOR PAGE OBJEKAT, MORAM DA QUERY-UJEM PREMA NEKO 
# MNJEGOVOM FIELD-U) (A TO JE authorID)
# I NARAVNO ZELIM SAMO 10 BLOG POSTOVA ZATO SAM LIMITIRAO NA 10

```

# TREBAM DAKLE DA URADIM SLEDECE

- NAPRAVIM NOVI TYPE, KOJI CE IMATI FIELD-OVE U SKLADU SA GORE QUERIED VREDNSOTIMA

- TREBA DA ZADAM TAJ TYPE NA ODGOVARAJUCEM FIELD-U NA `AuthorPage` TYPE-U

- TREBAM DA NAPISEM RESOLVER-A ZA TAJ FIELD **U TOM RESOLVERU PRAVIM UPRAVO GORNJI QUERY**

- *`POSTO createdAt I updated ZAHTEVAJU ARGUMENTE, JA CU NAPRAVITI RESOLVERE I ZA NJIH`* (**IPAK NECU OVO JE TROSENJE VREMENA**)

NE TREBAJU MI RESOLVERI, VEC TREBAM DA IMAM FIELD-OVE

```php
createdAt: Date! @dateformat
updated: Date! @dateformat
```

I KADA BUDEM QUERY-EOVAO ZA NJIMA ZADACU IM ARGUMENTE

BILO BI GUBLJENJE VREMENA DA PISEM RESOLVERE

JER NE ZNAM KAKV BI UOPSTE QUERY PRAVIO U RESOLVER-I I STA BIH VRACAO (**ZASTO PRAVITI RESOLVER ZA NESTO STA VEC IMAS**)

# KADA TO ZAVRSIS MOZES PROSIRITI AUTHOR PAGE TEMPLATE QUERY, KAKO BI PROSIRIO POSTOJECI QUERY

SAM ODA TI KAZEM DA ONAJ `runQuery` FROM RESOLVER, NE MOZE PRIHVATATI limit KAO ARGUMENT

A INSIDE `sort` ONI PROPERTIJI order I fields TREBAJU DA BUDU NIZOVI

TAKO DA SAM PRIBLIZAN QUERY ONOM GORE NAPRAVIO OVAKO

```js

const resultArray = await context.nodeModel.runQuery({
  type: "BlogPostPage",
  query: {
    // limit: "10",   // OVO JE IZBACENO
    sort: { order: ["DESC"], fields: ["updated"] },     // A OVO UNUTRA SU NIZOVI KAO STO VIDIS (MORAJU BITI NIZOVI)
    filter: { author: { authorID: { eq: authorID } } },
  },
});
```

DAKLE LIMIT JA MOGU SAM OBAVITI PROGRAMATICALLY, NIJE NIKAKV PROBLEM

# USTVARI MORAM NAPRAVITI JOS JEDAN QUERY A TO JE ONAJ ZA GRPOUP PAGE-OM

SECAS SE I ZA SAMOG groupPage NA `BlogPostPage` TYPE TI SI PISAO RESOLVER-A, E PA NIJE TI ON OVDE DOSTUPAN

MORAS NAPRAVITI QUERY, AL IDOBRO JE DA IMAS name GROUP PAGE ADOSTUPAN

# USPESNO SAM KREIRAO POMENUTOG RESOLVERA, A SADA CU DA PROSIRIM QUERY U TEMPLATE-U

ALI MORAO SAM DA KORISTIM LOOP DA BIH I U LOOP-U PRAVIO INDIVIDUALNE QUERY-JE ZA GROUP PAGE-OVIMA

EVO NA KRAJU KAKVOG SAM RESOLVER-A DEVELOP-OVAO

```js
lastTenPosts: {
  type: "[OneOfLastTenPosts]!",
  resolve: async (source, args, context, next) => {
    const { authorID } = source;

    const resultArrayBlogPost = await context.nodeModel.runQuery({
      type: "BlogPostPage",
      query: {
        // limit: "10",
        sort: { order: ["DESC"], fields: ["updated"] },
        filter: { author: { authorID: { eq: authorID } } },
      },
    });

    // console.log(resultArray);

    const arrayOfPromises = [];

    for (let i = 0; i < 10; i += 1) {
      const {
        groupPage,
        frontMatter,
        createdAt,
        updated,
        path,
        title,
      } = resultArrayBlogPost[i];
      const { name: groupPageName } = groupPage;

      const { description, themeColor } = frontMatter;

      arrayOfPromises.push(
        new Promise((res, rej) => {
          context.nodeModel
            .runQuery({
              type: "GroupPage",
              query: {
                filter: {
                  name: { eq: groupPageName },
                },
              },
            })
            .then((groupPageResult) => {
              const {
                path: groupPath,
                name,
                icon,
                underlineColor,
              } = groupPageResult;

              return res({
                group: {
                  path: groupPath,
                  name,
                  icon,
                  underlineColor,
                },
                description,
                themeColor,
                createdAt,
                updated,
                path,
                title,
              });
            })
            .catch((error) => rej(error));
        })
      );
    }

    return Promise.all(arrayOfPromises);
  },
},
```


# ZATIM PROSIRUJEM SVE TYPESCRIPT INTERFACE-OVE



########

***

MOZDA CU IPAK KORISTITI OCTICON ZA PLACEHOLDER IMAGE

***
