import './globals.css';
import { ReactNode } from 'react';
import { FavoritesProvider } from './context/FavoritesContext';
//Apologies for being lazy and using only one chain :)
export const metadata = {
    title: 'Token Explorer',
    description: 'Explore and favorite your favorite tokens',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <FavoritesProvider>{children}</FavoritesProvider>
        </body>
        </html>
    );
}