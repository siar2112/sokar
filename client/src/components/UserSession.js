import React, { createContext, useContext, useState } from 'react';

// Create a context for the user session
const UserSessionContext = createContext();

// Provide the context to your components
export function UserSessionProvider({ children }) {
    const [userSession, setUserSession] = useState(null);

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
