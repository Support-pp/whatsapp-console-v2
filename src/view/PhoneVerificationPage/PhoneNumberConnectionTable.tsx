import {PhoneNumberVerification} from "../../api/types/PhoneNumverVerification";
import {
    Badge,
    Box, Button,
    Checkbox,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import {FiArrowDown, FiEdit2, FiSearch, FiTrash2} from 'react-icons/fi'
import {useTranslate} from "@tolgee/react";
import {Limits} from "../../api/types/Limits";
import {PlusIcon} from "@heroicons/react/solid";

export interface PhoneNumberConnectionTable {
    data: PhoneNumberVerification
    limits?: Limits
}

export const PhoneNumberConnectionTable = (props: PhoneNumberConnectionTable) => {
    const {data} = props;
    const isMobile = useBreakpointValue({base: true, md: false})
    const t = useTranslate()

    const RenderTable = () => {
        return (<Table {...props}>
            <Thead>
                <Tr>
                    <Th>
                        <HStack spacing="3">
                            <Checkbox/>
                            <HStack spacing="1">
                                <Text>{t("PHONE_NUMBER_LABEL")}</Text>
                                <Icon as={FiArrowDown} color="muted" boxSize="4"/>
                            </HStack>
                        </HStack>
                    </Th>
                    <Th>{t("STATUS_LABEL")}</Th>
                    <Th>{t("CONNECTED_LABEL")}</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.connectedPhones.map((phone) => (
                    <Tr key={phone.id}>
                        <Td>
                            <Badge size="sm" colorScheme={phone.id === 'active' ? 'green' : 'red'}>
                                {phone.date.getDate()}
                            </Badge>
                        </Td>
                        <Td>
                            <Text color="muted">{phone.phoneNumber}</Text>
                        </Td>

                        <Td>
                            <HStack spacing="1">
                                <IconButton
                                    icon={<FiTrash2 fontSize="1.25rem"/>}
                                    variant="ghost"
                                    aria-label="Delete member"
                                />
                                <IconButton
                                    icon={<FiEdit2 fontSize="1.25rem"/>}
                                    variant="ghost"
                                    aria-label="Edit member"
                                />
                            </HStack>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>)
    }

    const limit = props?.limits ? props?.limits?.limitPhoneNumbers : "0"
    return (
        <Box
            bg="bg-surface"
            boxShadow={{base: 'none', md: useColorModeValue('sm', 'sm-dark')}}
            borderRadius={useBreakpointValue({base: 'none', md: 'lg'})}
        >
            <Stack spacing="5">
                <Box px={{base: '4', md: '6'}} pt="5">
                    <Stack direction={{base: 'column', md: 'row'}} justify="space-between">
                        <Text fontSize="lg" fontWeight="medium">
                            {t({
                                key: "PHONE_NUMBER_TABLE_HEADER_WITH_LIMITS", parameters: {
                                    "limit": limit,
                                    "use": props.data.connectedPhones.length + props.data.openConnectionCodes.length
                                }
                            })}
                        </Text>
                        <InputGroup right={0} maxW="xs">
                            <Button>
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                {t("BUTTON_ADD_PHONE_NUMBER")}</Button>
                        </InputGroup>
                    </Stack>
                </Box>
                <Box overflowX="auto">
                    <RenderTable/>
                </Box>
                <Box px={{base: '4', md: '6'}} pb="5">

                </Box>
            </Stack>
        </Box>
    )

}
