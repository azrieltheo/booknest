import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { ambilPengguna, keluar } from "@/lib/auth";

export default function AppLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [siap, setSiap] = useState(false);
    const halamanLogin = router.pathname === "/login";

    useEffect(() => {
        if (halamanLogin) {
            setSiap(true);
            return;
        }
        if (ambilPengguna()) {
            setSiap(true);
        } else {
            router.replace("/login");
        }
    }, [halamanLogin, router]);

    function logout() {
        keluar();
        router.push("/login");
    }

    if (halamanLogin) return <>{children}</>;
    if (!siap) return null;

    return (
        <div className="min-h-screen">
            <Sidebar />

            <div className="md:pl-20 xl:pl-60">
                <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-line bg-white px-4 md:justify-end md:px-8">
                    <Link href="/" className="text-lg font-bold text-brand md:hidden">
                        BookNest
                    </Link>
                    <button
                        type="button"
                        onClick={logout}
                        className="min-h-11 rounded-lg px-3 text-sm font-semibold text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
                    >
                        Keluar
                    </button>
                </header>

                <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:px-8 md:pb-10">
                    {children}
                </main>
            </div>

            <BottomNav />
        </div>
    );
}