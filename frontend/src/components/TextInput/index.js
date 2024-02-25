import React from "react";

const TextInput = ({
  label,
  id,
  type,
  placeholder,
  autoFocus,
  error,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
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
  );
};

export default TextInput;
