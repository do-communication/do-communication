import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, getAuth, updateProfile } from 'firebase/auth';
import { auth } from "../config/firebase";
const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)
const provider = new GoogleAuthProvider();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle = (auth, provider) => {
        return signInWithPopup(auth, provider)
    }
    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }
    const forgotPassword = async (email) => {
        await sendPasswordResetEmail(auth, email)
    }
    const resetPassword = async (password) => {
        await auth.currentUser.updatePassword(password)
    }
    return <AuthContext.Provider value={{ user, logIn, signUp, signInGoogle, logout, provider, forgotPassword, resetPassword, getAuth, updateProfile }}>{loading ? null : children}</AuthContext.Provider>
}