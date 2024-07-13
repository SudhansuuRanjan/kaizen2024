import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"


const useAuth = () => {
    const { user, handleLogin, handleLogout, refresh } = useContext(AuthContext);

    return { user, handleLogin, handleLogout, refresh }
}

export default useAuth;