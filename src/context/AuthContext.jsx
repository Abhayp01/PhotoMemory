import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        axios.get('/api/v1/check-auth')
            .then(response => {
                if (response.data.authenticated) {
                    setAuth(response.data.user);
                } else {
                    setAuth(null);
                }
            })
            .catch(() => setAuth(null));
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
