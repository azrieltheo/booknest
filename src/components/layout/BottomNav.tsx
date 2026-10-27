import Link from "next/link";
import { useRouter } from "next/router";
import { navItems } from "./navItems";

export default function BottomNav() {
    const { pathname } = useRouter();

    return (
        <nav
            aria-label="Navigasi bawah"
            className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-white md:hidden"
        >
            {navItems.map(({ href, label, icon: Icon }) => {
                const aktif = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={aktif ? "page" : undefined}
                        className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium ${aktif ? "text-brand" : "text-muted"
                            }`}
                    >
                        <Icon size={20} aria-hidden="true" />
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}