import { useId, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};

export default function Input({ label, error, className = "", ...rest }: Props) {
    const id = useId();
    const errorId = `${id}-error`;

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium">
                {label}
            </label>
            <input
                id={id}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={`min-h-11 rounded-lg border bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-brand ${error ? "border-danger" : "border-line"
                    } ${className}`}
                {...rest}
            />
            {error && (
                <p id={errorId} role="alert" className="text-sm text-danger">
                    {error}
                </p>
            )}
        </div>
    );
}