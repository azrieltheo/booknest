import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import StatusBadge from "@/components/book/StatusBadge";
import NoteForm from "@/components/book/NoteForm";
import NoteList from "@/components/book/NoteList";
import { useShelf } from "@/hooks/useShelf";
import { useNotes } from "@/hooks/useNotes";
import { getBookById } from "@/data/books";
import type { Book, ShelfItem } from "@/types";

const gayaLink =
    "inline-flex min-h-11 items-center rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark";

function IsiPembaca({ buku, item }: { buku: Book; item: ShelfItem }) {
    const { ubahHalaman, ubahStatus } = useShelf();
    const { notes, hapus } = useNotes();

    const [halaman, setHalaman] = useState(String(item.currentPage));
    const [error, setError] = useState("");
    const [pesan, setPesan] = useState("");
    const tutupToast = useCallback(() => setPesan(""), []);

    const persen = Math.min(100, Math.round((item.currentPage / buku.pages) * 100));
    const catatanBuku = notes.filter((n) => n.bookId === buku.id);

    function simpanProgres(e: FormEvent) {
        e.preventDefault();
        const angka = Number(halaman);
        if (
            halaman.trim() === "" ||
            !Number.isInteger(angka) ||
            angka < 0 ||
            angka > buku.pages
        ) {
            setError(`Masukkan angka bulat antara 0 dan ${buku.pages}.`);
            return;
        }
        setError("");
        ubahHalaman(buku.id, angka);
        if (angka >= buku.pages) ubahStatus(buku.id, "selesai");
        else if (angka > 0) ubahStatus(buku.id, "sedang");
        setPesan("Progres tersimpan");
    }

    function tandaiSelesai() {
        ubahHalaman(buku.id, buku.pages);
        ubahStatus(buku.id, "selesai");
        setHalaman(String(buku.pages));
        setError("");
        setPesan("Selamat, buku selesai dibaca!");
    }

    function hapusCatatan(id: string) {
        if (window.confirm("Hapus catatan ini?")) hapus(id);
    }

    return (
        <div className="space-y-6">
            <Link
                href={{ pathname: "/buku", query: { id: buku.id } }}
                className="text-sm font-semibold text-brand hover:underline"
            >
                ← Detail buku
            </Link>

            <div className="flex flex-wrap items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold">{buku.title}</h1>
                    <p className="text-muted">{buku.author}</p>
                </div>
                <StatusBadge status={item.status} />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card className="space-y-4">
                    <h2 className="font-semibold">Progres membaca</h2>
                    <div>
                        <div
                            role="progressbar"
                            aria-label="Progres membaca"
                            aria-valuenow={persen}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            className="h-3 overflow-hidden rounded-full bg-line"
                        >
                            <div className="h-full bg-brand" style={{ width: `${persen}%` }} />
                        </div>
                        <p className="mt-1 text-sm text-muted">
                            {item.currentPage} / {buku.pages} halaman ({persen}%)
                        </p>
                    </div>

                    <form onSubmit={simpanProgres} noValidate className="space-y-3">
                        <Input
                            label="Halaman saat ini"
                            type="number"
                            inputMode="numeric"
                            value={halaman}
                            onChange={(e) => setHalaman(e.target.value)}
                            error={error}
                        />
                        <div className="flex flex-wrap gap-2">
                            <Button type="submit">Simpan progres</Button>
                            <Button type="button" variant="secondary" onClick={tandaiSelesai}>
                                Tandai selesai
                            </Button>
                        </div>
                    </form>
                </Card>

                <Card className="space-y-2">
                    <h2 className="font-semibold">Tentang buku ini</h2>
                    <p className="leading-relaxed">{buku.synopsis}</p>
                    <p className="text-xs text-muted">
                        Prototipe: isi bacaan lengkap tidak ditampilkan.
                    </p>
                </Card>
            </div>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold">Catatan, kutipan, dan ulasan</h2>
                <Card>
                    <NoteForm bookId={buku.id} onSaved={setPesan} />
                </Card>

                {catatanBuku.length === 0 ? (
                    <EmptyState
                        title="Belum ada catatan"
                        message="Tulis catatan, simpan kutipan, atau beri ulasan untuk buku ini."
                    />
                ) : (
                    <NoteList notes={catatanBuku} onDelete={(n) => hapusCatatan(n.id)} />
                )}
            </section>

            {pesan && <Toast message={pesan} onClose={tutupToast} />}
        </div>
    );
}

export default function Pembaca() {
    const router = useRouter();
    const { ambil, siap } = useShelf();

    if (!router.isReady || !siap) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-48 w-full" />
            </div>
        );
    }

    const id = typeof router.query.id === "string" ? router.query.id : "";
    const buku = getBookById(id);

    if (!buku) {
        return (
            <EmptyState
                title="Buku tidak ditemukan"
                message="Buku yang kamu cari tidak ada atau sudah dihapus."
                action={
                    <Link href="/katalog" className={gayaLink}>
                        Kembali ke katalog
                    </Link>
                }
            />
        );
    }

    const item = ambil(buku.id);

    if (!item) {
        return (
            <EmptyState
                title="Buku belum ada di rakmu"
                message="Tambahkan dulu ke rak supaya progres membaca bisa dicatat."
                action={
                    <Link
                        href={{ pathname: "/buku", query: { id: buku.id } }}
                        className={gayaLink}
                    >
                        Buka detail buku
                    </Link>
                }
            />
        );
    }

    return <IsiPembaca key={buku.id} buku={buku} item={item} />;
}