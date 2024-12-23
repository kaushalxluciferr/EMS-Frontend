import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const userContext = createContext(null);

function AuthContext({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
  
        const token = localStorage.getItem('token');
        
        if (token) {
          const response = await fetch('http://localhost:4000/api/auth/verify', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUser(data.user);
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
            setLoading(false)
          }
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children} {/* Render child components */}
    </userContext.Provider>
  );
}

export const useAuth = () => useContext(userContext);
export default AuthContext;
