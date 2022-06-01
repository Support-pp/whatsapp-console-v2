import {useToast} from "@chakra-ui/react";
import {useTranslate} from "@tolgee/react";

export const useToastDisplay = () => {
    const toast = useToast()
    const t = useTranslate()

    const displayError = (errorCode: string) => {
        let header = t("API_ERROR_TITLE");
        switch (errorCode.toUpperCase()) {
            case "LIMIT_REACHED_FOR_PHONE_NUMBERS":
                header = t("LIMIT_REACHED_HEADER_ERROR")
        }
        toast({
            title: header,
            description: t(errorCode.toUpperCase()),
            status: 'error',
            duration: 12000,
            isClosable: true,
            position: "bottom-right"
        })

    }

    const displaySuccess = (title: string, description:string) => {

        toast({
            title:  t(title),
            description: t(description),
            status: 'success',
            duration: 12000,
            isClosable: true,
            position: "bottom-right"
        })

    }
    return {displaySuccess, displayError}

}
