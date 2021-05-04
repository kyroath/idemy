import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (email, password) => {
    const response = await auth.signInWithEmailAndPassword(email, password);
    setUser(response.user);
    return response.user;
  };

  const signup = async (email, password) => {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    setUser(response.user);
    return response.user;
  };

  const signout = async () => {
    await auth.signOut();
    setUser(false);
  };

  const sendPasswordResetEmail = async (email) => {
    await auth.sendPasswordResetEmail(email);
    return true;
  };

  const confirmPasswordReset = async (code, password) => {
    await auth.confirmPasswordReset(code, password);
    return true;
  };

  const getIdToken = async () => {
    if (!auth.currentUser) return null;
    return await auth.currentUser.getIdToken(true); // Refresh the token for every request to the backend
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    getIdToken,
  };
}
