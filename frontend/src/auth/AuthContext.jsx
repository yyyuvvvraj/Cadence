import React, { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage so form-based logins (which set localStorage)
  // are honored across navigation/refresh.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      // If the page load is a reload, force logout behavior by clearing
      // any persisted username. This implements the "logout on refresh"
      // feature the app expects.
      if (typeof performance !== "undefined") {
        const nav = performance.getEntriesByType?.("navigation")?.[0];
        if (nav?.type === "reload") {
          try {
            localStorage.removeItem("username");
          } catch (e) {
            /* ignore */
          }
          return false;
        }
      }

      return Boolean(localStorage.getItem("username"));
    } catch (e) {
      return false;
    }
  });

  const login = useCallback((username) => {
    try {
      if (username) localStorage.setItem("username", username);
    } catch (e) {
      console.warn("Auth: unable to persist username", e);
    }
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("username");
    } catch (e) {
      console.warn("Auth: unable to remove username", e);
    }
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Safe hook: return a minimal fallback when provider is missing to avoid
// runtime destructuring errors that trigger the ErrorBoundary.
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Return a safe fallback implementation rather than throwing.
    return {
      isAuthenticated: false,
      login: (username) => {
        try {
          if (username) localStorage.setItem("username", username);
        } catch (e) {
          /* noop */
        }
        console.warn(
          "useAuth(): called without AuthProvider — fallback login used",
        );
      },
      logout: () => {
        try {
          localStorage.removeItem("username");
        } catch (e) {}
        console.warn(
          "useAuth(): called without AuthProvider — fallback logout used",
        );
      },
    };
  }
  return ctx;
};
