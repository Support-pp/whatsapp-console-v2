import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from "./AppRouter";
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {theme} from '@chakra-ui/pro-theme'
import '@fontsource/inter/variable.css'
import {TolgeeProvider} from "@tolgee/react";
import {Auth0Provider} from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
}

const myTheme = extendTheme(
    {
        colors: {...theme.colors, brand: theme.colors.cyan},
    },
    theme,
    config,
)


root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN!}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
            scope={"read:history manage:contracts manage:phone-verifications manage:api-keys"}
            redirectUri={window.location.origin}
        >
        <ChakraProvider theme={myTheme}>
            <TolgeeProvider
                filesUrlPrefix="i18n/"
                apiUrl={process.env.REACT_APP_TOLGEE_API_URL}
                apiKey={process.env.REACT_APP_TOLGEE_API_KEY}
                loadingFallback={<>Loading...</>}
            >
                <AppRouter/>
            </TolgeeProvider>
        </ChakraProvider>
        </Auth0Provider>
    </React.StrictMode>
);

