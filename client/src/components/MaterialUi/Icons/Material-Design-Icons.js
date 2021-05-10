import React from "react";

MaterialIcon = (props) => {
  return (
    <i {...props} className="material-icons">
      {props.kind}
    </i>
  );
};

export default MaterialIcon;
