import type { Book } from "@/types";

export const books: Book[] = [
    { id: "1", title: "Laskar Pelangi", author: "Andrea Hirata", genre: "Novel", synopsis: "Kisah sepuluh anak di Belitung yang belajar di sekolah sederhana dengan semangat yang besar.", pages: 529, year: 2005, rating: 4.6, cover: "#B45309" },
    { id: "2", title: "Bumi Manusia", author: "Pramoedya Ananta Toer", genre: "Novel", synopsis: "Perjalanan Minke, pribumi terpelajar di masa kolonial, mencari keadilan dan jati diri.", pages: 535, year: 1980, rating: 4.7, cover: "#7C2D12" },
    { id: "3", title: "Filosofi Teras", author: "Henry Manampiring", genre: "Pengembangan Diri", synopsis: "Pengantar filsafat Stoa untuk menghadapi stres dan emosi sehari-hari.", pages: 346, year: 2018, rating: 4.4, cover: "#3F6B4F" },
    { id: "4", title: "Atomic Habits", author: "James Clear", genre: "Pengembangan Diri", synopsis: "Cara membangun kebiasaan baik lewat perubahan kecil yang konsisten.", pages: 320, year: 2018, rating: 4.8, cover: "#C2410C" },
    { id: "5", title: "Sapiens", author: "Yuval Noah Harari", genre: "Sejarah", synopsis: "Ringkasan sejarah umat manusia dari zaman purba hingga era modern.", pages: 443, year: 2011, rating: 4.5, cover: "#6B4F2A" },
    { id: "6", title: "Cantik Itu Luka", author: "Eka Kurniawan", genre: "Novel", synopsis: "Saga keluarga lintas generasi dengan latar sejarah Indonesia dan sentuhan magis.", pages: 520, year: 2002, rating: 4.3, cover: "#9A3412" },
    { id: "7", title: "Laut Bercerita", author: "Leila S. Chudori", genre: "Novel", synopsis: "Kisah aktivis mahasiswa yang hilang dan keluarga yang terus menunggu kabarnya.", pages: 379, year: 2017, rating: 4.6, cover: "#2F5D62" },
    { id: "8", title: "Clean Code", author: "Robert C. Martin", genre: "Teknologi", synopsis: "Panduan menulis kode yang rapi, mudah dibaca, dan mudah dirawat.", pages: 464, year: 2008, rating: 4.5, cover: "#1F2937" },
    { id: "9", title: "Pulang", author: "Leila S. Chudori", genre: "Novel", synopsis: "Perjalanan eksil politik Indonesia di Paris dan anak-anak yang mencari akar mereka.", pages: 464, year: 2012, rating: 4.4, cover: "#8B5E3C" },
    { id: "10", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", genre: "Keuangan", synopsis: "Dua cara pandang tentang uang dan pentingnya literasi keuangan sejak dini.", pages: 336, year: 1997, rating: 4.1, cover: "#B45309" },
    { id: "11", title: "Negeri 5 Menara", author: "Ahmad Fuadi", genre: "Novel", synopsis: "Enam santri di pesantren yang memegang prinsip man jadda wajada.", pages: 423, year: 2009, rating: 4.4, cover: "#3F6B4F" },
    { id: "12", title: "The Psychology of Money", author: "Morgan Housel", genre: "Keuangan", synopsis: "Kumpulan cerita tentang bagaimana perilaku memengaruhi keputusan uang.", pages: 256, year: 2020, rating: 4.6, cover: "#7C2D12" },
];

export function getBookById(id: string): Book | undefined {
    return books.find((b) => b.id === id);
}