import React, {useState} from "react";
import { GetSVGShapes } from "../lib/Util";

export default ({id, group, onClick}) => {
    return (                
        <g id={id} fill={group==id ? "blue" : "cyan"} onClick={() => onClick(id)}>
            {GetSVGShapes(id)}
        </g>
    );
}