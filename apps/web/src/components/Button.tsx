const variantColors = {
  primary: "bg-green-600 hover:bg-green-700",
  secondary: "bg-gray-600 hover:bg-gray-700",
  danger: "bg-red-600 hover:bg-red-700",
};

const Button = ({
  variant = "primary",
  disabled,
  children,
  ...props
}: {
  variant?: keyof typeof variantColors;
  disabled?: boolean;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      className={`
        flex flex-row items-center justify-center gap-2 rounded-lg py-2 px-10 text-base font-semibold text-white cursor-pointer disabled:opacity-50 text-center 
        ${variantColors[variant]}
      `}
      onClick={props.onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
