import Link from "next/link";
import { useCallback, useState } from "react";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import NoteList from "@/components/book/NoteList";
import { useNotes } from "@/hooks/useNotes";
import type { Note, NoteType } from "@/types";

type Filter = "semua" | NoteType;

const filters: { nilai: Filter; label: string }[] = [
    { nilai: "semua", label: "Semua" },
    { nilai: "catatan", label: "Catatan" },
    { nilai: "kutipan", label: "Kutipan" },
    { nilai: "ulasan", label: "Ulasan" },
];

export default function Catatan() {
    const { notes, siap, hapus } = useNotes();
    const [filter, setFilter] = useState<Filter>("semua");
    const [pesan, setPesan] = useState("");
    const tutupToast = useCallback(() => setPesan(""), []);

    const tampil = notes.filter((n) => filter === "semua" || n.type === filter);
    const jumlah = (f: Filter) =>
        f === "semua" ? notes.length : notes.filter((n) => n.type === f).length;

    function hapusCatatan(n: Note) {
        if (!window.confirm("Hapus catatan ini?")) return;
        hapus(n.id);
        setPesan("Catatan dihapus");
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Catatan</h1>
                <p className="text-sm text-muted">
                    Catatan, kutipan, dan ulasan dari semua bukumu.
                </p>
            </div>

            <div role="group" aria-label="Filter jenis" className="flex flex-wrap gap-2">
                {filters.map((f) => (
                    <button
                        key={f.nilai}
                        type="button"
                        aria-pressed={filter === f.nilai}
                        onClick={() => setFilter(f.nilai)}
                        className={`min-h-11 rounded-full border px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${filter === f.nilai
                                ? "border-brand bg-brand text-white"
                                : "border-line bg-white text-muted hover:bg-brand-soft"
                            }`}
                    >
                        {f.label} ({jumlah(f.nilai)})
                    </button>
                ))}
            </div>

            {!siap ? (
                <div className="space-y-3">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-24" />
                </div>
            ) : tampil.length === 0 ? (
                <EmptyState
                    title="Belum ada catatan"
                    message="Catatan ditulis dari halaman Pembaca. Buka buku di rakmu, lalu tulis catatan pertamamu."
                    action={
                        <Link
                            href="/rak"
                            className="inline-flex min-h-11 items-center rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark"
                        >
                            Ke Rak Saya
                        </Link>
                    }
                />
            ) : (
                <NoteList notes={tampil} onDelete={hapusCatatan} tampilkanBuku />
            )}

            {pesan && <Toast message={pesan} onClose={tutupToast} />}
        </div>
    );
}