import { useEffect, useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import BookGrid from "@/components/book/BookGrid";
import { useDebounce } from "@/hooks/useDebounce";
import { books } from "@/data/books";

const daftarGenre = ["Semua", ...Array.from(new Set(books.map((b) => b.genre)))];

export default function Katalog() {
    const [kataKunci, setKataKunci] = useState("");
    const [genre, setGenre] = useState("Semua");
    const [loading, setLoading] = useState(true);

    const q = useDebounce(kataKunci, 300);

    // Simulasi memuat data (nanti diganti fetch ke API di Minggu 2)
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [q, genre]);

    const hasil = useMemo(() => {
        const kata = q.trim().toLowerCase();
        return books.filter((b) => {
            const cocokGenre = genre === "Semua" || b.genre === genre;
            const cocokKata =
                b.title.toLowerCase().includes(kata) ||
                b.author.toLowerCase().includes(kata);
            return cocokGenre && cocokKata;
        });
    }, [q, genre]);

    function reset() {
        setKataKunci("");
        setGenre("Semua");
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Katalog Buku</h1>
                <p className="text-sm text-muted">Cari judul atau penulis.</p>
            </div>

            <Input
                label="Cari buku"
                type="search"
                placeholder="Contoh: Laskar Pelangi"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
            />

            <div role="group" aria-label="Filter genre" className="flex flex-wrap gap-2">
                {daftarGenre.map((g) => (
                    <button
                        key={g}
                        type="button"
                        aria-pressed={genre === g}
                        onClick={() => setGenre(g)}
                        className={`min-h-11 rounded-full border px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${genre === g
                                ? "border-brand bg-brand text-white"
                                : "border-line bg-white text-muted hover:bg-brand-soft"
                            }`}
                    >
                        {g}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-28" />
                    ))}
                </div>
            ) : hasil.length === 0 ? (
                <EmptyState
                    title="Buku tidak ditemukan"
                    message="Coba kata kunci lain atau hapus filter genre."
                    action={<Button onClick={reset}>Reset pencarian</Button>}
                />
            ) : (
                <>
                    <p aria-live="polite" className="text-sm text-muted">
                        {hasil.length} buku ditemukan
                    </p>
                    <BookGrid books={hasil} />
                </>
            )}
        </div>
    );
}