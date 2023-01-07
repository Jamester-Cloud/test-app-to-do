import { createContext, useContext } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase';
//creando context
export const authContext = createContext();

//Hook personalizado
export const useAuth= () =>{
    const context = useContext(authContext);
    if(!context) throw new Error('No hay un proveedor de autenticacion');
    return context;
}

export function AuthProvider({children}){
    const user = {
        login:true
    }

    const signup = (email, pass)=>
        createUserWithEmailAndPassword(auth, email, pass);
    
    return (
        <authContext.Provider value={{signup}}>
            {children}
        </authContext.Provider>
    )
}