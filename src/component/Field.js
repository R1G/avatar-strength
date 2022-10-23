import React from "react";

export default ({onChange, placeholder, value}) => {
    const handleChange = (e) => {
      onChange(e.target.value);
    }
  
    return (
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleChange} 
      />
    );
};