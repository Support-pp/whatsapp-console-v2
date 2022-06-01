import React, {useEffect, useState} from "react";
import {PageLayout} from "./view/BaseLayout/PageLayout";
import {PhoneNumberVerification} from "./api/types/PhoneNumverVerification";
import {apiRequest} from "./api/ApiClient";
import {useAuth0} from "@auth0/auth0-react";
import {useErrorDisplay} from "./hooks/useErrorDisplay";

const App = () => {
    const {getAccessTokenSilently} = useAuth0()
    const [data, setData] = useState<PhoneNumberVerification>();
    const {displayError} = useErrorDisplay()


    const fetchVerificationData = async () => {
        const token = await getAccessTokenSilently();
        await apiRequest(token).getPhoneNumbersVerification().then(response => {
            setData(response)
        }).catch((e:string) =>{
            console.log("e ", e)
            displayError(e)
        })
    }


    useEffect(() => {
      const _ = fetchVerificationData()
    }, []);


    return (
        <PageLayout
            title="PAGE_PHONE_NUMBERS_TITLE"
            description="PAGE_PHONE_NUMBERS_DESCRIPTION"
        >
            <p>todo: fetch data from api endpoint </p>
        </PageLayout>
    )
}
export default App
