import React from "react";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({type, disabled, eventHandler, text}) => {
  return (
    <div className="button-wrapper">
      <button className={`btn btn--${type}`} disabled={disabled} onClick={eventHandler}>
        {text}
      </button>
    </div>
  );
};

export default Button;
