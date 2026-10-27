import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    loading?: boolean;
};

const styles = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    secondary: "border border-line bg-white text-ink hover:bg-brand-soft",
    ghost: "text-brand hover:bg-brand-soft",
};

export default function Button({
    variant = "primary",
    loading = false,
    disabled,
    className = "",
    children,
    type = "button",
    ...rest
}: Props) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            aria-busy={loading}
            className={`inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
            {...rest}
        >
            {loading ? "Memproses..." : children}
        </button>
    );
}