import {useToast} from "@chakra-ui/react";
import {useTranslate} from "@tolgee/react";

export const useErrorDisplay = () =>{
    const toast = useToast()
    const t = useTranslate()

    const displayError = (errorCode:string) => {
        toast({
            title: t("API_ERROR_TITLE"),
            description: t(errorCode.toUpperCase()),
            status: 'error',
            duration: 12000,
            isClosable: true,
            position: "bottom-right"
        })

    }
    return {displayError}

}
