import React from "react";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({type, disabled, eventHandler}) => {
  return (
    <div className="button-wrapper">
      <button className={`btn btn--${type}`} disabled={disabled} onClick={eventHandler}>
        search
      </button>
    </div>
  );
};

export default Button;
