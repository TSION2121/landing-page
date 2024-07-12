import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: sessionStorage.getItem('token') || '',
        userId: sessionStorage.getItem('userId') || '',
        username: sessionStorage.getItem('username') || '',
        isAdmin: sessionStorage.getItem('isAdmin') === 'true',
        role: sessionStorage.getItem('role') || '', // Add this line
    });

    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(authState.token));

    useEffect(() => {
        setIsAuthenticated(Boolean(authState.token));
    }, [authState]);

    const login = (token, userId, username, isAdmin, role) => { // Add 'role' parameter
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('isAdmin', isAdmin);
        sessionStorage.setItem('role', role); // Add this line
        setAuthState({ token, userId, username, isAdmin, role }); // Add 'role' here
    };

    const logout = () => {
        sessionStorage.clear();
        setAuthState({});
    };

    return (
        <AuthContext.Provider value={{ ...authState, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
