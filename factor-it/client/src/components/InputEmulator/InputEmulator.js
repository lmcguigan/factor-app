import React from "react";
import "./InputEmulator.css";

const InputEmulator = ({ name, children }) => (
    <div className="inputEmulator" name={name}>
        <p className="inputTextEmulator">
            {children}
        </p>
    </div>
);

export default InputEmulator;
