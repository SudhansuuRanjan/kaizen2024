import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"


const useAuth = () => {
    const { session, user, signIn, signOut, features } = useContext(AuthContext);

    return { session, user, signIn, signOut, features }
}

export default useAuth;