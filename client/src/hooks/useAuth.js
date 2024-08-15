import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"


const useAuth = () => {
    const { session, user, signIn, signOut, features, refetch } = useContext(AuthContext);

    return { session, user, signIn, signOut, refetch, features }
}

export default useAuth;