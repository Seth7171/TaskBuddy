import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, fullName, age) => {
    setIsLoading(true);
    setError(null);

    const userData = { email, password, fullName};

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData), // Pass the additional fields in the request body
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);
      setError(null);
    }
  };

  return { signup, isLoading, error };
};
