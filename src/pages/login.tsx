import { useState, type FormEvent } from "react";
import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { masuk, AKUN_CONTOH } from "@/lib/auth";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errUmum, setErrUmum] = useState("");
    const [loading, setLoading] = useState(false);

    function kirim(e: FormEvent) {
        e.preventDefault();
        setErrUmum("");

        const emailOk = /^\S+@\S+\.\S+$/.test(email);
        const passwordOk = password.length >= 6;
        setErrEmail(emailOk ? "" : "Masukkan alamat email yang valid.");
        setErrPassword(passwordOk ? "" : "Kata sandi minimal 6 karakter.");
        if (!emailOk || !passwordOk) return;

        setLoading(true);
        setTimeout(() => {
            if (masuk(email, password)) {
                router.push("/");
            } else {
                setErrUmum("Email atau kata sandi salah.");
                setLoading(false);
            }
        }, 800);
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-10">
            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-brand">BookNest</h1>
                    <p className="mt-1 text-sm text-muted">Masuk ke perpustakaan digitalmu.</p>
                </div>

                <Card>
                    <form onSubmit={kirim} noValidate className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errEmail}
                        />
                        <Input
                            label="Kata sandi"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errPassword}
                        />

                        {errUmum && (
                            <p role="alert" className="text-sm text-danger">
                                {errUmum}
                            </p>
                        )}

                        <Button type="submit" loading={loading} className="w-full">
                            Masuk
                        </Button>
                    </form>
                </Card>

                <p className="rounded-lg bg-brand-soft p-3 text-center text-xs text-muted">
                    Akun contoh: <strong>{AKUN_CONTOH.email}</strong> / <strong>{AKUN_CONTOH.password}</strong>
                </p>
            </div>
        </div>
    );
}