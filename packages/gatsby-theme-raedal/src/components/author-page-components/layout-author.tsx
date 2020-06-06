/** @jsx jsx */
import { jsx } from "theme-ui";
import { css, Global } from "@emotion/core";
import { Fragment, FunctionComponent } from "react";
import AuthorSeo from "../../seo/author-seo";
import { additionalStyles } from "../../common-styles";

const LayoutAuthor: FunctionComponent = () => {
  const { bodyBackgroundColor } = additionalStyles;

  return (
    <Fragment>
      <AuthorSeo />
      <Global
        styles={{
          body: {
            backgroundColor: bodyBackgroundColor,
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          },
        }}
      />
      <div>Something</div>
    </Fragment>
  );
};

export default LayoutAuthor;
