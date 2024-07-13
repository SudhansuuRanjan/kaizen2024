import { OAuthProvider } from "appwrite";
import { account } from "../config/appwrite";

const createOAuthSession = async (provider, success, failure, scopes) => {
    // Go to OAuth provider login page
    const res = await account.createOAuth2Session(
        OAuthProvider.Google, // provider
        'http://localhost:5173', // redirect here on success
        'http://localhost:5173', // redirect here on failure
        [] // scopes (optional)
    );

    console.log(res);

    return res;
}


export {createOAuthSession}