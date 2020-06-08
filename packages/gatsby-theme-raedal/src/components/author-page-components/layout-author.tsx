/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { css, Global } from "@emotion/core";
import { Fragment, FunctionComponent } from "react";
import AuthorSeo from "../../seo/author-seo";
import { additionalStyles } from "../../common-styles";
import theme from "../../gatsby-plugin-theme-ui/index";
import Header from "./header-author";
import Main from "./main-author";

const LayoutAuthor: FunctionComponent = () => {
  const { bodyBackgroundColor } = additionalStyles;

  return (
    <Fragment>
      <AuthorSeo />
      <ThemeProvider theme={theme}>
        <Global
          styles={{
            body: {
              backgroundColor: bodyBackgroundColor,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            },
          }}
        />
        {/* <div>Something</div> */}
        {/* MESTO ZA HEADER I MAIN */}
        <Header />
        <Main />
      </ThemeProvider>
    </Fragment>
  );
};

export default LayoutAuthor;
