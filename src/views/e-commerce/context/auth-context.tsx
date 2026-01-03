import { createContext, useEffect, type ReactNode } from "react";
import { useState } from "react";
import type { AuthContextType } from "../types/auth-context-type";
import type { User } from "../types/user"; // tip-only import
import { auth } from "../../../services/firebase/firebase";
import { onAuthStateChanged, type User as FirebaseUser, signOut } from "firebase/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || "", // firebase kendi özelliği displayName ile veriyi tutuyor
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);


    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
