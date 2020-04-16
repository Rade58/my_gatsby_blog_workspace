import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

// OVAJ INTERFACE KORISTIM U VISE KOMPONENTI TAKO, KADA GA PROMENIS, UTICACE I
// NA SLEDECE FAJLOVE TAKODJE
// <   packages/gatsby-theme-raedal/src/templates/blog-post-template.tsx  >
// <   packages/gatsby-theme-raedal/src/components/blog-post.tsx   >
export interface SeoI {
  title: string;
  lang: string;
  description: string;
  themeColor: string;
}

const Seo: FunctionComponent<SeoI> = ({
  title,
  lang,
  description,
  themeColor,
}) => (
  <Helmet>
    <html lang={lang} />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content={themeColor} />
  </Helmet>
);

export default Seo;
