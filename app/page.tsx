// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Token } from '../types/token';
import TokenList from './components/TokenList';
import { useFavorites } from './context/FavoritesContext';

async function fetchTokens(): Promise<Token[]> {
    try {
        const res = await axios.get('https://li.quest/v1/tokens');
        console.log('API Response:', res.data.tokens["1"]); // Debugging line
        // Ensure that res.data.tokens is an array
        if (Array.isArray(res.data.tokens["1"])) {
            return res.data.tokens["1"];
        }
        console.error('Tokens data is not an array:', res.data.tokens);
        return []; // Return an empty array if the tokens data is not valid
    } catch (error) {
        console.error('Error fetching tokens:', error);
        return [];
    }
}

export default function Home() {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { favorites } = useFavorites();

    useEffect(() => {
        fetchTokens().then(setTokens);
    }, []);
    // eslint-disable-next-line
    const filteredTokens = tokens.filter((token) =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedTokens = [
        ...filteredTokens.filter((token) => favorites.includes(token.address)),
        ...filteredTokens.filter((token) => !favorites.includes(token.address)),
    ];

    return (
        <div className="container">
            <h1 className="text-3xl font-bold mb-4">Token Explorer</h1>
            <input
                type="text"
                placeholder="Search tokens..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TokenList tokens={sortedTokens} />
        </div>
    );
}