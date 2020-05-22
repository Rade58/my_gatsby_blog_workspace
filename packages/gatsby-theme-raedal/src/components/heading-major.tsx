/** @jsx jsx */
import { jsx } from "theme-ui";
import { useContext, FunctionComponent } from "react";
import { css } from "@emotion/core";
import { Link } from "gatsby";
import styled from "@emotion/styled";
//
import { $_useBlogPostReducerState } from "../context_n_reducers/context_n_reducer_blog_post";
//

const HeadingMajor: FunctionComponent = () => {
  const { blogPostContext } = $_useBlogPostReducerState;
  const { createdAt, isUpdated, updated, seo, groupPage } = useContext(
    blogPostContext
  );
  const { title, themeColor } = seo;
  const { icon, path } = groupPage;

  return (
    <section className="major-heading">
      <h1>{title}</h1>
      <h3>{createdAt}</h3>
      {isUpdated ? <h3>{updated}</h3> : null}
      <Link to={path}>
        <img src={`data:image/svg+xml;base64,${icon}`} alt="group-icon" />
      </Link>
      <div
        css={css`
          border: ${themeColor} solid 12px;
        `}
      />
    </section>
  );
};

export default HeadingMajor;
