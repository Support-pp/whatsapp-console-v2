import {PageLayout} from "../BaseLayout/PageLayout";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {PhoneNumberVerification} from "../../api/types/PhoneNumverVerification";
import {useErrorDisplay} from "../../hooks/useErrorDisplay";
import {apiRequest} from "../../api/ApiClient";
import {EmptyState} from "../../components/EmptyState/EmptyState";
import {FiPhone} from "react-icons/fi";
import {PhoneNumberConnectionTable} from "./PhoneNumberConnectionTable";
import {Limits} from "../../api/types/Limits";

export const PhoneVerificationPage = () => {
    const {getAccessTokenSilently} = useAuth0()
    const [data, setData] = useState<PhoneNumberVerification>({connectedPhones: [], openConnectionCodes: []});
    const [limits, setLimits] = useState<Limits>();
    const {displayError} = useErrorDisplay()
    const [pendingEmptyStateButton, setPendingEmptyStateButton] = useState(false);

    const createNewVerificationCode = async (): Promise<void> => {
        setPendingEmptyStateButton(true)
        const token = await getAccessTokenSilently();
        await apiRequest(token).createPhoneNumbersVerificationCode().then(response => {
            const newInviteArray = data.openConnectionCodes;
            newInviteArray.push(response.inviteCode)
            setData({...data, openConnectionCodes: newInviteArray})
        }).catch((e: Error) => {
            displayError(e.message)
        }).finally(() => {
            setPendingEmptyStateButton(false)
        })
    }

    const fetchVerificationData = async () => {
        const token = await getAccessTokenSilently();
        await apiRequest(token).getPhoneNumbersVerification().then(response => {
            setData(response)
        }).catch((e: Error) => {
            displayError(e.message)
        })
    }

    const fetchLimits = async() =>{
        const token = await getAccessTokenSilently();
        await apiRequest(token).getLimits().then(response => {
            setLimits(response)
        }).catch((e: Error) => {
            displayError(e.message)
        })
    }


    useEffect(() => {
        const _ = fetchVerificationData()
        const __ = fetchLimits()
    }, []);


    return (
        <PageLayout
            title="PAGE_PHONE_NUMBERS_TITLE"
            description="PAGE_PHONE_NUMBERS_DESCRIPTION"
        >{
            data?.connectedPhones.length == 0 && data.openConnectionCodes.length == 0 ?
                <EmptyState title={"EMPTY_STATE_PHONE_VERIFICATION_TITLE"}
                            description={"EMPTY_STATE_PHONE_VERIFICATION_DESCRIPTION"} icon={FiPhone}
                            buttonLabel={"EMPTY_STATE_PHONE_VERIFICATION_BUTTON"}
                            pending={pendingEmptyStateButton}
                            onButtonClick={async () =>
                                await createNewVerificationCode()
                            }
                /> : <PhoneNumberConnectionTable data={data} limits={limits}/>
        }

        </PageLayout>
    )
}
