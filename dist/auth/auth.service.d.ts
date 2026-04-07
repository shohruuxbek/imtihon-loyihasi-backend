import { Repository } from 'typeorm';
import { User } from './user.entity.js';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            role: any;
            fullName: any;
            email: any;
        };
    }>;
    register(userData: Partial<User>): Promise<User>;
    findAllUsers(): Promise<User[]>;
    createAdminUser(): Promise<void>;
}
