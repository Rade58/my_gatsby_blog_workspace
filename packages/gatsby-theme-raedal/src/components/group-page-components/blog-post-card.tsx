/** @jsx jsx */
import { jsx } from "theme-ui";
import { css } from "@emotion/core";

import { Link } from "gatsby";

import { FunctionComponent } from "react";

// typescript PropS TYPE
import { BlogPostPageI as BlogPostCardPropsI } from "../../templates/group-page-template";
//

const BlogPostCard: FunctionComponent<BlogPostCardPropsI> = (props) => {
  const { path, title, frontMatter } = props;

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
        }
      `}
    >
      <Link to={path}>
        <h4>{title}</h4>
        <p>{description}</p>
      </Link>
    </div>
  );
};

export default BlogPostCard;
