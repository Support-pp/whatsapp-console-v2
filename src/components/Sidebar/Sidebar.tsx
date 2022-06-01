import React from "react";
import {Box, Divider, Flex, Progress, Stack, Text, useColorModeValue,} from '@chakra-ui/react'

import {UserProfile} from "../UserProfile/UserProfile";
import {NavButton} from "../NavButton/NavButton";
import {FiFile, FiHelpCircle, FiHome, FiKey, FiMessageCircle, FiPhone} from "react-icons/fi";
import {useTranslate} from "@tolgee/react";
import {useAuth0, User} from "@auth0/auth0-react";

export interface SidebarProps{
    user: User
}
export const Sidebar = (props: SidebarProps) => {
    const {user} = props
    const t = useTranslate();
    const navigation = [
        {name: t("NAV_NAME_DASHBOARD"), href: '#', icon: FiHome, current: true},
        {name: t("NAV_NAME_PHONE_NUMBERS"), href: '#', icon: FiPhone, current: false},
        {name: t("NAV_NAME_API_KEYS"), href: '#', icon: FiKey, current: false},
        {name: t("NAV_NAME_CONTRACTS"), href: '#', icon: FiFile, current: false},
        {name: t("NAV_NAME_HISTORY"), href: '#', icon: FiMessageCircle, current: false},

    ]
    return (<>
        <Flex
            flex="1"
            bg="bg-surface"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            maxW={{base: 'full', sm: 'xs'}}
            minW={{base: 'full', sm: 'xs'}}
            py={{base: '6', sm: '8'}}
            px={{base: '4', sm: '6'}}
        >

            <Stack justify="space-between" spacing="1">
                <Stack spacing={{base: '5', sm: '6'}} shouldWrapChildren>
                    <Text fontSize="2xl" fontWeight="bold" justifySelf={"center"}>Support++ Console</Text>

                    <Stack spacing="1">
                        {navigation.map((item, i) => {
                            return (<NavButton key={i} label={item.name} icon={item.icon}/>)
                        })}
                    </Stack>
                </Stack>
                <Stack spacing={{base: '5', sm: '6'}}>
                    <Stack spacing="1">
                        <NavButton label={t("NAV_NAME_HELP")} icon={FiHelpCircle}/>
                    </Stack>
                    <Box bg="bg-subtle" px="4" py="5" borderRadius="lg">
                        <Stack spacing="4">
                            <Stack spacing="1">
                                <Text fontSize="sm" fontWeight="medium">
                                    {t("SB_MESSAGE_LIMIT_TITLE")}
                                </Text>
                                <Text fontSize="sm" color="muted">
                                    {t("SB_MESSAGE_LIMIT_DESCRIPTIONS")}
                                </Text>
                            </Stack>
                            <Progress value={80} size="sm" aria-label="Profile Update Progress"/>
                            <Text fontSize="xs" color="muted">80 / 100</Text>
                        </Stack>
                    </Box>
                    <Divider/>
                    <UserProfile
                        name={`${user.given_name ?? t("PLACEHOLDER_NO_NAME")} ${user.family_name ?? ""}`}
                        image={user.picture ?? ""}
                        email={user.email ?? "unknow@klexhub.com"}
                    />
                </Stack>
            </Stack>
        </Flex>
    </>)
}
