import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const OAuthSuccess = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    login(); // ✅ set auth FIRST
    navigate("/user/dashboard", { replace: true });
  }, [login, navigate]);

  return null; // no UI needed (instant redirect)
};

export default OAuthSuccess;
