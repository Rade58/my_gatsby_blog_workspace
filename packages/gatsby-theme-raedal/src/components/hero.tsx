/** @jsx jsx */
import { jsx } from "theme-ui";
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
    <img sx={{ width: "100%" }} src={heroImage} alt="slika" />
  ) : (
    <BackgroundImage fluid={hero} Tag="div" />
  );
};

export default Hero;
