import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { X } from "lucide-react";
import GoogleLogin from "./GoogleLogin";

export default function AuthModal() {
  return (
    <>
      <input type="checkbox" id="auth_modal" className="modal-toggle" />
      <div className="modal backdrop-blur-xs">
        <div className="modal-box">
          <div role="tablist" className="tabs tabs-lifted">
            <input
              type="radio"
              name="auth_tabs_modal"
              role="tab"
              className="tab"
              aria-label="Login"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <GoogleLogin />
              <LoginForm />
            </div>

            <input
              type="radio"
              name="auth_tabs_modal"
              role="tab"
              className="tab"
              aria-label="Register"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <GoogleLogin />
              <RegisterForm />
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="auth_modal" className="btn">
              <X size={20} />
            </label>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
