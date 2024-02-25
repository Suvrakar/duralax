import React from "react";

const TextInput = ({
  label,
  id,
  name,
  type,
  placeholder,
  autoFocus,
  error,
  icon,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className={`input-group input-group-merge`}>
        <input
          type={type}
          className={`form-control ${error ? "is-invalid" : ""}`}
          id={id}
          placeholder={placeholder}
          autoFocus={autoFocus}
          {...rest} // Spread the rest of the props, including onChange, onBlur, and value
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
