import type { ButtonHTMLAttributes } from "react";


// Optional: utility function to join classes
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "icon";
};

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const base =
    "px-4 py-2 rounded-md font-medium transition-all disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    icon: "p-2 bg-transparent hover:bg-gray-100 text-gray-600",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
};
