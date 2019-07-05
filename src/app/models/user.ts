export class User {
    id: number;
    token?: string;
    username: string;
    displayName: string;
    email: string;
    expires?: string; // convert to timestamp
    // uri: string;
    is_active: boolean;
    is_admin: boolean;
    is_manager: boolean;
    is_service_manager: boolean;
}

