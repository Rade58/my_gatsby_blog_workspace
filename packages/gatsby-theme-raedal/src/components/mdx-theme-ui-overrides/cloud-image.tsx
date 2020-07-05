/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { FunctionComponent, useContext } from "react";
import GatsbyImage, { FluidObject } from "gatsby-image";
import { $_useBlogPostReducerState } from "../../context_n_reducers/context_n_reducer_blog_post";
import placeholderURI from "../../images/placeholder.jpg";

const CloudImage: FunctionComponent = (props) => {
  const { children } = props;

  const imageNumber = parseInt(children as string, 10);

  const { blogPostContext } = $_useBlogPostReducerState;

  const { cloudinaryArray } = useContext(blogPostContext);

  console.log(imageNumber);

  return cloudinaryArray[imageNumber] ? (
    <GatsbyImage
      fluid={cloudinaryArray[imageNumber].cloudinary.fluid}
      alt="cloud image"
    />
  ) : (
    <img
      src={placeholderURI}
      alt="placeholder"
      css={css`
        width: 100%;
      `}
    />
  );
};

export default CloudImage;
