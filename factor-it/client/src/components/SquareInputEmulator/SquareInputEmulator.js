import React from "react";
import "./SquareInputEmulator.css"

const SquareInputEmulator = ({ name, children }) => (
    <div className="form-group">
        <div className="square-input-emulator" name={name}>
            <p className="inputTextEmulator">
                {children}
            </p>
        </div>
    </div>
);

export default SquareInputEmulator;
