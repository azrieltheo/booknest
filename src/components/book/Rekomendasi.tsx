import BookCard from "./BookCard";
import { useShelf } from "@/hooks/useShelf";
import { books, getBookById } from "@/data/books";

export default function Rekomendasi() {
    const { items, siap, ada } = useShelf();

    if (!siap) return null;

    const genreRak = new Set(
        items
            .map((i) => getBookById(i.bookId)?.genre)
            .filter((g): g is string => !!g)
    );

    const hasil = books
        .filter((b) => !ada(b.id))
        .sort((a, b) => {
            const ga = genreRak.has(a.genre) ? 1 : 0;
            const gb = genreRak.has(b.genre) ? 1 : 0;
            if (ga !== gb) return gb - ga;
            return b.rating - a.rating;
        })
        .slice(0, 3);

    if (hasil.length === 0) return null;

    return (
        <section aria-labelledby="judul-rekomendasi">
            <h2 id="judul-rekomendasi" className="text-lg font-semibold">
                Rekomendasi untukmu
            </h2>
            <p className="mb-3 text-sm text-muted">
                {items.length > 0
                    ? "Berdasarkan genre buku di rakmu."
                    : "Buku dengan rating tertinggi."}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {hasil.map((b) => (
                    <BookCard key={b.id} book={b} />
                ))}
            </div>
        </section>
    );
}