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
            <BaseLayout user={user}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route
                    path={'/phone-verification'}
                    element={<PhoneVerificationPage />}
                  />
                  <Route path="/help" element={<HelpPage />} />
                </Routes>
              </BrowserRouter>
            </BaseLayout>
          ) : (
            <p>Loading</p>
          )}
        </TolgeeProvider>
      </ChakraProvider>
    </>
  );
};
export default AppRouter;
