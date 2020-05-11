/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { Link } from "gatsby";

import { FunctionComponent } from "react";

// typescript PropS TYPE
import { BlogPostPageI as BlogPostCardPropsI } from "../../templates/group-page-template";
//

const BlogPostCard: FunctionComponent<BlogPostCardPropsI> = (props) => {
  const { path, title, frontMatter, updated } = props; // EVO KORISTIM I updated

  const { description, themeColor } = frontMatter;

  return (
    <div
      sx={{
        border: `${themeColor} solid 4px`,
      }}
      css={css`
        display: flex;

        & {
          h4 {
            font-size: 28px;
          }

          h3 {
            align-self: flex-end;
            margin-left: auto;
          }
        }
      `}
    >
      <Link to={path}>
        <h4>{title}</h4>
        <p>{description}</p>
      </Link>
      <h3>{updated}</h3>
    </div>
  );
};

export default BlogPostCard;
