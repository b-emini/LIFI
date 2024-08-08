export interface Token {
    name: string;
    address: string;
    logoURI: string;
    chainId:number;
    priceUSD: string;
}

export interface ApiResponse {
    tokens: Token[];
}