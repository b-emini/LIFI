
import Image from 'next/image';
import { Token } from '../../types/token';

interface TokenItemProps {
    token: Token;
}

export default function TokenItem({ token }: TokenItemProps) {
    return (
        <div className="card bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-center text-xl font-semibold mb-2">{token.name}</h2>
            <div className="flex justify-center mb-2">
                <Image
                    height={64}
                    width={64}
                    src={token.logoURI || "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/00-token.png"}
                    alt={token.name}
                    className="rounded-full"
                />
            </div>
            <p className="text-center text-xs text-gray-500 truncate">{token.address}</p>
        </div>
    );
}