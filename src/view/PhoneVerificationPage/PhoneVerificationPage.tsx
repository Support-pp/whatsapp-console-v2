import {PageLayout} from "../BaseLayout/PageLayout";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {ConnectedPhone, PhoneNumberVerification} from "../../api/types/PhoneNumverVerification";
import {apiRequest} from "../../api/ApiClient";
import {EmptyState} from "../../components/EmptyState/EmptyState";
import {FiPhone} from "react-icons/fi";
import {PhoneNumberConnectionTable} from "./PhoneNumberConnectionTable";
import {Limits} from "../../api/types/Limits";
import {PlusIcon, RefreshIcon} from "@heroicons/react/solid";
import {Button} from "@chakra-ui/react";
import {useTranslate} from "@tolgee/react";
import {useToastDisplay} from "../../hooks/useToastDisplay";

export const PhoneVerificationPage = () => {
    const {getAccessTokenSilently} = useAuth0()
    const {displayError, displaySuccess} = useToastDisplay()
    const t = useTranslate();

    const [data, setData] = useState<PhoneNumberVerification>({connectedPhones: [], openConnectionCodes: []});
    const [limits, setLimits] = useState<Limits>();
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

    const fetchLimits = async () => {
        const token = await getAccessTokenSilently();
        await apiRequest(token).getLimits().then(response => {
            setLimits(response)
        }).catch((e: Error) => {
            displayError(e.message)
        })
    }

    const deleteItem = async (item: ConnectedPhone) => {
        const token = await getAccessTokenSilently();
        await apiRequest(token).deletePhoneVerification(item.id).then(response => {
        }).catch((e: Error) => {
            displayError(e.message)
        }).finally(async () => {
            await fetchVerificationData()
        })
    }

    useEffect(() => {
        const _ = fetchVerificationData()
        const __ = fetchLimits()
    }, []);

    const limitReached = limits ? (limits.limitPhoneNumbers >= (data.connectedPhones.length + data.openConnectionCodes.length)) : false
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
                /> : <PhoneNumberConnectionTable
                    data={data}
                    limits={limits}
                    onDelete={(data: ConnectedPhone) => {
                        const _ = deleteItem(data)
                    }}
                    addButton={
                        <Button onClick={createNewVerificationCode}
                                isLoading={pendingEmptyStateButton}
                        >
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                            {t("BUTTON_ADD_PHONE_NUMBER")}
                        </Button>
                    }
                    refreshButton={
                        <Button ml={"2"}
                                onClick={() =>{
                                    fetchVerificationData()
                                    displaySuccess("SUCCESS_REFRESH_TITLE", "SUCCESS_REFRESH_DESCRIPTION")
                                }

                                }
                                isLoading={pendingEmptyStateButton}
                        >
                            <RefreshIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                        </Button>
                    }
                />
        }

        </PageLayout>
    )
}
