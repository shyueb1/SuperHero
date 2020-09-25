import React from "react";

const TextArea = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <br />
      <textarea
        className="form-textarea"
        id={props.name}
        name={props.name}
        value={props.value}
        rows={props.rows}
        cols={props.cols}
        onChange={props.onChange}
      />
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

export default TextArea;
