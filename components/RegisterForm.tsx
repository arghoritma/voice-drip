"use client";

import React, { useActionState, useState, useEffect } from "react";
import { Eye, EyeOff, AlertCircle, Mail, User, LogIn } from "lucide-react";
import { signup } from "@/actions/auth";
import { FormState } from "@/lib/definitions";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const initialState: FormState = {
    success: false,
    errors: {},
  };

  const [state, actionRegister, isPending] = useActionState(
    signup,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      window.location.reload();
    }
  }, [state]);
  return (
    <form className="mt-8 space-y-6" action={actionRegister}>
      {state?.errors?._form && (
        <div role="alert" className="alert alert-error">
          <AlertCircle className="h-5 w-5" />
          {state.errors._form}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="label">
            <span className="label-text">Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="johndoe"
              required
            />
          </div>
          {state.errors?.name && (
            <div className="text-error text-sm">{state.errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label">
            <span className="label-text">Email Address</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              className="input input-bordered w-full pl-10"
              placeholder="you@example.com"
              required
            />
          </div>
          {state.errors?.email && (
            <div className="text-error text-sm">{state.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LogIn className="h-5 w-5" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pl-10 pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-label="Hide password" />
              ) : (
                <Eye className="h-5 w-5" aria-label="Show password" />
              )}
            </button>
          </div>
          {state.errors?.password && (
            <div className="text-error text-sm">{state.errors.password}</div>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full"
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </form>
  );
}
