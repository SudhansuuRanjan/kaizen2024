import { createContext, useEffect, useState } from "react";
import { createOAuthSession } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import Loader from "../components/Loader/Loader";
import { account } from "../config/appwrite";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (user) => {
        try {
            await createOAuthSession('google', `${import.meta.env.VITE_APP_URL}/`, `${import.meta.env.VITE_APP_URL}/`, []);
            await checkUser();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const logout = async () => {
        await account.deleteSession("current");
        setUser(null);
        setLoading(false);
        navigate("/");
    }

    const checkUser = async () => {
        try {
            const res = await account.get('current');
            setUser(res);
            checkUserSession();
            setLoading(false);
            return res;
        } catch (error) {
            setUser(null);
            setLoading(false);
        }
    }

    const saveUserToDB = async (user) => {
        try {
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const checkUserSession = async () => {
        try {
            const res = await account.getSession('current');
            // if(new Date(res.providerAccessTokenExpiry) < Date.now()) {
            //     console.log("Session expired");
            //     const response = await account.updateSession(res.$id);
            //     console.log("session", response);
            // }else{
            //     console.log("Session not expired");
            //     console.log("session", res);
            // }
            // console.log("session", new Date(res.providerAccessTokenExpiry).toLocaleString());
        } catch (error) {
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    const contextData = {
        user,
        handleLogin: login,
        handleLogout: logout,
        refresh: checkUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <div className="flex flex-col gap-16 items-center justify-center min-h-screen">
                <div className="flex gap-3 items-center">
                    <img src="android-chrome-192x192.png" alt="Logo" className="w-16" />
                    <div className="flex divide-x divide-gray-600 gap-3">
                        <p className="text-white text-xl font-semibold">KAIZEN<br /> 2024</p>
                        <p className="text-xl font-semibold text-sky-500 pl-2">AIIMS<br /> Patna</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Loader /> <span className="font-medium text-white pl-3 text-lg">Loading...</span>
                </div>
            </div> : children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };