import React, { useContext, FunctionComponent } from "react";

import { Helmet } from "react-helmet";

import { $_useGroupPageState } from "../context_n_reducers/group_page_con_red";

const GroupSeo: FunctionComponent = () => {
  const { groupPageContext } = $_useGroupPageState;

  const { groupPage } = useContext(groupPageContext);

  const { name, lang, description, groupColor } = groupPage;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{name}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content={groupColor} />
    </Helmet>
  );
};

export default GroupSeo;
