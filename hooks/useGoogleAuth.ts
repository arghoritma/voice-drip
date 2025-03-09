import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/services/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleSignin } from "@/actions/auth";
export function useGoogleAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const googleLogin = async () => {
    setLoading(true);
    const avatarUrl = "https://ui-avatars.com/api/?name=";
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const payload = {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        Avatar: user.photoURL || `${avatarUrl}${user.displayName}`,
      };

      const response = await googleSignin(payload);
      if (response.success) {
        router.refresh();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, googleLogin };
}
