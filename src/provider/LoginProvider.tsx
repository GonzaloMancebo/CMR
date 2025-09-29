import { useEffect, useState } from "react";
import { auth, firestore } from "@/services/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { LoginContext } from "@/context/LoginContext";
import Loading from "@/components/loading/loading";

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);

        // Buscar usuario en Firestore por email
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();

          setUsuario({ uid: user.uid, ...userData });

          // Convertir roles a array y buscar rol activo
          const rolesArray = userData.roles
            ? Array.isArray(userData.roles)
              ? userData.roles
              : Object.values(userData.roles)
            : [];

          const activeRole =
            rolesArray.find((r: any) => r.status === true) ?? null;
          setRole(activeRole);
        }
      } else {
        setIsLoggedIn(false);
        setUsuario(null);
        setRole(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setUsuario(null);
    setRole(null);
  };

  if (isLoading) {
    return <div>
<Loading/>

    </div>;
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, usuario, role, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
