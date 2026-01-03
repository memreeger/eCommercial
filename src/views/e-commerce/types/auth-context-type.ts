import type { User } from "./user";

export type AuthContextType = {
    user: User | null;
    logout: () => Promise<void>;

}