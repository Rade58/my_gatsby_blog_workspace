const withDefaults = require("./utility/utility-options"); // DEFAULTS SU
//                                                         basePath ->  "/""
//                                                   contentPath  -> "blogposts"
//                                                   useExternalMDX  --> false
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");

// AKO NE POSTOJI     contentPATH    blogposts
// ODNOSNO AKO U SITE FOLDERU NE POSTOJI        blogposts    FOLDER
// KREIRATI GA

exports.onPreBootstrap = ({ store }, options) => {};
