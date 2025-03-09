import { useState } from "react";
import { auth } from "@/services/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleSignin } from "@/actions/auth";
import { PayloadGoogleSign } from "@/types";

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const googleLogin = async (): Promise<void> => {
    setLoading(true);
    const avatarUrl = "https://ui-avatars.com/api/?name=";
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const payload: PayloadGoogleSign = {
        email: user.email as string,
        name: user.displayName as string,
        uid: user.uid,
        Avatar: user.photoURL || `${avatarUrl}${user.displayName}`,
      };

      const response = await googleSignin(payload);
      if (response.success) {
        setSuccess(true);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, googleLogin };
}
