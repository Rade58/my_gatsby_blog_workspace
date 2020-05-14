module.exports = ({
  basePath = "/",
  contentPath = "blogposts",
  // EVO VIDIS, IME KOJE SAM NAMENIO ZA MDX-OVE, U KOJI
  // CORRESPOND-UJU TO GROUP PAGES
  groupsPath = "grouppages",
  //
  useExternalMDX = false,
}) => ({ basePath, contentPath, groupsPath, useExternalMDX });
