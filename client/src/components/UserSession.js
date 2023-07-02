import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the user session
const UserSessionContext = createContext();

// Provide the context to your components
export function UserSessionProvider({ children }) {
    const [userSession, setUserSession] = useState(() => JSON.parse(localStorage.getItem('userSession')) || null);

    // Effect to update local storage whenever the userSession state changes
    useEffect(() => {
        if (userSession) {
            localStorage.setItem('userSession', JSON.stringify(userSession));
        } else {
            localStorage.removeItem('userSession');
        }
    }, [userSession]);

    return (
        <UserSessionContext.Provider value={{ userSession, setUserSession }}>
            {children}
        </UserSessionContext.Provider>
    );
}

// Create a custom hook to use the user session context
export function useUserSession() {
    return useContext(UserSessionContext);
}
