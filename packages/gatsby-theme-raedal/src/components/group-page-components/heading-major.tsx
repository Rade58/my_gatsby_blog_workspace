/** @jsx jsx */
import { jsx } from "theme-ui";

import { FunctionComponent, useContext } from "react";

import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

const HeadingMajor: FunctionComponent = () => {
  const { groupPageContext } = $_useGroupPageState;

  const { groupPage } = useContext(groupPageContext);

  const { name } = groupPage; // NAME CE BITI ONO STA JE U TITLE-U
  // DOBRA IDEJA JE DA OVDE STAVIS I EMOJI
  // ODNOSNO SVAKI PAGE TREBA DA IMA KARAKTERISTICAN EMOJI

  return <h1 className="heading-major">{name}</h1>;
};

export default HeadingMajor;
