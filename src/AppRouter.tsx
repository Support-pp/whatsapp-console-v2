import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BaseLayout } from './view/BaseLayout/BaseLayout';
import App from './App';
import { useAuth0 } from '@auth0/auth0-react';
import { HelpPage } from './view/HelpPage/HelpPage';
import { TolgeeProvider } from '@tolgee/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '@chakra-ui/pro-theme';
import { PhoneVerificationPage } from './view/PhoneVerificationPage/PhoneVerificationPage';
import { ROUTES } from './Routes';
import { ApiKeyPage } from './view/ApiKeyPage/ApiKeyPage';

const AppRouter = () => {
  const { isLoading, loginWithRedirect, user } = useAuth0();
  useEffect(() => {
    (async function login() {
      if (!isLoading && user === undefined) {
        await loginWithRedirect();
      }
    })();
  }, [isLoading]);

  const myTheme = extendTheme(
    {
      initialColorMode: 'dark',
      useSystemColorMode: false,
      colors: { ...theme.colors, brand: theme.colors.cyan },
    },
    theme
  );

  return (
    <>
      <ChakraProvider theme={myTheme}>
        <TolgeeProvider
          filesUrlPrefix="i18n/"
          apiUrl={process.env.REACT_APP_TOLGEE_API_URL}
          apiKey={process.env.REACT_APP_TOLGEE_API_KEY}
          loadingFallback={<p>Loading...</p>}
        >
          {user ? (
            <BrowserRouter>
              <BaseLayout user={user}>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route
                    path={ROUTES.PHONE_VERIFICATION}
                    element={<PhoneVerificationPage />}
                  />
                  <Route path={ROUTES.API_KEY} element={<ApiKeyPage />} />
                  <Route path="/help" element={<HelpPage />} />
                </Routes>
              </BaseLayout>
            </BrowserRouter>
          ) : (
            <p>Loading</p>
          )}
        </TolgeeProvider>
      </ChakraProvider>
    </>
  );
};
export default AppRouter;
