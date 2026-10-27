import { useId, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { useNotes } from "@/hooks/useNotes";
import type { NoteType } from "@/types";

type Props = {
    bookId: string;
    onSaved?: (pesan: string) => void;
};

const pilihan: { nilai: NoteType; label: string }[] = [
    { nilai: "catatan", label: "Catatan" },
    { nilai: "kutipan", label: "Kutipan" },
    { nilai: "ulasan", label: "Ulasan" },
];

export default function NoteForm({ bookId, onSaved }: Props) {
    const { tambah } = useNotes();
    const idTipe = useId();
    const idIsi = useId();
    const idError = `${idIsi}-error`;

    const [tipe, setTipe] = useState<NoteType>("catatan");
    const [isi, setIsi] = useState("");
    const [error, setError] = useState("");

    function kirim(e: FormEvent) {
        e.preventDefault();
        const bersih = isi.trim();
        if (bersih.length < 3) {
            setError("Isi minimal 3 karakter.");
            return;
        }
        tambah(bookId, tipe, bersih);
        setIsi("");
        setError("");
        onSaved?.("Berhasil disimpan");
    }

    return (
        <form onSubmit={kirim} noValidate className="space-y-3">
            <div className="flex flex-col gap-1.5">
                <label htmlFor={idTipe} className="text-sm font-medium">
                    Jenis
                </label>
                <select
                    id={idTipe}
                    value={tipe}
                    onChange={(e) => setTipe(e.target.value as NoteType)}
                    className="min-h-11 rounded-lg border border-line bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-brand"
                >
                    {pilihan.map((p) => (
                        <option key={p.nilai} value={p.nilai}>
                            {p.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor={idIsi} className="text-sm font-medium">
                    Isi {tipe}
                </label>
                <textarea
                    id={idIsi}
                    rows={4}
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? idError : undefined}
                    className={`rounded-lg border bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-brand ${error ? "border-danger" : "border-line"
                        }`}
                />
                {error && (
                    <p id={idError} role="alert" className="text-sm text-danger">
                        {error}
                    </p>
                )}
            </div>

            <Button type="submit">Simpan</Button>
        </form>
    );
}