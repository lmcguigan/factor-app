import React from 'react';
import "./NumberCircle.css";

export const NumberCircle = props => (
    <div className="number-circle">
        {props.stepnum}
    </div>
);

export default NumberCircle;