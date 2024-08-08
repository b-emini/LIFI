"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Type definitions for context
interface FavoritesContextType {
    favorites: string[];
    addFavorite: (tokenAddress: string) => void;
    removeFavorite: (tokenAddress: string) => void;
    isFavorite: (tokenAddress: string) => boolean;
}

// Create context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Custom hook to use the context
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

// Provider component
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
    }, []);

    const addFavorite = (tokenAddress: string) => {
        if (!favorites.includes(tokenAddress)) {
            const newFavorites = [...favorites, tokenAddress];
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
    };

    const removeFavorite = (tokenAddress: string) => {
        const newFavorites = favorites.filter((fav) => fav !== tokenAddress);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const isFavorite = (tokenAddress: string) => {
        return favorites.includes(tokenAddress);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};