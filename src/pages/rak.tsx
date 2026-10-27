import Link from "next/link";
import { useCallback, useState } from "react";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import RakItem from "@/components/book/RakItem";
import Rekomendasi from "@/components/book/Rekomendasi";
import { useShelf } from "@/hooks/useShelf";
import { getBookById } from "@/data/books";
import type { ReadingStatus } from "@/types";

const tabs: { nilai: ReadingStatus; label: string; kosong: string }[] = [
    { nilai: "ingin", label: "Ingin Baca", kosong: "Belum ada buku yang ingin kamu baca." },
    { nilai: "sedang", label: "Sedang Dibaca", kosong: "Belum ada buku yang sedang dibaca." },
    { nilai: "selesai", label: "Selesai", kosong: "Belum ada buku yang selesai dibaca." },
];

export default function RakSaya() {
    const { items, siap, hapus } = useShelf();
    const [tab, setTab] = useState<ReadingStatus>("ingin");
    const [pesan, setPesan] = useState("");
    const tutupToast = useCallback(() => setPesan(""), []);

    function hapusDariRak(bookId: string, judul: string) {
        if (!window.confirm(`Hapus "${judul}" dari rak?`)) return;
        hapus(bookId);
        setPesan("Buku dihapus dari rak");
    }

    const jumlah = (s: ReadingStatus) => items.filter((i) => i.status === s).length;
    const tampil = items.filter((i) => i.status === tab);
    const tabAktif = tabs.find((t) => t.nilai === tab)!;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Rak Saya</h1>
                <p className="text-sm text-muted">{items.length} buku di rakmu.</p>
            </div>

            <div role="tablist" aria-label="Status membaca" className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                    <button
                        key={t.nilai}
                        type="button"
                        role="tab"
                        aria-selected={tab === t.nilai}
                        aria-controls="panel-rak"
                        onClick={() => setTab(t.nilai)}
                        className={`min-h-11 rounded-full border px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${tab === t.nilai
                                ? "border-brand bg-brand text-white"
                                : "border-line bg-white text-muted hover:bg-brand-soft"
                            }`}
                    >
                        {t.label} ({jumlah(t.nilai)})
                    </button>
                ))}
            </div>

            <div id="panel-rak" role="tabpanel">
                {!siap ? (
                    <div className="space-y-3">
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                    </div>
                ) : tampil.length === 0 ? (
                    <EmptyState
                        title="Rak masih kosong"
                        message={tabAktif.kosong}
                        action={
                            <Link
                                href="/katalog"
                                className="inline-flex min-h-11 items-center rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark"
                            >
                                Jelajahi katalog
                            </Link>
                        }
                    />
                ) : (
                    <ul className="space-y-3">
                        {tampil.map((item) => {
                            const buku = getBookById(item.bookId);
                            if (!buku) return null;
                            return (
                                <li key={item.bookId}>
                                    <RakItem
                                        book={buku}
                                        item={item}
                                        onHapus={() => hapusDariRak(buku.id, buku.title)}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <Rekomendasi />

            {pesan && <Toast message={pesan} onClose={tutupToast} />}
        </div>
    );
}