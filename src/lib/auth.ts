const KUNCI = "booknest_user";

export const AKUN_CONTOH = {
    email: "demo@booknest.id",
    password: "booknest123",
    nama: "Pembaca",
};

export function masuk(email: string, password: string): boolean {
    if (email === AKUN_CONTOH.email && password === AKUN_CONTOH.password) {
        localStorage.setItem(KUNCI, JSON.stringify({ nama: AKUN_CONTOH.nama, email }));
        return true;
    }
    return false;
}

export function keluar() {
    localStorage.removeItem(KUNCI);
}

export function ambilPengguna(): { nama: string; email: string } | null {
    try {
        const data = localStorage.getItem(KUNCI);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}