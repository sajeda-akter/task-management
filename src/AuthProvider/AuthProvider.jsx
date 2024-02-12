import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { getAuth,createUserWithEmailAndPassword,signOut, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail  } from "firebase/auth";
import axios from "axios";

export const AuthContext=createContext(null)
const auth=getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    // create user
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword (auth,email,password)
    }

    const updateUser=(name,photoURL,number)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photoURL,
            phoneNumber:number
        })

    }

    const userVerification=()=>{
        return sendEmailVerification(auth.currentUser)
    }

    const userLogin=(email,password)=>{
       setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const handleReset=(email)=>{
        return sendPasswordResetEmail(auth,email)
    }

    // logout the user
    const logout=()=>{
        setLoading(false)
        return signOut(auth)
    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{
            console.log('obserb user')
            setLoading(false)
            setUser(currentUser)
            if(currentUser){
                axios.post('http://localhost:5000/jwt')
                .then(res=>{
                  
                    if(res.data.token){
                    localStorage.setItem('access-token',res.data.token)
                    }
                    
                })
            }
            else{
                localStorage.removeItem('access-token')

            }

        })
        return (()=>unSubscribe())
    },[])

    const authInfo={user,createUser,userLogin,loading,handleReset,updateUser,userVerification,logout}
  
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;