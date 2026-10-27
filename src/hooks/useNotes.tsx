import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Note, NoteType } from "@/types";

const KUNCI = "booknest_notes";

type NotesContextType = {
    notes: Note[];
    siap: boolean;
    tambah: (bookId: string, type: NoteType, content: string) => void;
    hapus: (id: string) => void;
};

const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [siap, setSiap] = useState(false);

    useEffect(() => {
        try {
            const data = localStorage.getItem(KUNCI);
            if (data) setNotes(JSON.parse(data));
        } catch {
            // data rusak: mulai dari kosong
        }
        setSiap(true);
    }, []);

    useEffect(() => {
        if (!siap) return;
        try {
            localStorage.setItem(KUNCI, JSON.stringify(notes));
        } catch {
            // penyimpanan penuh atau diblokir: abaikan
        }
    }, [notes, siap]);

    const tambah = useCallback(
        (bookId: string, type: NoteType, content: string) => {
            const baru: Note = {
                id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
                bookId,
                type,
                content,
                createdAt: new Date().toISOString(),
            };
            setNotes((prev) => [baru, ...prev]);
        },
        []
    );

    const hapus = useCallback((id: string) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
        <NotesContext.Provider value={{ notes, siap, tambah, hapus }}>
            {children}
        </NotesContext.Provider>
    );
}

export function useNotes() {
    const ctx = useContext(NotesContext);
    if (!ctx) throw new Error("useNotes harus dipakai di dalam NotesProvider");
    return ctx;
}