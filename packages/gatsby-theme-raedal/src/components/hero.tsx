/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import BackgroundGatsbyImage, { IFluidObject } from "gatsby-background-image";

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

  return (
    <div
      className="hero-container"
      css={css`
        border: crimson solid 0px;
      `}
    >
      {!hero ? (
        <div
          css={css`
            background-image: url(..${heroImage});
            background-position-x: 40%;
            background-position-y: 19%;
            background-repeat: no-repeat;
            background-size: 138%;
            background-attachment: scroll;

            box-shadow: 0 4.9px 3.6px -23px rgba(0, 0, 0, 0.063),
              0 6.5px 10px -23px rgba(0, 0, 0, 0.09),
              0 7.6px 24.1px -23px rgba(0, 0, 0, 0.117),
              0 15px 80px -23px rgba(0, 0, 0, 0.18);

            width: 100%;
            height: 38vh;
            border: pink solid 0px;

            border-radius: 2px;

            margin-top: 2vh;
          `}
        />
      ) : (
        <BackgroundGatsbyImage fluid={hero} Tag="div" />
      )}
    </div>
  );
};

export default Hero;
