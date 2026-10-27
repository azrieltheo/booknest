import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import StatusBadge from "@/components/book/StatusBadge";
import { useShelf } from "@/hooks/useShelf";
import { getBookById } from "@/data/books";

export default function DetailBuku() {
    const router = useRouter();
    const { ambil, tambah, hapus, ubahStatus, siap } = useShelf();
    const [pesan, setPesan] = useState("");
    const tutupToast = useCallback(() => setPesan(""), []);

    // Menunggu alamat dan rak selesai dibaca
    if (!router.isReady || !siap) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-64 w-full" />
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
                    <Link
                        href="/katalog"
                        className="inline-flex min-h-11 items-center rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark"
                    >
                        Kembali ke katalog
                    </Link>
                }
            />
        );
    }

    const item = ambil(buku.id);

    function tambahKeRak() {
        tambah(buku!.id);
        setPesan("Berhasil ditambahkan ke rak");
    }

    function hapusDariRak() {
        hapus(buku!.id);
        setPesan("Buku dihapus dari rak");
    }

    function mulaiMembaca() {
        ubahStatus(buku!.id, "sedang");
        router.push({ pathname: "/baca", query: { id: buku!.id } });
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" onClick={() => router.back()}>
                ← Kembali
            </Button>

            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                <div
                    aria-hidden="true"
                    style={{ backgroundColor: buku.cover }}
                    className="flex h-72 items-center justify-center rounded-xl text-6xl font-bold text-white md:h-80"
                >
                    {buku.title.charAt(0)}
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-brand">{buku.genre}</p>
                        <h1 className="text-3xl font-bold">{buku.title}</h1>
                        <p className="text-muted">{buku.author}</p>
                    </div>

                    <dl className="flex flex-wrap gap-6 text-sm">
                        <div>
                            <dt className="text-muted">Rating</dt>
                            <dd className="font-semibold">★ {buku.rating}</dd>
                        </div>
                        <div>
                            <dt className="text-muted">Halaman</dt>
                            <dd className="font-semibold">{buku.pages}</dd>
                        </div>
                        <div>
                            <dt className="text-muted">Terbit</dt>
                            <dd className="font-semibold">{buku.year}</dd>
                        </div>
                    </dl>

                    <p className="leading-relaxed text-ink">{buku.synopsis}</p>

                    {item && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted">Status di rakmu:</span>
                            <StatusBadge status={item.status} />
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                        {item ? (
                            <>
                                <Button onClick={mulaiMembaca}>Mulai Membaca</Button>
                                <Button variant="secondary" onClick={hapusDariRak}>
                                    Hapus dari rak
                                </Button>
                            </>
                        ) : (
                            <Button onClick={tambahKeRak}>Tambah ke Rak</Button>
                        )}
                    </div>
                </div>
            </div>

            {pesan && <Toast message={pesan} onClose={tutupToast} />}
        </div>
    );
}