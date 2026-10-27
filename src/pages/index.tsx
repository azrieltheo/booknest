import Link from "next/link";
import Card from "@/components/ui/Card";
import BookCard from "@/components/book/BookCard";
import { books } from "@/data/books";

const mingguIni = [
    { hari: "Sen", menit: 20 },
    { hari: "Sel", menit: 35 },
    { hari: "Rab", menit: 30 },
    { hari: "Kam", menit: 50 },
    { hari: "Jum", menit: 45 },
    { hari: "Sab", menit: 60 },
    { hari: "Min", menit: 40 },
];

const statistik = [
    { nilai: String(books.length), label: "Buku koleksi" },
    { nilai: "18", label: "Hari beruntun" },
    { nilai: "9", label: "Buku selesai" },
];

export default function Beranda() {
    const terbaru = books.slice(0, 4);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Perpustakaan Digital</h1>
                <p className="text-sm text-muted">Satu ruang untuk semua bacaan.</p>
            </div>

            <section aria-label="Statistik" className="grid grid-cols-3 gap-3">
                {statistik.map((s) => (
                    <Card key={s.label}>
                        <p className="text-2xl font-bold text-brand">{s.nilai}</p>
                        <p className="text-xs text-muted">{s.label}</p>
                    </Card>
                ))}
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <h2 className="mb-4 font-semibold">Menit membaca minggu ini</h2>
                    <div
                        role="img"
                        aria-label="Grafik menit membaca per hari selama seminggu"
                        className="flex h-40 items-end gap-3"
                    >
                        {mingguIni.map((d) => (
                            <div key={d.hari} className="flex flex-1 flex-col items-center gap-2">
                                <div
                                    className="w-full rounded-t bg-brand"
                                    style={{ height: `${d.menit * 2}px` }}
                                />
                                <span className="text-xs text-muted">{d.hari}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="flex flex-col justify-between gap-4 rounded-xl bg-brand p-5 text-white">
                    <div>
                        <h2 className="text-lg font-semibold">Mulai bacaan berikutnya</h2>
                        <p className="mt-1 text-sm">
                            Temukan buku baru dan tambahkan ke rakmu.
                        </p>
                    </div>
                    <Link
                        href="/katalog"
                        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Jelajahi katalog
                    </Link>
                </div>
            </section>

            <section>
                <h2 className="mb-3 text-lg font-semibold">Bacaan terbaru</h2>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {terbaru.map((b) => (
                        <BookCard key={b.id} book={b} />
                    ))}
                </div>
            </section>
        </div>
    );
}