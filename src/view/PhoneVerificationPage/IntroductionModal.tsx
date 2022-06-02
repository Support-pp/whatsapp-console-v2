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
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslate } from '@tolgee/react';
import QRCode from 'qrcode.react';

export interface IntroductionModalProps {
  inviteCode: string;
  open: boolean;
  onClose: () => void;
}

export const IntroductionModal = (props: IntroductionModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => (props.open ? onOpen() : onClose()), [props.open]);
  const t = useTranslate();

  const phoneNumber = '+4982256239710';

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
