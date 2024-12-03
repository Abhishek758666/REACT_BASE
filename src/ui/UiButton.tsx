import {
  CSSProperties,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";

type TButtonTypes =
  | "primary"
  | "error"
  | "plain"
  | "warning"
  | "success"
  | "secondary"
  | "detail";

interface UIButtonProps {
  children?: ReactNode;
  id?: string;
  label?: string | ReactNode;
  style?: CSSProperties;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: TButtonTypes;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  disabled?: boolean;
}

const buttonStyles: Record<TButtonTypes, string> = {
  primary:
    "bg-blue-500 hover:bg-blue-600 text-white border border-blue-500 rounded-lg",
  error:
    "bg-red-500 hover:bg-red-600 text-white border border-red-500 rounded-lg",
  plain: "bg-transparent text-gray-700 hover:text-gray-900",
  warning:
    "bg-yellow-500 hover:bg-yellow-600 text-white border border-yellow-500 rounded-lg",
  success:
    "bg-green-500 hover:bg-green-600 text-white border border-green-500 rounded-lg",
  secondary:
    "bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 rounded-lg",
  detail:
    "bg-purple-500 hover:bg-purple-600 text-white border border-purple-500 rounded-lg",
};

export default function UIButton({
  href,
  id,
  label,
  onClick,
  style,
  type = "plain",
  className,
  disabled,
  target,
}: UIButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const disabledStyle = "opacity-50 cursor-not-allowed pointer-events-none";
  const finalStyle = `${baseStyle} ${buttonStyles[type]} ${
    disabled ? disabledStyle : ""
  } ${className ?? ""}`;

  return href ? (
    <Link
      id={id}
      to={href}
      className={finalStyle}
      style={style}
      target={target}
    >
      {label}
    </Link>
  ) : (
    <button
      id={id}
      className={finalStyle}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
