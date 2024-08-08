// app/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { Token } from '../types/token';
import TokenList from './components/TokenList';
import { useFavorites } from './context/FavoritesContext';

interface HomeProps {
  tokens: Token[];
}

async function fetchTokens(): Promise<Token[]> {
  const res = await axios.get('https://li.quest/v1/tokens');
  return res.data.tokens || [];
}

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites } = useFavorites();

  useState(() => {
    fetchTokens().then(setTokens);
  }, []);

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