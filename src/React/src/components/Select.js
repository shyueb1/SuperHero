import React from 'react';

const Select = props => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.title}</label>
            <br />
            <select name={props.name} value={props.value} onChange={props.onChange}>
                <option value="" disabled>
                    {props.placeholder}
                </option>
                {props.options.map((option, index) => {
                    return (
                        <option key={index} value={option} label={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
            <br />
            <label htmlFor={props.name} className="form-label text-muted" style={{ fontSize: 12 }}>
                {props.textmuted}
            </label>
        </div>
    );
};

export default Select;