import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import supabase from "../config/supabase";
import { getCurrentUserProfile } from "../services/doc.service";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const initSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        initSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, []);

    const getCurrentUser = async () => {
        if (!session) return;
        const user_id = session.user.id;
        const user = await getCurrentUserProfile(user_id);
        setUser(user);
    }

    const contextData = {
        session,
        user,
        signIn: async (provider) => {
            await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: import.meta.env.VITE_APP_SUPABASE_REDIRECT_URI + '/auth/success',
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });
        },
        signOut: async () => {
            await supabase.auth.signOut();
            navigate('/');
        }
    }

    useEffect(() => {
        if (session) {
            getCurrentUser();
        }
    }, [session])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <div className="flex flex-col gap-16 items-center justify-center min-h-screen">
                <div className="flex gap-3 items-center">
                    <img src="android-chrome-192x192.png" alt="Logo" className="w-16" />
                    <div className="flex divide-x divide-gray-600 gap-3">
                        <p className="text-white text-2xl font-semibold">KAIZEN<br /> 2024</p>
                        <p className="text-2xl font-semibold text-rose-500 pl-2">AIIMS<br /> Patna</p>
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