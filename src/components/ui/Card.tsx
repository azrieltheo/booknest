import type { HTMLAttributes } from "react";

export default function Card({
    className = "",
    children,
    ...rest
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`rounded-xl border border-line bg-white p-4 ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
}