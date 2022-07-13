import { ChangeEventHandler, MouseEventHandler } from "react";

interface ButtonProps {
  type: string;
  disabled: boolean;
  eventHandler: MouseEventHandler<HTMLButtonElement>;
}

interface ContextSearch {
  inputChangeHandler: ChangeEventHandler<HTMLInputElement>;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  criteria: string
}

export type { ButtonProps, ContextSearch };


