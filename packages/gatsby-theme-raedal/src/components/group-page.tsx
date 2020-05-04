/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
// dev utility
import StringifiedProps from "./dev-utility/StringifyProps";
//

const GroupPage: FunctionComponent = (props) => <StringifiedProps {...props} />;

export default GroupPage;
