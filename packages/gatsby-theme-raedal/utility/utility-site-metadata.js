module.exports = ({
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
}) => ({
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
});
