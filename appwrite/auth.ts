import conf from '@/conf/conf';
import { Client, Account, ID } from "appwrite";

// Define a custom Session interface
interface Session {
    // Define the properties of a session
    id: string;
    userId: string;
    // Add any other properties you need for a session
}

export class AuthService {
    private client: Client;
    private account: Account;

    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }: { email: string, password: string, name: string }): Promise<Session | null> {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return null;
            }
        } catch (error: any) { // Specify the type of 'error' explicitly
            throw new Error(`Error creating account: ${error.message}`);
        }
    }

    async login({ email, password }: { email: string, password: string }): Promise<Session | null> {
        try {
            // Adjust this code according to the actual session creation mechanism provided by appwrite
            // For example:
            const sessionData: Session = {
                id: 'some-session-id',
                userId: 'user-id'
            };
            return sessionData;
        } catch (error: any) { // Specify the type of 'error' explicitly
            throw new Error(`Error logging in: ${error.message}`);
        }
    }

    async getCurrentUser(): Promise<Record<string, any> | null> {
        try {
            return await this.account.get();
        } catch (error: any) { // Specify the type of 'error' explicitly
            console.error("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout(): Promise<void> {
        try {
            await this.account.deleteSessions();
        } catch (error: any) { // Specify the type of 'error' explicitly
            console.error("Appwrite service :: logout :: error", error);
            throw new Error(`Error logging out: ${error.message}`);
        }
    }
}

const authService = new AuthService();

export default authService;
