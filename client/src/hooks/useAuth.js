import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"


const useAuth = () => {
    const { session, user, signIn, signOut } = useContext(AuthContext);

    return { session, user, signIn, signOut }
}

export default useAuth;