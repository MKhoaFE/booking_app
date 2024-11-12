// user.context.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";

// Tạo context người dùng
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Kiểm tra session storage hoặc cookie khi component được render
    useEffect(() => {
        const storedUser = JSON.parse(Cookies.get('user') || sessionStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
