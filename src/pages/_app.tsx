import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layout/AppLayout";
import { ShelfProvider } from "@/hooks/useShelf";
import { NotesProvider } from "@/hooks/useNotes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShelfProvider>
      <NotesProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </NotesProvider>
    </ShelfProvider>
  );
}