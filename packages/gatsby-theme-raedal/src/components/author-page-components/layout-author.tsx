/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";
import { FunctionComponent, useReducer, Fragment } from "react";
import { $_createAuthorPageReducerState } from "../../context_n_reducers/author_page_con_red";
import { AuthorPageDataI } from "../../templates/author-page-template";

const AuthorLayout: FunctionComponent<{ authorPage: AuthorPageDataI }> = (
  props
) => {
  const { authorPage } = props;

  const {
    AuthorPageStateProvider,
    authorPageReducer,
    defaultReducerState,
  } = $_createAuthorPageReducerState;

  const [reducedState, dispatch] = useReducer(
    authorPageReducer,
    defaultReducerState
  );

  console.log(dispatch);

  return (
    <Fragment>
      <AuthorPageStateProvider
        value={{ authorPage, reducedState, authorPageDispatch: dispatch }}
      >
        <pre>{JSON.stringify({ data: authorPage, reducedState }, null, 2)}</pre>
        <pre>{JSON.stringify(dispatch, null, 2)}</pre>
      </AuthorPageStateProvider>
    </Fragment>
  );
};

export default AuthorLayout;
