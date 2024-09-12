import { ReactNode } from "react";

export type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick }: ButtonProps): JSX.Element {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
