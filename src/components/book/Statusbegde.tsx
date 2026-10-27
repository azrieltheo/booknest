import type { ReadingStatus } from "@/types";

const label: Record<ReadingStatus, string> = {
    ingin: "Ingin Baca",
    sedang: "Sedang Dibaca",
    selesai: "Selesai",
};

const warna: Record<ReadingStatus, string> = {
    ingin: "bg-brand-soft text-brand-dark",
    sedang: "bg-amber-100 text-amber-900",
    selesai: "bg-green-100 text-success",
};

export default function StatusBadge({ status }: { status: ReadingStatus }) {
    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${warna[status]}`}
        >
            {label[status]}
        </span>
    );
}