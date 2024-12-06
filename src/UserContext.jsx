import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [responseImg, setResponseImg] = useState(null);
    const [CartItems, setCartItems] = useState(null);
    const [usernameGlb, setUsernameGlb] = useState('User Name');
    const [bioGlb, setBioGlb] = useState('This is your bio.');

    return (
        <UserContext.Provider value={{ userInfo,CartItems,setCartItems, setUserInfo, responseImg, setResponseImg, usernameGlb, setUsernameGlb, bioGlb, setBioGlb }}>
            {children}
        </UserContext.Provider>
    );
};
