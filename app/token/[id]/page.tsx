'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Token } from '../../../types/token';
import FavoriteButton from '../../components/FavoriteButton';
import { useFavorites } from '../../context/FavoritesContext';

// Fetch token data
async function fetchTokenData(id: string): Promise<Token | null> {
    const res = await axios.get('https://li.quest/v1/tokens');
    const token = res.data.tokens["1"].find((t: Token) => t.address === id);
    return token || null;
}

export default function TokenDetail() {
    const router = useRouter();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const [token, setToken] = useState<Token | null>(null);
    const [favoriteState, setFavoriteState] = useState(false);

    // Fetch token details
    useEffect(() => {
        const id = router.query.id as string;
        if (id) {
            fetchTokenData(id).then(setToken);
        }
    }, [router.query.id]);

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
                <>
                    <h1 className="text-3xl font-bold mb-4">{token.name}</h1>
                    <img src={token.logoURI} alt={token.name} className="w-24 h-24 mb-2" />
                    <p className="text-lg">Address: {token.address}</p>
                    <FavoriteButton isFavorite={favoriteState} toggleFavorite={toggleFavorite} />
                </>
            ) : (
                <p>Loading token details...</p>
            )}
        </div>
    );
}