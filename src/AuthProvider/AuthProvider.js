import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';

const auth = getAuth(app)
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const [data, setData] = useState('')
    const [wishlist, setwishlist] = useState(0)
    const [loading, SetLoading] = useState(true)
    const google = new GoogleAuthProvider()
    const signup = (email, password) => {
        SetLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        SetLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googlesignin = () => {
        SetLoading(true)
        return signInWithPopup(auth, google)
    }
    const logout = () => {
        return signOut(auth)
    }
    const update = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            SetLoading(false)
        })
        return () => {
            return unSubscribe()
        }
    }, [])

    useEffect(() => {
        if (user?.uid) {
            const url = `https://bikroy-server.vercel.app/user?email=${user?.email}`
            fetch(url, {
                headers: {
                    token: localStorage.getItem('accesstoken')
                }
            })
                .then(res => res.json())
                .then(data => {
                    setData(data)
                })
        }
    }, [user])
    const authInfo = { user, loading, signup, login, googlesignin, logout, update, data, wishlist, setwishlist }
    return (
        <>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;