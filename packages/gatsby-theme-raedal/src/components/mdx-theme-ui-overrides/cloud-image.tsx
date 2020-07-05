/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useContext } from "react";
import GatsbyImage, { FluidObject } from "gatsby-image";
import { $_useBlogPostReducerState } from "../../context_n_reducers/context_n_reducer_blog_post";

const CloudImage: FunctionComponent = (props) => {
  const { children } = props;

  const imageNumber = parseInt(children as string, 10);

  const { blogPostContext } = $_useBlogPostReducerState;

  const { cloudinaryArray } = useContext(blogPostContext);

  console.log(imageNumber);

  return (
    <GatsbyImage
      fluid={cloudinaryArray[imageNumber].cloudinary.fluid}
      alt="cloud image"
    />
  );
};

export default CloudImage;
