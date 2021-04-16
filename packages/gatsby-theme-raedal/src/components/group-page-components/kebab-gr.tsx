/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import Octicon, { getIconByName } from "@primer/octicons-react";
import { useContext, FunctionComponent } from "react";
import { $_useGroupPageState } from "../../context_n_reducers/group_page_con_red";

const Kebab: FunctionComponent = () => {
  const { GROUP_PAGE_ACTIONS, groupPageContext } = $_useGroupPageState;
  const { groupPageDispatch, groupPage } = useContext(groupPageContext);
  const kebab = getIconByName("kebab-horizontal");
  const { groupColor } = groupPage;

  return (
    <div
      onClick={() => {
        groupPageDispatch({
          type: GROUP_PAGE_ACTIONS.TOGGLE_KEYWORDS_MODAL,
          payload: true,
        });
      }}
      onKeyPress={() => {
        groupPageDispatch({
          type: GROUP_PAGE_ACTIONS.TOGGLE_KEYWORDS_MODAL,
          payload: true,
        });
      }}
      role="button"
      tabIndex={0}
      className="kebab"
      aria-label="kebab"
      css={css`
        cursor: pointer;
        display: flex;

        @media screen and (min-width: 918px) {
          display: none;
        }

        & span {
          color: ${groupColor};
          align-self: center;
        }
      `}
    >
      <span>
        <Octicon icon={kebab} size="medium" />
      </span>
    </div>
  );
};

export default Kebab;
