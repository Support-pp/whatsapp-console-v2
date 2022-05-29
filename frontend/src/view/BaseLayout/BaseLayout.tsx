import React from "react";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import {Flex, useColorModeValue} from "@chakra-ui/react";

export interface BaseLayoutProps {
 children: React.ReactElement
}

export const BaseLayout = (props: BaseLayoutProps) =>{

    return(<>
        <Flex as="section" minH="100vh" bg="bg-canvas">
           <Sidebar />
            {props.children}
        </Flex>

    </>)
}
