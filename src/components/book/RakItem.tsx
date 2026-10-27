import Link from "next/link";
import { useId } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useShelf } from "@/hooks/useShelf";
import type { Book, ReadingStatus, ShelfItem } from "@/types";

type Props = {
    book: Book;
    item: ShelfItem;
    onHapus: () => void;
};

export default function RakItem({ book, item, onHapus }: Props) {
    const { ubahStatus, ubahHalaman } = useShelf();
    const idStatus = useId();
    const persen = Math.min(100, Math.round((item.currentPage / book.pages) * 100));

    function gantiStatus(status: ReadingStatus) {
        ubahStatus(book.id, status);
        if (status === "selesai") ubahHalaman(book.id, book.pages);
    }

    return (
        <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div
                aria-hidden="true"
                style={{ backgroundColor: book.cover }}
                className="flex h-24 w-16 shrink-0 items-center justify-center rounded-md text-2xl font-bold text-white"
            >
                {book.title.charAt(0)}
            </div>

            <div className="min-w-0 flex-1 space-y-2">
                <div>
                    <Link
                        href={{ pathname: "/buku", query: { id: book.id } }}
                        className="font-semibold hover:text-brand"
                    >
                        {book.title}
                    </Link>
                    <p className="text-sm text-muted">{book.author}</p>
                </div>
                <div>
                    <div
                        role="progressbar"
                        aria-label={`Progres membaca ${book.title}`}
                        aria-valuenow={persen}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="h-2 overflow-hidden rounded-full bg-line"
                    >
                        <div className="h-full bg-brand" style={{ width: `${persen}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-muted">
                        {item.currentPage} / {book.pages} halaman ({persen}%)
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-end gap-2 sm:flex-col sm:items-stretch">
                <div className="flex flex-col gap-1">
                    <label htmlFor={idStatus} className="text-xs font-medium text-muted">
                        Status
                    </label>
                    <select
                        id={idStatus}
                        value={item.status}
                        onChange={(e) => gantiStatus(e.target.value as ReadingStatus)}
                        className="min-h-11 rounded-lg border border-line bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-brand"
                    >
                        <option value="ingin">Ingin Baca</option>
                        <option value="sedang">Sedang Dibaca</option>
                        <option value="selesai">Selesai</option>
                    </select>
                </div>
                <Link
                    href={{ pathname: "/baca", query: { id: book.id } }}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                    Baca
                </Link>
                <Button variant="ghost" onClick={onHapus}>
                    Hapus
                </Button>
            </div>
        </Card>
    );
}