import type { Book } from "@/types";
import BookCard from "./BookCard";

export default function BookGrid({ books }: { books: Book[] }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {books.map((b) => (
                <BookCard key={b.id} book={b} />
            ))}
        </div>
    );
}