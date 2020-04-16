import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

export interface SeoI {
  title: string;
  lang: string;
  description: string;
  themeColor: string;

  drvece: number;
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
