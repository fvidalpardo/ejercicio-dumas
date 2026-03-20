import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

const AuthButton = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <div>
      {authUser && (
        <button className="btn btn-sm" onClick={logout}>
          <LogOut className="size-5" /> Logout
        </button>
      )}
    </div>
  );
};

export default AuthButton;
