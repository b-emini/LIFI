'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Token } from '../types/token';
import TokenList from './components/TokenList';
import { useFavorites } from './context/FavoritesContext';

const CHUNK_SIZE = 100; // Number of tokens to display at a time

async function fetchTokens(): Promise<Token[]> {
    try {
        const response = await axios.get('https://li.quest/v1/tokens');
        console.log('API Response:', response.data.tokens);

        // Ensure tokens is an array
        if (Array.isArray(response.data.tokens["1"])) {
            return response.data.tokens["1"];
        }

        console.error('Tokens data is not an array:', response.data.tokens);
        return []; // Return empty array if response is invalid
    } catch (error) {
        console.error('Error fetching tokens:', error);
        return [];
    }
}

export default function Home() {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [visibleTokens, setVisibleTokens] = useState<Token[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { favorites } = useFavorites();
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const loadTokens = async () => {
            setLoading(true);
            const allTokens = await fetchTokens();
            setTokens(allTokens);
            setVisibleTokens(allTokens.slice(0, CHUNK_SIZE)); // Show first chunk
            setPage(1); // Start on the first page
            setLoading(false);
        };

        loadTokens();
    }, []);

    useEffect(() => {
        if (loading) return; // If currently loading, do not do anything

        const handleScroll = () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            if (scrollHeight - scrollTop <= clientHeight + 1) {
                loadMoreTokens();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, tokens, visibleTokens]);

    const loadMoreTokens = () => {
        // Calculate the next range of tokens to display
        const nextPage = page + 1;
        const nextTokens = tokens.slice(0, nextPage * CHUNK_SIZE);
        setVisibleTokens(nextTokens); // Update visible tokens
        setPage(nextPage); // Increment the page number
    };

    // Filter and sort tokens based on favorites
    const filteredTokens = visibleTokens.filter((token) =>
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
            {loading && <p>Loading more tokens...</p>}
        </div>
    );
}
