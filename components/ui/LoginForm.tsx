import React from "react";
import { AlertCircle, Eye, EyeOff, LogIn, Mail } from "lucide-react";

export default function LoginForm() {
  return (
    <form className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="email"
              type="email"
              className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground placeholder:text-muted-foreground"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LogIn className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="password"
              type="password"
              className="block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-foreground focus:border-foreground placeholder:text-muted-foreground"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-foreground"
            >
              <Eye className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center items-center py-3 px-4 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Sign In
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <a
            href="/auth/register"
            className="hover:text-foreground hover:underline"
          >
            Don't have an account?
          </a>
        </div>
        <div className="text-sm">
          <a href="#" className="hover:text-foreground hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </form>
  );
}
