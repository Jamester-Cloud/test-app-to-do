import { createContext, useContext, useEffect, useState } from "react";
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from 'firebase/auth'
//firebase authObject
import { auth } from '../firebase';
//creando context
export const authContext = createContext();

//Hook personalizado
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('No hay un proveedor de autenticacion');
    return context;
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const signup = (email, pass) =>
        createUserWithEmailAndPassword(auth, email, pass);

    const login = async (email, pass) =>
        signInWithEmailAndPassword(auth, email, pass);

    const logout = async ()=> signOut(auth);

        useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, currentUser => {
                setUser(currentUser);
                setLoading(false);
            })
            return ()=> unsubscribe();
    }, [])

    return (
        <authContext.Provider value={{ signup, login , user, logout, loading}}>
            {children}
        </authContext.Provider>
    )
}