import { Token } from '../../types/token';

interface TokenItemProps {
    token: Token;
}

export default function TokenItem({ token }: TokenItemProps) {
    return (
        <div className="card hover:bg-gray-100 cursor-pointer transition">
            <img src={token.logoURI} alt={token.name} className="w-16 h-16 mb-2" />
            <h2 className="text-xl font-semibold">{token.name}</h2>
            <p className="text-sm text-gray-500">{token.address}</p>
        </div>
    );
}