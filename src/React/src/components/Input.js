import React from "react";

const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.icon} {props.title}
      </label>
      <br />
      <input
        className="form-input"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <br />
      <label
        htmlFor={props.name}
        className="form-label text-muted"
        style={{ fontSize: 12 }}
      >
        {props.textmuted}
      </label>
    </div>
  );
};

export default Input;
