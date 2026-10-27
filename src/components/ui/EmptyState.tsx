import type { ReactNode } from "react";

type Props = {
    title: string;
    message: string;
    action?: ReactNode;
};

export default function EmptyState({ title, message, action }: Props) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line bg-white px-6 py-12 text-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="max-w-sm text-sm text-muted">{message}</p>
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}