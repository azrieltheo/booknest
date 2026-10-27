import { useEffect } from "react";

type Props = {
    message: string;
    type?: "success" | "error";
    onClose: () => void;
};

export default function Toast({ message, type = "success", onClose }: Props) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            role="status"
            aria-live="polite"
            className={`fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg md:bottom-6 ${type === "success" ? "bg-success" : "bg-danger"
                }`}
        >
            {message}
        </div>
    );
}