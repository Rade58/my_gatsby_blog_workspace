/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import BackgroundImage, { IFluidObject } from "gatsby-background-image";

const Hero: FunctionComponent<{ hero?: IFluidObject }> = (props) => {
  const { hero } = props;

  const [heroImage, setHeroImage] = useState<string>("");

  const loadImage = useCallback(async () => {
    if (!hero) {
      const myModule = await import("../images/placeholder.jpg");
      return setHeroImage(myModule.default);
    }
  }, [hero]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  return !hero ? (
    <div
      css={css`
        width: 100%;
        background-image: url(..${heroImage});
        background-position-x: 19%;
        background-position-y: 19%;
        background-repeat: no-repeat;
        background-size: 138%;
        height: 38vh;
        border: pink solid 0px;

        margin-top: 2vh;
      `}
    />
  ) : (
    <BackgroundImage fluid={hero} Tag="div" />
  );
};

export default Hero;
