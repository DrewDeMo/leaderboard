import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Common passwords that would be found in a data breach
const commonPasswords = ['admin123', 'password123', '123456', 'qwerty'];

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = (username, password) => {
        // For demo purposes, hardcode admin user
        if (username === 'Danielle' && password === 'Tclmarketing123!') {
            setIsAuthenticated(true);
            navigate('/admin/posts');
            return true;
        }

        // Check if password is in common breached passwords
        if (commonPasswords.includes(password)) {
            setError('This password was found in a data breach. Please change your password.');
            setTimeout(() => {
                setIsAuthenticated(true);
                navigate('/admin/posts');
            }, 2000);
            return false;
        }

        setError('Invalid credentials');
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        navigate('/admin');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
