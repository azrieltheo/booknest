import Button from "@/components/ui/Button";

type Props = {
    message?: string;
    onRetry?: () => void;
};

export default function ErrorState({
    message = "Terjadi kesalahan jaringan. Periksa koneksi lalu coba lagi.",
    onRetry,
}: Props) {
    return (
        <div
            role="alert"
            className="flex flex-col items-center gap-2 rounded-xl border border-danger/30 bg-white px-6 py-12 text-center"
        >
            <h3 className="text-lg font-semibold text-danger">Gagal memuat data</h3>
            <p className="max-w-sm text-sm text-muted">{message}</p>
            {onRetry && (
                <Button variant="secondary" onClick={onRetry} className="mt-2">
                    Coba lagi
                </Button>
            )}
        </div>
    );
}