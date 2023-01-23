import React from "react";

export const LoginInputBase = ({name, type, value, label, onChange, extraText, errorM}) => (
  <div className="createAccountInput">
    {errorM && <div className="error">{errorM}</div>}
    <div>{label}</div>
    <input type={type} name={name} value={value} onChange={onChange} />
    {extraText && <div className="extraText">{extraText}</div>}
  </div>
)