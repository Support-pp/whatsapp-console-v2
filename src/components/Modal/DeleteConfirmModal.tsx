import React, { useEffect } from 'react';
import {
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
import { useTranslate } from '@tolgee/react';

export interface DeleteConfirmModalProps {
  onClose: () => void;
  onDeleteConfirm: () => void;
  title: string;
  description: string;
  open: boolean;
  deleteProductName: string;
}

export const DeleteConfirmModal = (props: DeleteConfirmModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => (props.open ? onOpen() : onClose()), [props.open]);
  const t = useTranslate();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t(props.title)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {t({
              key: props.description,
              parameters: { product: props.deleteProductName },
            })}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                props.onClose();
              }}
            >
              {t('CANCEL_DELETE_BUTTON_LABEL')}
            </Button>
            <Button
              onClick={() => {
                props.onDeleteConfirm();
                props.onClose();
              }}
              colorScheme="red"
              ml={3}
            >
              {t('CONFIRM_DELETE_BUTTON_LABEL')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
