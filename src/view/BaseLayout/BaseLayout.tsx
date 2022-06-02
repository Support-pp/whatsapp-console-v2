import React from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Flex } from '@chakra-ui/react';
import { User } from '@auth0/auth0-react';

export interface BaseLayoutProps {
  children: React.ReactElement;
  user: User;
}

export const BaseLayout = (props: BaseLayoutProps) => {
  const { user } = props;
  return (
    <>
      <Flex as="section" minH="100vh" bg="bg-canvas">
        <Sidebar user={user} />
        {props.children}
      </Flex>
    </>
  );
};
