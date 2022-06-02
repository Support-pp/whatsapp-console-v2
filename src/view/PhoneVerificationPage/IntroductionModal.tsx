import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslate } from '@tolgee/react';
import QRCode from 'qrcode.react';
import { PhoneNumberVerification } from '../../api/types/PhoneNumverVerification';
import { useToastDisplay } from '../../hooks/useToastDisplay';

export interface IntroductionModalProps {
  inviteCode: string;
  open: boolean;
  onClose: () => void;
  fnRefresh: () => void;
  stateVerification: PhoneNumberVerification;
}

export const IntroductionModal = (props: IntroductionModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { displaySuccess } = useToastDisplay();
  const t = useTranslate();
  const phoneNumber = '+4982256239710';

  //we don't implement here a realtime check for successful connections because it is to over engineered here
  //but a continuous check for successful connections is used here to get the feeling of a realtime check
  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0);

  useEffect(() => {
    isOpen ? setTicking(true) : setTicking(false);
  }, [isOpen]);

  useEffect(() => (props.open ? onOpen() : onClose()), [props.open]);

  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 1e3);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (count > 5) {
      setCount(0);
      props.fnRefresh();
    }
  }, [count]);

  useEffect(() => {
    if (
      !props.stateVerification.openConnectionCodes.includes(props.inviteCode) &&
      isOpen
    ) {
      props.onClose();
      setTicking(false);
      displaySuccess('TOAST_SUCCESSFUL_LINKED_PHONE_NUMBER_TITLE', '');
    }
  }, [props.stateVerification]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('INTRODUCTION_MODAL_TITLE')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {t({
              key: 'INTRODUCTION_MODAL_DESCRIPTION',
              parameters: { code: props.inviteCode },
            })}

            <Box className={'flex'}>
              <Box className={'m-auto'}>
                <QRCode
                  value={`https://wa.me/${phoneNumber}/?text=!verify ${props.inviteCode}`}
                  bgColor={'white'}
                  fgColor={'black'}
                  renderAs={'canvas'}
                  size={182}
                  includeMargin
                  level={'L'}
                />
                <Text fontSize="xs" textAlign={'center'} pt={'4px'}>
                  {t({
                    key: 'REFRESH_COUNTDOWN',
                    parameters: { count: 5 - count },
                  })}
                </Text>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                props.onClose();
              }}
            >
              {t('CANCEL_DELETE_BUTTON_LABEL')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
