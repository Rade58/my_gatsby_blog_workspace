/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";

const CloudImage: FunctionComponent<{ metastring: string }> = (props) => {
  const { metastring } = props;

  console.log({ props }); // NEMA METASTRINGA ALI IMA ID ZATO STO JE HEADER

  // ALI VAZNIJE JE DA IMA CHILDREN

  // ALI ZASTO NE BIH RENDER-OVAO CUSTOM KOMPONENTU, SA NUMERACIJAM, BEZ DA OVERIDE-UJEM BILO STA

  return <h6>Nesto</h6>;
};

export default CloudImage;
