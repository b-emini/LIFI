import Link from 'next/link';
import TokenItem from './TokenItem';
import { Token } from '../../types/token';

interface TokenListProps {
    tokens: Token[];
}

export default function TokenList({ tokens }: TokenListProps) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {tokens.map((token) => (
                <Link key={token.address} href={`/token?id=${token.address}&chain=${token.chainId}`}>
                    <TokenItem token={token} />
                </Link>
            ))}
        </div>
    );
}