import { OAuthProvider } from "appwrite";
import { account } from "../config/appwrite";

const createOAuthSession = async (provider, success, failure, scopes) => {
    const res = await account.createOAuth2Session(
        OAuthProvider.Google, // provider
        import.meta.env.VITE_APPWRITE_URL,
        import.meta.env.VITE_APPWRITE_URL,
        [] // scopes (optional)
    );
    return res;
}


export { createOAuthSession }