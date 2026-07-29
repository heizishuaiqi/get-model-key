import { Inter } from 'next/font/google';

/** Shared Inter font instance — imported by both EN and ZH layouts to avoid duplication. */
export const inter = Inter({ subsets: ['latin'] });
