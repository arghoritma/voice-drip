"use client";

import React, { useEffect, useState } from "react";
import { updateProfile, getProfile } from "@/actions/profile";
import { FormState, ProfileResponse } from "@/lib/definitions";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { verifySession } from "@/lib/dal";
import { log } from "console";

export default function ProfileForm() {
  const initialState: FormState = {
    success: false,
    errors: {},
  };

  const [profile, setProfile] = useState<any>(null);
  const [state, actionUpdate, isPending] = useActionState(
    updateProfile,
    initialState
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <form
      action={actionUpdate}
      className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
    >
      {state?.errors?._form && (
        <div role="alert" className="alert alert-error">
          <AlertCircle className="h-5 w-5" />
          {state.errors._form}
        </div>
      )}

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">Full Name</span>
        </label>
        <input
          type="text"
          name="name"
          defaultValue={profile?.username}
          className="input input-bordered w-full focus:input-primary text-sm sm:text-base"
          placeholder="Enter your full name"
        />
        {state.errors?.name && (
          <div className="text-error text-sm">{state.errors.name}</div>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <input
          type="email"
          name="email"
          defaultValue={profile?.email}
          className="input input-bordered w-full focus:input-primary text-sm sm:text-base"
          placeholder="Enter your email"
        />
        {state.errors?.email && (
          <div className="text-error text-sm">{state.errors.email}</div>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">Phone Number</span>
        </label>
        <input
          type="tel"
          name="phone_number"
          defaultValue={profile?.phone_number}
          className="input input-bordered w-full focus:input-primary text-sm sm:text-base"
          placeholder="Enter your phone number"
        />
        {state.errors?.phone_number && (
          <div className="text-error text-sm">{state.errors.phone_number}</div>
        )}
      </div>

      <div className="flex justify-end gap-3 sm:gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary hover:btn-secondary btn-sm sm:btn-md"
        >
          {isPending ? (
            <>
              <span className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
