import Link from "next/link";
import { useRouter } from "next/router";
import { navItems } from "./navItems";

export default function Sidebar() {
    const { pathname } = useRouter();

    return (
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-20 flex-col border-r border-line bg-white p-3 md:flex xl:w-60 xl:p-4">
            <Link
                href="/"
                className="mb-6 flex h-11 items-center justify-center text-lg font-bold text-brand xl:justify-start xl:px-3"
            >
                <span className="xl:hidden">BN</span>
                <span className="hidden xl:inline">BookNest</span>
            </Link>

            <nav aria-label="Navigasi utama" className="flex flex-col gap-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const aktif = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            title={label}
                            aria-current={aktif ? "page" : undefined}
                            className={`flex min-h-11 items-center justify-center gap-3 rounded-lg px-3 text-sm font-medium transition xl:justify-start ${aktif ? "bg-brand-soft text-brand" : "text-muted hover:bg-cream"
                                }`}
                        >
                            <Icon size={20} aria-hidden="true" />
                            <span className="sr-only xl:not-sr-only">{label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}