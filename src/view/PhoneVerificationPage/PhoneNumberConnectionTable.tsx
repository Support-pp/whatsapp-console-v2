import {
  ConnectedPhone,
  PhoneNumberVerification,
} from '../../api/types/PhoneNumverVerification';
import {
  Badge,
  Box,
  HStack,
  IconButton,
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
} from '@chakra-ui/react';
import * as React from 'react';
import { useState } from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { useTranslate } from '@tolgee/react';
import { Limits } from '../../api/types/Limits';
import { DeleteConfirmModal } from '../../components/Modal/DeleteConfirmModal';
import moment from 'moment';
import { IntroductionModal } from './IntroductionModal';

export interface PhoneNumberConnectionTableProps {
  data: PhoneNumberVerification;
  limits?: Limits;
  onDelete: (data: ConnectedPhone) => void;
  addButton: React.ReactElement;
  refreshButton: React.ReactElement;
}

export const PhoneNumberConnectionTable = (
  props: PhoneNumberConnectionTableProps
) => {
  const { data } = props;
  const [selectedItem, setSelectedItem] = useState<ConnectedPhone | string>();
  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState(false);
  const [introductionModalState, setIntroductionModalState] = useState(false);
  const t = useTranslate();

  const confirmDelete = () => {
    if (typeof selectedItem === 'object') {
      props.onDelete(selectedItem);
    }
  };

  const renderInviteCodes = () => {
    return data.openConnectionCodes.map((code, i) => (
      <Tr key={i}>
        <Td>
          <Text color="muted">{code}</Text>
        </Td>
        <Td>
          <Badge size="sm" colorScheme={'red'}>
            {t('PENDING_LABEL_BADGE')}
          </Badge>
        </Td>
        <Td>
          <Text color="muted">{t('LABEL_NOT_CONNECTED')}</Text>
        </Td>
        <Td>
          <HStack spacing="1">
            <IconButton
              icon={<FiEye fontSize="1.25rem" />}
              variant="ghost"
              aria-label={t('ARIA_LABEL_VIEW_INVITE_CODE')}
              onClick={() => {
                setSelectedItem(code);
                setIntroductionModalState(true);
              }}
            />
          </HStack>
        </Td>
      </Tr>
    ));
  };

  const renderConnectedPhoneNumbers = () => {
    return data.connectedPhones.map((phone, i) => (
      <Tr key={`p-${i}`}>
        <Td>
          <Text color="muted">{phone.phoneNumber}</Text>
        </Td>
        <Td>
          <Badge size="sm" colorScheme={'green'}>
            {t('CONNECTED_LABEL_BADGE')}
          </Badge>
        </Td>
        <Td>
          <Text color="muted">
            {moment(phone.date).format(t('DATE_FORMAT'))}
          </Text>
        </Td>
        <Td>
          <HStack spacing="1">
            <IconButton
              icon={<FiTrash2 fontSize="1.25rem" />}
              variant="ghost"
              aria-label={t('ARIA_LABEL_DELETE_INVITE_CODE')}
              onClick={() => {
                setSelectedItem(phone);
                setDeleteConfirmModalState(true);
              }}
            />
          </HStack>
        </Td>
      </Tr>
    ));
  };

  const RenderTable = () => {
    return (
      <Table>
        <Thead>
          <Tr>
            <Th>{t('PHONE_NUMBER_LABEL')}</Th>
            <Th>{t('STATUS_LABEL')}</Th>
            <Th>{t('CONNECTED_LABEL')}</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {renderConnectedPhoneNumbers()}
          {renderInviteCodes()}
        </Tbody>
      </Table>
    );
  };

  const limit = props?.limits ? props?.limits?.limitPhoneNumbers : '0';
  const isSelectedItemInviteCode = typeof selectedItem === 'string';

  const { refreshButton, addButton } = props;

  return (
    <Box
      bg="bg-surface"
      boxShadow={{ base: 'none', md: useColorModeValue('sm', 'sm-dark') }}
      borderRadius={useBreakpointValue({ base: 'none', md: 'lg' })}
    >
      <DeleteConfirmModal
        title={'DELETE_CONFIRM_MODAL_TITLE'}
        description={
          isSelectedItemInviteCode
            ? t('DELETE_CONFIRM_MODAL_DESCRIPTION_INVITE_CODE')
            : t('DELETE_CONFIRM_MODAL_DESCRIPTION_PHONE_NUMBER_CONNECTION')
        }
        deleteProductName={
          isSelectedItemInviteCode
            ? selectedItem
            : `${selectedItem?.phoneNumber}`
        }
        open={deleteConfirmModalState}
        onDeleteConfirm={confirmDelete}
        onClose={() => {
          setDeleteConfirmModalState(false);
        }}
      />
      <IntroductionModal
        inviteCode={typeof selectedItem === 'string' ? selectedItem : 'null'}
        onClose={() => setIntroductionModalState(false)}
        open={introductionModalState}
      />
      <Stack spacing="5">
        <Box px={{ base: '4', md: '6' }} pt="5">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
          >
            <Text fontSize="lg" fontWeight="medium">
              {t({
                key: 'PHONE_NUMBER_TABLE_HEADER_WITH_LIMITS',
                parameters: {
                  limit: limit,
                  use:
                    props.data.connectedPhones.length +
                    props.data.openConnectionCodes.length,
                },
              })}
            </Text>

            <Box>
              {addButton}
              {refreshButton}
            </Box>
          </Stack>
        </Box>
        <Box overflowX="auto">
          <RenderTable />
        </Box>
        <Box px={{ base: '4', md: '6' }} pb="5"></Box>
      </Stack>
    </Box>
  );
};
