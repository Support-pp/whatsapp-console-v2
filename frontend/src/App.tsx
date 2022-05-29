import React, {useEffect, useState} from "react";
import {PageLayout} from "./view/BaseLayout/PageLayout";
import {PhoneNumberVerification} from "./api/types/PhoneNumverVerification";
import {apiRequest} from "./api/ApiClient";
import {useAuth0} from "@auth0/auth0-react";

const App = () => {
    const {getAccessTokenSilently} = useAuth0()
    const [data, setData] = useState<PhoneNumberVerification>();

    const fetchVerificationData = async () => {
      try{
          const token = await getAccessTokenSilently();
          const verificationData = await apiRequest(token).getPhoneNumbersVerification()
          setData(verificationData)
      }catch (e){
          console.log(e)
      }
    }


    useEffect(() => {
        fetchVerificationData()
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
