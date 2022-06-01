import {Box, Container, Heading, Stack, Text, useBreakpointValue,} from '@chakra-ui/react'
import * as React from 'react'
import {useTranslate} from "@tolgee/react";

export interface PageLayoutProps {
    children: React.ReactNode
    title: string,
    description: string
}

export const PageLayout = (props: PageLayoutProps) => {
    const t = useTranslate()
    return (

        <Box as="section" pt={{base: '4', md: '8'}} pb={{base: '12', md: '24'}} w={"full"}>
            <Container py={{base: '4', md: '8'}} px={{base: '0', md: 8}}>
                <Stack spacing="4" direction={{base: 'column', md: 'row'}} justify="space-between" pb="10">
                    <Stack spacing="1">
                        <Heading  size={useBreakpointValue({base: 'xs', md: 'sm'})} fontWeight="bold">
                            {t(props.title)}
                        </Heading>
                        <Text color="muted">{t(props.description)}</Text>
                    </Stack>
                </Stack>
                {props.children}
            </Container>

        </Box>


    )
}
