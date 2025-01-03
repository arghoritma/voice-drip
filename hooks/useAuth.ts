import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: {
    email: string;
    username: string;
    password: string;
    phone_number: string;
  }) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      router.push("/auth/login");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      router.push("/auth/login");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, register, logout, loading, error };
}
