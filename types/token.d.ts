export interface Token {
    name: string;
    address: string;
    logoURI: string;
    chainId:number;
}

export interface ApiResponse {
    tokens: Token[];
}