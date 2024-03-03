import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import usePublicAxiosSecure from "../components/Hooks/usePublicAxiosSecure";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const publicSecure = usePublicAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // user info update
  const updateUser = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const userVerification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // user login
  const userLogin = async (email, password) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res?.user);
    return res;
  };

  // change to password
  const handleReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // logout the user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("obserb user");

      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        publicSecure.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => unSubscribe();
  }, [publicSecure]);



  const authInfo = {
    user,
    createUser,
    userLogin,
    loading,
    handleReset,
    updateUser,
    userVerification,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
