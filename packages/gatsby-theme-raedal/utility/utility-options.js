module.exports = ({
  basePath = "/",
  contentPath = "blogposts",
  // EVO VIDIS, IME KOJE SAM NAMENIO ZA MDX-OVE, U KOJI
  // CORRESPOND-UJU TO GROUP PAGES
  groupsPath = "grouppages",
  //
  // author pages folder
  authorsPath = "authors",
  //
  deviconsInUse = "devicons-in-use",
  authorsPictures = "authors-images",
  socialSvgs = "social-icons",
  useExternalMDX = false,
}) => ({
  basePath,
  contentPath,
  groupsPath,
  authorsPath,
  useExternalMDX,
  deviconsInUse,
  authorsPictures,
  socialSvgs,
});
