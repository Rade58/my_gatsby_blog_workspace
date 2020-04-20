/** @jsx jsx */

import { jsx } from "theme-ui";

import { useStaticQuery, graphql, Link } from "gatsby";

import { FunctionComponent, Fragment } from "react";

import NavInHeader from "../components/nav-header";

interface DataI {
  allPosts: {
    nodes: { title: string; path: any }[];
  };
}

const TableOfContent: FunctionComponent = () => {
  const data: DataI = useStaticQuery(graphql`
    query TableOfContentQuery {
      allPosts: allBlogPostPage {
        nodes {
          title
          path
        }
      }
    }
  `);

  return (
    <NavInHeader>
      <Fragment>
        {data.allPosts.nodes.map(({ title, path }) => (
          <Link to={path}>{title}</Link>
        ))}
      </Fragment>
    </NavInHeader>
  );
};

export default TableOfContent;
