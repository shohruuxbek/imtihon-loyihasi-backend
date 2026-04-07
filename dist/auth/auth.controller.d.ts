import { AuthService } from './auth.service.js';
import { User } from './user.entity.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            role: any;
            fullName: any;
            email: any;
        };
    } | {
        message: string;
    }>;
    register(userData: Partial<User>): Promise<User>;
    findAllUsers(): Promise<User[]>;
}
