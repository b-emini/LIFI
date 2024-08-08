import { notFound } from 'next/navigation';
import TokenDetail from '../../../components/TokenDetail';
import axios from 'axios';

const getToken = async (chain: string, token: string) => {
    const result = await axios.get('https://li.quest/v1/token', {
        params: {
            chain,
            token,
        }
    });
    return result.data;
}

export default async function TokenPage({ params }: { params: { chain: string, id: string } }) {
    const { chain, id } = params;
    const token = await getToken(chain, id);

    if (!token) {
        return notFound();
    }

    return <TokenDetail initialToken={token} />;
}

export const revalidate = 10; // Revalidate the page every 10 seconds
