import React from "react";

function FontIcon(props) {
  return (
    <i {...props} className="material-icons">
      {props.kind}
    </i>
  );
}

export default FontIcon;
