import Link from "next/link";
import type { Book } from "@/types";

export default function BookCard({ book }: { book: Book }) {
    return (
        <Link
            href={{ pathname: "/buku", query: { id: book.id } }}
            className="flex items-center gap-4 rounded-xl border border-line bg-white p-3 transition hover:border-brand focus-visible:outline-2 focus-visible:outline-brand"
        >
            <div
                aria-hidden="true"
                style={{ backgroundColor: book.cover }}
                className="flex h-20 w-14 shrink-0 items-center justify-center rounded-md text-xl font-bold text-white"
            >
                {book.title.charAt(0)}
            </div>
            <div className="min-w-0">
                <h3 className="truncate font-semibold">{book.title}</h3>
                <p className="truncate text-sm text-muted">{book.author}</p>
                <p className="mt-1 text-xs text-muted">
                    {book.genre} • ★ {book.rating}
                </p>
            </div>
        </Link>
    );
}