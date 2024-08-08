'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import FavoriteButton from '../components/FavoriteButton';
import { useFavorites } from '../context/FavoritesContext';
import { Token } from '../../types/token';

const getToken = async (chain: string, token: string): Promise<Token | null> => {
    const result = await axios.get('https://li.quest/v1/token', {
        params: {
            chain,
            token,
        }
    });
    return result.data;
}

export default function TokenDetail({ initialToken }: { initialToken: Token }) {
    const searchParams = useSearchParams();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const [token, setToken] = useState<Token | null>(initialToken);
    const [favoriteState, setFavoriteState] = useState(false);

    // Fetch token details if params change
    useEffect(() => {
        const id = searchParams.get('id');
        const chain = searchParams.get('chain');

        if (id && chain) {
            getToken(chain, id).then(setToken);
        }
    }, [searchParams]);

    // Update favorite state
    useEffect(() => {
        if (token) {
            setFavoriteState(isFavorite(token.address));
        }
    }, [token, isFavorite]);

    // Toggle favorite status
    const toggleFavorite = () => {
        if (favoriteState && token) {
            removeFavorite(token.address);
        } else if (token) {
            addFavorite(token.address);
        }
        setFavoriteState(!favoriteState);
    };

    // Render token details
    return (
        <div className="container">
            {token ? (
                <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-4xl font-extrabold text-gray-900">{token.name + " " + token.priceUSD + "$"}</h1>
                        <img
                            src={token.logoURI}
                            alt={token.name}
                            className="w-16 h-16 rounded-full border-2 border-gray-200"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-lg text-gray-600 font-medium">Address:</p>
                        <p className="text-lg text-gray-800 font-semibold truncate">{token.address}</p>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <FavoriteButton
                            isFavorite={favoriteState}
                            toggleFavorite={toggleFavorite}
                            className="transition transform hover:scale-105 focus:outline-none"
                        />
                    </div>
                </div>
            ) : (
                <p>Loading token details...</p>
            )}
        </div>
    );
}
