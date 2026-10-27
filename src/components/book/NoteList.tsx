import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getBookById } from "@/data/books";
import type { Note, NoteType } from "@/types";

const labelTipe: Record<NoteType, string> = {
    catatan: "Catatan",
    kutipan: "Kutipan",
    ulasan: "Ulasan",
};

type Props = {
    notes: Note[];
    onDelete: (note: Note) => void;
    tampilkanBuku?: boolean;
};

export default function NoteList({ notes, onDelete, tampilkanBuku = false }: Props) {
    return (
        <ul className="space-y-3">
            {notes.map((n) => {
                const buku = getBookById(n.bookId);
                const tanggal = new Date(n.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });

                return (
                    <li key={n.id}>
                        <Card className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0 text-xs text-muted">
                                    <span className="rounded-full bg-brand-soft px-2 py-0.5 font-semibold text-brand-dark">
                                        {labelTipe[n.type]}
                                    </span>
                                    {tampilkanBuku && buku && (
                                        <>
                                            {" "}
                                            <Link
                                                href={{ pathname: "/buku", query: { id: buku.id } }}
                                                className="font-medium text-ink hover:text-brand"
                                            >
                                                {buku.title}
                                            </Link>
                                        </>
                                    )}
                                    <span> • {tanggal}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    aria-label={`Hapus ${labelTipe[n.type].toLowerCase()}`}
                                    onClick={() => onDelete(n)}
                                >
                                    Hapus
                                </Button>
                            </div>

                            {n.type === "kutipan" ? (
                                <blockquote className="border-l-4 border-brand pl-3 italic">
                                    {n.content}
                                </blockquote>
                            ) : (
                                <p className="whitespace-pre-wrap">{n.content}</p>
                            )}
                        </Card>
                    </li>
                );
            })}
        </ul>
    );
}