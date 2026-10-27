import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { ReadingStatus, ShelfItem } from "@/types";

const KUNCI = "booknest_shelf";

type ShelfContextType = {
    items: ShelfItem[];
    siap: boolean;
    ada: (bookId: string) => boolean;
    ambil: (bookId: string) => ShelfItem | undefined;
    tambah: (bookId: string) => void;
    ubahStatus: (bookId: string, status: ReadingStatus) => void;
    ubahHalaman: (bookId: string, halaman: number) => void;
    hapus: (bookId: string) => void;
};

const ShelfContext = createContext<ShelfContextType | null>(null);

export function ShelfProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<ShelfItem[]>([]);
    const [siap, setSiap] = useState(false);

    // Baca rak dari localStorage sekali saat aplikasi dibuka
    useEffect(() => {
        try {
            const data = localStorage.getItem(KUNCI);
            if (data) setItems(JSON.parse(data));
        } catch {
            // data rusak: abaikan, mulai dari rak kosong
        }
        setSiap(true);
    }, []);

    // Simpan setiap kali rak berubah
    useEffect(() => {
        if (!siap) return;
        try {
            localStorage.setItem(KUNCI, JSON.stringify(items));
        } catch {
            // penyimpanan penuh atau diblokir: abaikan
        }
    }, [items, siap]);

    const ada = useCallback(
        (bookId: string) => items.some((i) => i.bookId === bookId),
        [items]
    );

    const ambil = useCallback(
        (bookId: string) => items.find((i) => i.bookId === bookId),
        [items]
    );

    const tambah = useCallback((bookId: string) => {
        setItems((prev) =>
            prev.some((i) => i.bookId === bookId)
                ? prev
                : [
                    ...prev,
                    {
                        bookId,
                        status: "ingin",
                        currentPage: 0,
                        addedAt: new Date().toISOString(),
                    },
                ]
        );
    }, []);

    const ubahStatus = useCallback((bookId: string, status: ReadingStatus) => {
        setItems((prev) =>
            prev.map((i) => (i.bookId === bookId ? { ...i, status } : i))
        );
    }, []);

    const ubahHalaman = useCallback((bookId: string, halaman: number) => {
        setItems((prev) =>
            prev.map((i) =>
                i.bookId === bookId ? { ...i, currentPage: halaman } : i
            )
        );
    }, []);

    const hapus = useCallback((bookId: string) => {
        setItems((prev) => prev.filter((i) => i.bookId !== bookId));
    }, []);

    return (
        <ShelfContext.Provider
            value={{ items, siap, ada, ambil, tambah, ubahStatus, ubahHalaman, hapus }}
        >
            {children}
        </ShelfContext.Provider>
    );
}

export function useShelf() {
    const ctx = useContext(ShelfContext);
    if (!ctx) throw new Error("useShelf harus dipakai di dalam ShelfProvider");
    return ctx;
}