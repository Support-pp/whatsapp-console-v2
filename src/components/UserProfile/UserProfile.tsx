import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import * as React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useTranslate } from '@tolgee/react';
import { useAuth0 } from '@auth0/auth0-react';

interface UserProfileProps {
  name: string;
  image: string;
  email: string;
}

export const UserProfile = (props: UserProfileProps) => {
  const { name, image, email } = props;
  const { logout } = useAuth0();
  const t = useTranslate();
  return (
    <HStack spacing="3" ps="2">
      <Avatar name={name} src={image} boxSize="10" />
      <Box>
        <Text fontWeight="medium" fontSize="sm">
          {name}
        </Text>
        <Text color="muted" fontSize="sm">
          {email}
        </Text>
      </Box>

      <Tooltip label={t('LOGOUT_TOOLTIP')} placement="top">
        <IconButton
          icon={<FiLogOut />}
          aria-label={'logout'}
          onClick={() => logout({ returnTo: window.location.origin })}
        />
      </Tooltip>
    </HStack>
  );
};
