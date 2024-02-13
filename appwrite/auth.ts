import conf from '../conf/conf';
import { Client, Account, ID, Session } from "appwrite";

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

    async createAccount({email, password, name}: {email: string, password: string, name: string}): Promise<Session | null> {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}: {email: string, password: string}): Promise<Session | null> {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(): Promise<Record<string, any> | null> {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout(): Promise<void> {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
