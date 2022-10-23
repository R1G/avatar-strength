import React, {useState} from "react";

export default ({value, label, onChange, isSelected}) => {
    const onClick = () => {
        onChange(value);
    }
    const className = isSelected ? "selected" : "unselected";
    return (<button onClick={onClick} className={className}> {label} </button>);
}