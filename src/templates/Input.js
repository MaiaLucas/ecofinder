import React from "react";

export default (props) => {
  const handleChange = (e) => {
    props.func(e);
  };
  return (
    <div className={props.classGroup}>
      <label htmlFor={props.id}>{props.title}</label>
      <input
        type={props.type}
        className={props.classInput}
        id={props.id}
        name={props.name}
        required={props.required}
        defaultValue={props.value}
        onKeyUp={(e) => handleChange(e)}
        placeholder={props.placeholder}
      />
    </div>
  );
};
