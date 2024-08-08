export interface Token {
    name: string;
    address: string;
    logoURI: string;
}

export interface ApiResponse {
    tokens: Token[];
}