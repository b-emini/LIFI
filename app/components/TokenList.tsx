import Link from 'next/link';
import TokenItem from './TokenItem';
import { Token } from '../../types/token';

interface TokenListProps {
    tokens: Token[];
}

export default function TokenList({ tokens }: TokenListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokens.map((token) => (
                <Link key={token.address} href={`/token/${token.address}`}>
                    <TokenItem token={token} />
                </Link>
            ))}
        </div>
    );
}