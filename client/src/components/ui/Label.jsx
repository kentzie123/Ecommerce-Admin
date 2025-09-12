import React from "react";

const Label = ({ className, labelName}) => {
  return (
    <label className={`${className} opacity-85`}>
      {labelName}
      <span className="text-red-500 ml-1">*</span>
    </label>
  );
};

export default Label;
