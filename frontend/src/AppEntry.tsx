import {Auth0Provider} from "@auth0/auth0-react";
import AppRouter from "./AppRouter";
import React, {useEffect} from "react";

export const AppEntry = () => {
    useEffect(() => {
       localStorage.setItem("chakra-ui-color-mode", "dark")
    }, []);

    return (
        <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN!}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
        scope={"read:history manage:contracts manage:phone-verifications manage:api-keys"}
        redirectUri={window.location.origin}
        useRefreshTokens={true}

    >
        <AppRouter/>
    </Auth0Provider>)
}
