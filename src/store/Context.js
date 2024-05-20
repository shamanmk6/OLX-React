import { createContext ,useState} from "react";

 export let FirebaseContext=createContext(null)

export const AuthContext=createContext(null)

export default function Context({children}){

    const[user,setUser]=useState('')

    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

