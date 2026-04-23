export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}