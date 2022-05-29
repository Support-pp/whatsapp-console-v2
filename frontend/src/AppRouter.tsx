import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {BaseLayout} from "./view/BaseLayout/BaseLayout";
import App from "./App";
import {useAuth0} from "@auth0/auth0-react";
import {HelpPage} from "./pages/HelpPage/HelpPage";

const AppRouter = () => {

    const {loginWithRedirect, isAuthenticated} = useAuth0();
    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect()
        }
    }, []);

    if (!isAuthenticated)
        return <></>
    return (<>
        <BaseLayout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/help" element={<HelpPage/>}/>
                </Routes>
            </BrowserRouter>
        </BaseLayout>
    </>)
}
export default AppRouter
