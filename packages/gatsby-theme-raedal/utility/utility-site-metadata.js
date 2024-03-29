module.exports = ({
  // ZA authot page
  // DEFAULTS KOJI SU TU ODNOSICE SE NA MENE (I OVO CE BITI KA OSAFEGUARD AKO SAM ZABORAVIO NESTO DA DODAM)
  authorID = null,
  authorName = "Rade Bajic",
  about = "Rade is a web developer that is passionate about learning through teaching. Favorite technologies: Typescript, GraphQL and ones he discovered in the meantime.",
  github = "https://github.com/Rade58",
  twitter = "https://twitter.com/ra_decodes",
  instagram = "https://www.instagram.com/rade_writes_code/",
  facebook = null,
  linkedin = null,
  youtube = null,
  personalWebsite = null,
  // -------------------------------------
  author = null,
  ordinalG = 0,
  createdAt = new Date(),
  lang = "en",
  description = "raedal",
  themeColor = "#455A64",
  group = null, // NAJBOLJE JE DA DEFAULT BUDE null
  groupColor = "#e04681",
  keywordTextColor = "#fff",
  keywordBorderColor = "crimson",
  underlineColor = "olive",

  // ARRAY SLIKA SA CLOUDINARY-JA
  cloudImagesArrayName = "",
}) => ({
  author,
  ordinalG,
  createdAt,
  lang,
  description,
  themeColor,
  group,
  groupColor,
  keywordTextColor,
  keywordBorderColor,
  underlineColor,
  //
  authorID,
  authorName,
  about,
  github,
  twitter,
  instagram,
  facebook,
  linkedin,
  youtube,
  personalWebsite,
  //
  cloudImagesArrayName,
});
