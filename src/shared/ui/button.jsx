import React from "react";

const variants = {
  default: "bg-orange-700 text-white hover:bg-orange-600",
  secondary: "bg-slate-300 text-gray-900 hover:bg-gray-50",
  ghost: "hover:bg-slate-700 hover:text-slate-50",
  destructive: "bg-red-500 text-white hover:bg-red-600"
};

const sizes = {
  default: "h-10 py-2 px-4",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "h-10 w-10"
};

const Button = React.forwardRef(({ 
  className = "", 
  variant = "default", 
  size = "default", 
  disabled = false,
  type = "button",
  onClick,
  children,
  ...props 
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center 
    rounded-md text-sm font-medium 
    transition-colors focus-visible:outline-none 
    focus-visible:ring-2 focus-visible:ring-orange-500 
    focus-visible:ring-offset-2 disabled:opacity-50 
    disabled:pointer-events-none
  `;

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };