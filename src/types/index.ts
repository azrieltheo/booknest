export type ReadingStatus = "ingin" | "sedang" | "selesai";

export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    synopsis: string;
    pages: number;
    year: number;
    rating: number;
    cover: string; 
}

export interface ShelfItem {
    bookId: string;
    status: ReadingStatus;
    currentPage: number;
    addedAt: string;
}

export type NoteType = "catatan" | "kutipan" | "ulasan";

export interface Note {
    id: string;
    bookId: string;
    type: NoteType;
    content: string;
    createdAt: string;
}