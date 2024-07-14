import { OAuthProvider, } from "appwrite";
import { account } from "../config/appwrite";

const createOAuthSession = async () => {
    const res = await account.createOAuth2Session(
        OAuthProvider.Google, // provider
        import.meta.env.VITE_APPWRITE_URL + 'auth/success',
        import.meta.env.VITE_APPWRITE_URL,
        [] // scopes (optional)
    );
    return res;
}


export { createOAuthSession }